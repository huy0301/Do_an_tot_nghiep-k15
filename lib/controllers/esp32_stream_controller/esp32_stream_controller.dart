import 'dart:async';
import 'dart:convert';
import 'package:get/get.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:http/http.dart' as http;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ESP32StreamController extends GetxController {
  WebSocketChannel? _channel;
  RxBool isStreaming = false.obs;
  RxString streamUrl = ''.obs;
  RxString lastDetection = ''.obs;
  RxString lastImageUrl = ''.obs;
  Timer? _reconnectTimer;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final RxString esp32Ip = ''.obs;
  final RxBool isConnected = false.obs;
  final RxString lastError = ''.obs;

  @override
  void onInit() {
    super.onInit();
    // Default ESP32-CAM stream URL - should be configurable
    streamUrl.value = 'ws://172.20.10.10:81';
    _loadSavedIp();
  }

  Future<void> _loadSavedIp() async {
    final prefs = await SharedPreferences.getInstance();
    final savedIp = prefs.getString('esp32_ip');
    if (savedIp != null) {
      esp32Ip.value = savedIp;
    }
  }

  Future<void> saveEsp32Ip(String ip) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('esp32_ip', ip);
    esp32Ip.value = ip;
  }

  void startStreaming() {
    if (isStreaming.value) return;
    
    try {
      _channel = WebSocketChannel.connect(Uri.parse(streamUrl.value));
      isStreaming.value = true;
      
      _channel!.stream.listen(
        (data) {
          // Handle incoming stream data
          _processStreamData(data);
        },
        onError: (error) {
          print('Stream error: $error');
          _handleStreamError();
        },
        onDone: () {
          print('Stream closed');
          _handleStreamError();
        },
      );
    } catch (e) {
      print('Failed to start stream: $e');
      _handleStreamError();
    }
  }

  void stopStreaming() {
    _channel?.sink.close();
    isStreaming.value = false;
    _reconnectTimer?.cancel();
  }

  void _handleStreamError() {
    isStreaming.value = false;
    // Attempt to reconnect after 5 seconds
    _reconnectTimer = Timer(Duration(seconds: 5), () {
      if (!isStreaming.value) {
        startStreaming();
      }
    });
  }

  Future<void> _processStreamData(dynamic data) async {
    try {
      // Assuming data is base64 encoded image
      String base64Image = data.toString();
      
      // Send image to your disease detection API
      final response = await http.post(
        Uri.parse('your-disease-detection-api-endpoint'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'image': base64Image}),
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        lastDetection.value = result['disease'];
        
        // Save detection to Firestore
        await _saveDetection(base64Image, result['disease']);
      }
    } catch (e) {
      print('Error processing stream data: $e');
    }
  }

  Future<void> _saveDetection(String imageData, String disease) async {
    try {
      String? userId = _auth.currentUser?.uid;
      if (userId == null) return;

      await _firestore
          .collection('users')
          .doc(userId)
          .collection('esp32_detections')
          .add({
        'image': imageData,
        'disease': disease,
        'timestamp': FieldValue.serverTimestamp(),
        'device_id': 'esp32-cam-1', // Should be configurable
      });
    } catch (e) {
      print('Error saving detection: $e');
    }
  }

  void updateStreamUrl(String newUrl) {
    streamUrl.value = newUrl;
    if (isStreaming.value) {
      stopStreaming();
      startStreaming();
    }
  }

  void setConnectionStatus(bool connected) {
    isConnected.value = connected;
  }

  void setError(String error) {
    lastError.value = error;
  }

  void clearError() {
    lastError.value = '';
  }

  @override
  void onClose() {
    stopStreaming();
    super.onClose();
  }
} 