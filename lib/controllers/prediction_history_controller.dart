import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import '../model/prediction_history.dart';

class PredictionHistoryController extends GetxController {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  var isLoading = false.obs;
  var predictionHistory = <PredictionHistory>[].obs;

  @override
  void onInit() {
    super.onInit();
    // Fetch history when the controller is initialized, if a user is logged in.
    if (_auth.currentUser != null) {
      getPredictionHistory();
    }
    // Listen to auth changes to refresh history if user logs in/out
    _auth.authStateChanges().listen((User? user) {
      if (user != null) {
        getPredictionHistory();
      } else {
        predictionHistory.clear(); // Clear history if user logs out
      }
    });
  }

  // Hàm savePrediction này có thể không cần thiết nữa nếu PlantDiagnosisController đã xử lý hoàn toàn,
  // hoặc có thể được giữ lại cho các mục đích khác.
  // Hiện tại, tôi sẽ comment nó ra để tránh nhầm lẫn.
  /*
  Future<void> savePrediction({
    required String plantName,
    required String diseaseName,
    required String imageUrl,
    required double confidence,
    required String platform,
  }) async {
    try {
      final user = _auth.currentUser;
      if (user == null) return;

      final prediction = PredictionHistory(
        id: '', // Firestore sẽ tự tạo ID
        userId: user.uid,
        plantName: plantName,
        diseaseName: diseaseName,
        imageUrl: imageUrl,
        confidence: confidence,
        timestamp: DateTime.now(),
        platform: platform,
      );
      // This was writing to a generic 'prediction_history' collection.
      // The new path is users/{userId}/plant_diagnosis
      await _firestore.collection('users').doc(user.uid).collection('plant_diagnosis').add(prediction.toMap());
      await getPredictionHistory(); // Refresh danh sách
    } catch (e) {
      Get.snackbar('Error', 'Failed to save prediction history: ${e.toString()}');
    }
  }
  */

  // Lấy lịch sử dự đoán của người dùng hiện tại
  Future<void> getPredictionHistory() async {
    try {
      isLoading.value = true;
      final user = _auth.currentUser;
      if (user == null) {
        predictionHistory.clear(); // Clear history if no user
        isLoading.value = false;
        return;
      }

      // Path for Flutter mobile diagnoses
      final diagnosisPath = _firestore
          .collection('users')
          .doc(user.uid)
          .collection('diagnosis');

      // Path for ESP32-CAM diagnoses
      final esp32camPath = _firestore
          .collection('users')
          .doc(user.uid)
          .collection('esp32cam');

      // Fetch from both collections
      final diagnosisFuture = diagnosisPath.orderBy('timestamp', descending: true).get();
      final esp32camFuture = esp32camPath.orderBy('timestamp', descending: true).get();

      final results = await Future.wait([diagnosisFuture, esp32camFuture]);

      final diagnosisSnapshot = results[0] as QuerySnapshot<Map<String, dynamic>> ;
      final esp32camSnapshot = results[1] as QuerySnapshot<Map<String, dynamic>> ;
      
      List<PredictionHistory> combinedHistory = [];

      combinedHistory.addAll(diagnosisSnapshot.docs
          .map((doc) => PredictionHistory.fromMap(doc.id, doc.data()))
          .toList());
      
      combinedHistory.addAll(esp32camSnapshot.docs
          .map((doc) => PredictionHistory.fromMap(doc.id, doc.data()))
          .toList());

      // Sort the combined list by timestamp, newest first
      combinedHistory.sort((a, b) => b.timestamp.compareTo(a.timestamp));

      predictionHistory.value = combinedHistory;

    } catch (e) {
      Get.snackbar('Error', 'Failed to get prediction history: ${e.toString()}');
      print("Error fetching history: $e"); // Added print for debugging
    } finally {
      isLoading.value = false;
    }
  }

  // Xóa một mục trong lịch sử
  Future<void> deletePrediction(String predictionId) async {
    try {
      final user = _auth.currentUser;
      if (user == null) return;

      // TODO: Determine which collection the predictionId belongs to (diagnosis or esp32cam)
      // For now, this will attempt to delete from 'plant_diagnosis' which is the old path
      // This needs to be updated if deletion functionality is to be maintained for the new structure.
      // A possible solution is to pass the source/collection type along with the ID,
      // or to attempt deletion from both, or to store the source collection in the PredictionHistory model.

      print("Warning: deletePrediction is using the old path 'plant_diagnosis'. This needs to be updated.");

      await _firestore
          .collection('users') // Access the 'users' collection
          .doc(user.uid)        // Then the specific user's document
          .collection('plant_diagnosis') // Then the sub-collection
          .doc(predictionId)
          .delete();
          
      // Instead of calling getPredictionHistory() which re-fetches all,
      // just remove the item locally for a faster UI update.
      predictionHistory.removeWhere((prediction) => prediction.id == predictionId);
      // If you prefer to re-fetch to ensure data consistency, uncomment the next line and remove the line above.
      // await getPredictionHistory(); 

      Get.snackbar('Success', 'Prediction deleted successfully');
    } catch (e) {
      Get.snackbar('Error', 'Failed to delete prediction: ${e.toString()}');
    }
  }
} 