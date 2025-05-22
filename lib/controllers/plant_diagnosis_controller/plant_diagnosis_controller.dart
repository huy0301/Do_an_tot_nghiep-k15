import 'dart:io';
import 'package:agromind/model/prediction_history.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:image/image.dart' as img;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import '../../controllers/prediction_history_controller.dart';

// Enum để xác định nguồn gốc của chẩn đoán
enum DiagnosisSource { flutterMobile, esp32cam }

class PlantDiagnosisController extends GetxController {
  final ImagePicker _picker = ImagePicker();
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final PredictionHistoryController _historyController = Get.put(PredictionHistoryController());

  var selectedImagePath = ''.obs;
  var diseaseName = ''.obs;
  var recommendation = ''.obs;
  var isLoading = false.obs;
  var lastUploadedImageUrl = ''.obs;
  var confidence = 0.0.obs;

  late Interpreter interpreter;
  List<String> labels = [];

  final String apiKey = "AIzaSyAYTg-RgwvuKcGc0b9GxI20RMcNgaUK85E"; // Replace with actual API key

  @override
  void onInit() {
    super.onInit();
    loadModel();
    // Listen to auth changes
    _auth.authStateChanges().listen((User? user) {
      if (user == null) {
        // User logged out, clear diagnosis state
        selectedImagePath.value = '';
        diseaseName.value = '';
        recommendation.value = '';
        lastUploadedImageUrl.value = '';
        confidence.value = 0.0;
        isLoading.value = false; // Ensure loading is also reset
        print("User logged out. PlantDiagnosisController state cleared.");
      }
      // Optionally, you could trigger an action if a user logs IN,
      // but for this controller, clearing on logout is the primary concern.
    });
  }

  Future<void> loadModel() async {
    try {
      interpreter = await Interpreter.fromAsset("assets/models/plant_disease_model.tflite");
      labels = await loadLabels();
    } catch (e) {
      print("❌ Error loading TFLite model: $e");
    }
  }

  Future<List<String>> loadLabels() async {
    try {
      print("Đang load labels từ assets/models/plant_labels.txt");
      final labelsData = await rootBundle.loadString("assets/models/plant_labels.txt");
      print("Nội dung labelsData: $labelsData");
      return labelsData.split('\n').where((element) => element.isNotEmpty).toList();
    } catch (e) {
      print("❌ Error loading labels: $e");
      return [];
    }
  }

