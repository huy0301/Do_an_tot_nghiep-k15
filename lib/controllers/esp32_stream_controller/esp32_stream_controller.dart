import 'dart:async';
import 'dart:convert';
import 'package:get/get.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:http/http.dart' as http;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Controller này quản lý mọi thứ liên quan đến việc kết nối và nhận dữ liệu
// từ thiết bị ESP32-CAM.
class ESP32StreamController extends GetxController {
  // Kênh WebSocket để giao tiếp với ESP32.
  WebSocketChannel? _channel;
  
  // Các biến trạng thái, UI sẽ tự cập nhật khi chúng thay đổi.
  RxBool isStreaming = false.obs; // Cho biết luồng video có đang chạy không.
  RxString streamUrl = ''.obs; // Địa chỉ IP của ESP32 để kết nối.
  RxString lastDetection = ''.obs; // Kết quả nhận diện bệnh gần nhất.
  RxString lastImageUrl = ''.obs; // URL của ảnh đã nhận diện (nếu có).
  RxString esp32Ip = ''.obs; // IP của ESP32 được lưu lại.
  RxBool isConnected = false.obs; // Trạng thái kết nối tới ESP32.
  RxString lastError = ''.obs; // Lưu lỗi gần nhất để hiển thị.

  Timer? _reconnectTimer; // Dùng để tự động kết nối lại nếu mất kết nối.
  
  // Khởi tạo các dịch vụ Firebase.
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  // Hàm onInit được gọi khi controller khởi tạo.
  @override
  void onInit() {
    super.onInit();
    // Đặt một địa chỉ IP mặc định
    streamUrl.value = 'ws://172.20.10.10:81';
    // Tải địa chỉ IP đã được lưu từ lần sử dụng trước.
    _loadSavedIp();
  }

  // Tải IP đã lưu từ SharedPreferences.
  Future<void> _loadSavedIp() async {
    final prefs = await SharedPreferences.getInstance();
    final savedIp = prefs.getString('esp32_ip');
    if (savedIp != null && savedIp.isNotEmpty) {
      esp32Ip.value = savedIp;
      streamUrl.value = 'ws://$savedIp:81'; // Cập nhật luôn URL để sẵn sàng kết nối.
    }
  }

  // Lưu IP do người dùng nhập vào SharedPreferences cho các lần dùng sau.
  Future<void> saveEsp32Ip(String ip) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('esp32_ip', ip);
    esp32Ip.value = ip;
    updateStreamUrl('ws://$ip:81'); // Cập nhật và kết nối lại ngay.
  }

  // Bắt đầu luồng stream từ ESP32.
  void startStreaming() {
    if (isStreaming.value) return; // Nếu đang stream thì không làm gì cả.
    
    print("Đang cố gắng kết nối tới: ${streamUrl.value}");
    try {
      _channel = WebSocketChannel.connect(Uri.parse(streamUrl.value));
      isStreaming.value = true;
      isConnected.value = true;
      lastError.value = '';

      // Lắng nghe dữ liệu từ ESP32.
      _channel!.stream.listen(
        (data) {
          // Xử lý dữ liệu nhận được (thường là frame ảnh).
          // Chỗ này có thể được phát triển thêm để xử lý ảnh và gửi đi phân tích.
        },
        onError: (error) {
          print('Lỗi WebSocket: $error');
          _handleStreamError('Lỗi kết nối: $error');
        },
        onDone: () {
          print('WebSocket đã đóng.');
          _handleStreamError('Mất kết nối tới thiết bị.');
        },
      );
    } catch (e) {
      print('Không thể bắt đầu stream: $e');
      _handleStreamError('Địa chỉ IP không hợp lệ hoặc thiết bị không phản hồi.');
    }
  }

  // Dừng luồng stream.
  void stopStreaming() {
    _reconnectTimer?.cancel(); // Hủy mọi lịch trình kết nối lại.
    _channel?.sink.close();
    isStreaming.value = false;
    isConnected.value = false;
    print("Đã dừng stream.");
  }

  // Xử lý khi có lỗi xảy ra với stream.
  void _handleStreamError(String errorMessage) {
    if (!isStreaming.value) return; // Tránh xử lý lỗi nhiều lần.
    
    isStreaming.value = false;
    isConnected.value = false;
    lastError.value = errorMessage;
    
    // Thử kết nối lại sau 5 giây.
    _reconnectTimer?.cancel();
    _reconnectTimer = Timer(Duration(seconds: 5), () {
        print("Đang thử kết nối lại...");
        startStreaming();
    });
  }

  // Chụp ảnh từ ESP32 qua HTTP GET thay vì từ stream WebSocket.
  // Cách này ổn định hơn để lấy một khung hình chất lượng.
  Future<void> captureAndAnalyzeImage() async {
    if (esp32Ip.value.isEmpty) {
      Get.snackbar("Lỗi", "Vui lòng nhập địa chỉ IP của ESP32.");
      return;
    }
    
    // URL để chụp ảnh thường là địa chỉ IP của ESP32.
    final imageUrl = 'http://${esp32Ip.value}/capture';
    print("Đang chụp ảnh từ: $imageUrl");

    try {
      final response = await http.get(Uri.parse(imageUrl));
      if (response.statusCode == 200) {
        // Ảnh trả về là một chuỗi Base64.
        String base64Image = base64Encode(response.bodyBytes);
        
        // **GHI CHÚ QUAN TRỌNG:**
        // Thay vì tự xử lý ở đây, ta nên gọi đến controller đã có sẵn.
        // Ví dụ: Get.find<PlantDiagnosisController>().analyzeImageFromBase64(base64Image);
        // Đoạn code dưới đây chỉ mang tính minh họa nếu bạn có một API riêng.
        
        await _processCapturedImage(base64Image);

      } else {
        Get.snackbar("Lỗi", "Không thể chụp ảnh từ thiết bị.");
      }
    } catch (e) {
      Get.snackbar("Lỗi", "Không thể kết nối để chụp ảnh: $e");
    }
  }

  // Hàm xử lý ảnh chụp được (minh họa).
  Future<void> _processCapturedImage(String base64Image) async {
    // Trong dự án thực tế, bạn sẽ gửi `base64Image` này đến mô hình AI để phân tích.
    // Sau khi có kết quả, bạn sẽ lưu nó vào Firestore.
    Get.snackbar("Thành công", "Đã chụp ảnh, sẵn sàng để phân tích.");
    
    // Ví dụ lưu vào Firestore:
    String? userId = _auth.currentUser?.uid;
    if (userId == null) return;

    await _firestore.collection('users').doc(userId).collection('esp32_captures').add({
      'image_base64': base64Image,
      'disease': 'Chưa phân tích',
      'timestamp': FieldValue.serverTimestamp(),
    });
  }

  // Cập nhật URL stream và kết nối lại.
  void updateStreamUrl(String newUrl) {
    streamUrl.value = newUrl;
    if (isStreaming.value) {
      stopStreaming();
    }
    startStreaming();
  }

  // Hàm được gọi khi controller bị xóa khỏi bộ nhớ.
  @override
  void onClose() {
    stopStreaming(); // Đảm bảo stream được đóng hoàn toàn.
    super.onClose();
  }
} 