  Future<void> pickImageFromGallery({DiagnosisSource source = DiagnosisSource.flutterMobile}) async {
    try {
      final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
      if (image != null) {
        selectedImagePath.value = image.path;
        await analyzeImage(source: source);
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to pick image: ${e.toString()}');
    }
  }

  Future<void> captureImageFromCamera({DiagnosisSource source = DiagnosisSource.flutterMobile}) async {
    try {
      final XFile? image = await _picker.pickImage(source: ImageSource.camera);
      if (image != null) {
        selectedImagePath.value = image.path;
        await analyzeImage(source: source);
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to capture image: ${e.toString()}');
    }
  }

  Future<void> analyzeImage({DiagnosisSource source = DiagnosisSource.flutterMobile}) async {
    try {
      isLoading.value = true;
      
    if (selectedImagePath.value.isEmpty) {
      Get.snackbar("Error", "Please upload or capture an image.");
        isLoading.value = false;
      return;
    }

      File imageFile = File(selectedImagePath.value);
      String imageUrl = ''; 
      String storagePathForFirestore = ''; // Để lưu vào Firestore
      double confidenceValue = 0.0;

      var input = await preprocessImage(imageFile);

      if (labels.isEmpty) {
        print("❌ CRITICAL: Labels list is empty before initializing output tensor!");
        Get.snackbar("Error", "Label loading failed. Cannot proceed with analysis.");
        isLoading.value = false;
        return;
      }

      var output = List.filled(1 * labels.length, 0.0).reshape([1, labels.length]);
      interpreter.run(input, output);

      double maxConfidence = 0.0;
      int predictedIndex = -1;
      for (int i = 0; i < output[0].length; i++) {
        if (output[0][i] > maxConfidence) {
          maxConfidence = output[0][i];
          predictedIndex = i;
        }
      }

      if (predictedIndex != -1) {
      diseaseName.value = labels[predictedIndex];
        confidenceValue = maxConfidence;
        this.confidence.value = confidenceValue; 
        print("✅ Prediction: Disease: ${diseaseName.value}, Confidence: ${confidenceValue.toStringAsFixed(2)}");

        String sanitizedDiseaseName = diseaseName.value.replaceAll(' ', '_').replaceAll(RegExp(r'[^a-zA-Z0-9_]'), '');
        if (sanitizedDiseaseName.isEmpty) {
          sanitizedDiseaseName = "unknown_disease";
        }
        
        User? user = _auth.currentUser;
        if (user == null) {
          Get.snackbar("Error", "User not logged in.");
          isLoading.value = false;
          return;
        }
        
        String storageFileName = DateTime.now().millisecondsSinceEpoch.toString() + ".jpg";
        // Cấu trúc đường dẫn Storage: diagnosis/userID/DiseaseName/file_ảnh (hoặc esp32cam/userID/DiseaseName/file_ảnh)
        // Tuy nhiên, Firebase Storage thường không tạo "thư mục" nếu không có file.
        // Để nhất quán với yêu cầu lưu storagePath vào Firestore, chúng ta dùng cấu trúc này cho storagePath.
        // Dù source là gì, thư mục gốc trong Storage sẽ là 'diagnosis_images' hoặc tên chung.
        // Quyết định: Dùng cấu trúc users/{userId}/{diseaseName_sanitized}/fileName.jpg cho Storage.
        // Điều này khác với cấu trúc collection Firestore.
        // storagePathForFirestore sẽ là đường dẫn đầy đủ này.
        // Để đơn giản, giữ cấu trúc storage hiện tại: diagnosis/userID/DiseaseName/file_ảnh
        // Với yêu cầu mới, cấu trúc storage là: diagnosis/userID/DiseaseName/file_ảnh

        storagePathForFirestore = 'diagnosis/${user.uid}/$sanitizedDiseaseName/$storageFileName';
        
        Reference ref = _storage.ref().child(storagePathForFirestore);
        UploadTask uploadTask = ref.putFile(imageFile);
        TaskSnapshot snapshot = await uploadTask;
        imageUrl = await snapshot.ref.getDownloadURL();
        lastUploadedImageUrl.value = imageUrl;

      await getRecommendationFromGemini(diseaseName.value);
        // Truyền source và storagePathForFirestore vào hàm lưu
        await savePredictionToFirestore(imageUrl, confidenceValue, source, storagePathForFirestore);

      } else {
        print("❌ Could not determine prediction from model output.");
        Get.snackbar("Error", "Could not determine prediction.");
      }
    } catch (e) {
      print("❌ Failed to analyze the image: $e");
      Get.snackbar("Error", "Failed to analyze image. ${e.toString()}");
    } finally {
      isLoading.value = false;
    }
  }

  Future<List<List<List<List<double>>>>> preprocessImage(File imageFile) async {
    try {
      Uint8List imageBytes = await imageFile.readAsBytes();
      img.Image? image = img.decodeImage(imageBytes);
      if (image == null) {
        throw Exception("Failed to decode image.");
      }

      img.Image resizedImage = img.copyResize(image, width: 300, height: 300);

      List<List<List<List<double>>>> input = List.generate(
        1,
            (i) => List.generate(
          300, 
              (j) => List.generate(
            300, 
                (k) {
              img.Pixel pixel = resizedImage.getPixel(k, j); 
              return [pixel.r.toDouble(), pixel.g.toDouble(), pixel.b.toDouble()];
            },
          ),
        ),
      );

      return input;
    } catch (e) {
      print("❌ Error preprocessing image: $e");
      throw e;
    }
  }

  Future<void> getRecommendationFromGemini(String currentDiseaseName) async {
    if (currentDiseaseName.isEmpty) return;

    try {
      var url = Uri.parse("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey");
      var headers = {"Content-Type": "application/json"};
      var body = jsonEncode({
        "contents": [
          {
            "parts": [
              {"text": "Đâu là phương pháp điều trị tốt nhất cho bệnh $currentDiseaseName? Cung cấp các khuyến nghị bằng tiếng Việt."}
            ]
          }
        ]
      });

      var response = await http.post(url, headers: headers, body: body);

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        recommendation.value = jsonResponse["candidates"][0]["content"]["parts"][0]["text"];
        print("✅ Gemini Recommendation (Vietnamese): ${recommendation.value}");
      } else {
        print("❌ Failed to get recommendation from Gemini. Status: ${response.statusCode}, Body: ${response.body}");
        recommendation.value = "Không thể tải khuyến nghị. Vui lòng thử lại."; 
      }
    } catch (e) {
      print("❌ Gemini API Error: $e");
      recommendation.value = "Lỗi kết nối đến dịch vụ khuyến nghị.";
    }
  }

  Future<void> savePredictionToFirestore(String imageUrl, double currentConfidence, DiagnosisSource source, String storagePathValue) async {
    try {
      User? user = _auth.currentUser; 

      if (user == null) {
        print("❌ User not authenticated for saving prediction");
        Get.snackbar("Error", "User not authenticated. Cannot save prediction.");
        return;
      }

      String platformValue;
      String targetCollectionPath; // Sẽ là 'users/{uid}/diagnosis' hoặc 'users/{uid}/esp32cam'

      // Xác định platform và collection dựa trên nguồn gốc
      switch (source) {
        case DiagnosisSource.flutterMobile:
          platformValue = 'flutter'; // Đổi thành 'flutter' cho nhất quán
          targetCollectionPath = 'users/${user.uid}/diagnosis';
          break;
        case DiagnosisSource.esp32cam:
          platformValue = 'esp32cam';
          targetCollectionPath = 'users/${user.uid}/esp32cam'; // Lưu vào collection riêng cho ESP32
          break;
        default:
          platformValue = 'unknown_flutter'; // Để phân biệt với unknown của web
          targetCollectionPath = 'users/${user.uid}/diagnosis'; // Mặc định
      }

      final diagnosisDataMap = {
        'userId': user.uid,
        'diseaseName': diseaseName.value, 
        'imageUrl': imageUrl,
        'confidence': currentConfidence,
        'timestamp': FieldValue.serverTimestamp(), // Dùng server timestamp
        'platform': platformValue,
        'treatment': recommendation.value, // Lấy từ Gemini
        'prevention': '', // Thêm trường prevention, để trống nếu không có
        'storagePath': storagePathValue,
      };
      
      // Lưu vào collection đã xác định
      await _firestore
          .collection(targetCollectionPath) 
          .add(diagnosisDataMap); // Sử dụng Map trực tiếp

      Get.snackbar("Success", "Diagnosis saved successfully!");
      _historyController.getPredictionHistory(); // Refresh history list
    } catch (e) {
      print("❌ Firestore Save Error: $e");
      Get.snackbar("Error", "Failed to save diagnosis: ${e.toString()}");
    }
  }
}
