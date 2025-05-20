import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';
import '../../controllers/plant_diagnosis_controller/plant_diagnosis_controller.dart';
import 'package:agromind/controllers/esp32_stream_controller/esp32_stream_controller.dart';

class ESP32StreamScreen extends StatefulWidget {
  final String? esp32Ip;

  const ESP32StreamScreen({Key? key, this.esp32Ip}) : super(key: key);

  @override
  State<ESP32StreamScreen> createState() => _ESP32StreamScreenState();
}

class _ESP32StreamScreenState extends State<ESP32StreamScreen> {
  WebSocketChannel? _channel;
  Uint8List? _currentFrame;
  bool _isConnected = false;
  final PlantDiagnosisController _diagnosisController = Get.put(PlantDiagnosisController());
  final TextEditingController _ipController = TextEditingController();
  bool _connecting = false;

  @override
  void initState() {
    super.initState();
    if (widget.esp32Ip != null && widget.esp32Ip!.isNotEmpty) {
      _ipController.text = widget.esp32Ip!;
      _connectWebSocket(widget.esp32Ip!);
    }
  }

  void _connectWebSocket(String ip) {
    if (ip.isEmpty) return;
    setState(() {
      _connecting = true;
      _isConnected = false;
    });
    try {
      _channel = IOWebSocketChannel.connect('ws://$ip:81');
      _channel!.stream.listen(
        (data) {
          if (data is List<int>) {
            setState(() {
              _currentFrame = Uint8List.fromList(data);
              _isConnected = true;
              _connecting = false;
            });
          }
        },
        onError: (error) {
          print('WebSocket Error: $error');
          setState(() {
            _isConnected = false;
            _connecting = false;
          });
        },
        onDone: () {
          print('WebSocket Connection Closed');
          setState(() {
            _isConnected = false;
            _connecting = false;
          });
        },
      );
    } catch (e) {
      print('WebSocket Connection Error: $e');
      setState(() {
        _isConnected = false;
        _connecting = false;
      });
    }
  }

  Future<void> _captureAndAnalyze() async {
    if (_currentFrame != null) {
      final tempDir = await getTemporaryDirectory();
      final file = File('${tempDir.path}/esp32_capture.jpg');
      await file.writeAsBytes(_currentFrame!);

      final fileSize = await file.length();
      print('Image saved at: \\${file.path}, size: \\${fileSize} bytes');
      if (fileSize == 0) {
        Get.snackbar('Error', 'Ảnh nhận từ ESP32-CAM bị lỗi hoặc rỗng!');
        return;
      }

      // Gán ảnh cho controller và chuẩn đoán luôn
      _diagnosisController.selectedImagePath.value = file.path;
      print('Analyze image: \\${file.path}');
      if (!await file.exists()) {
        print('File does not exist!');
        Get.snackbar('Error', 'Image file does not exist.');
        return;
      }
      print('File size: \\${await file.length()}');
      // Đảm bảo model đã load xong
      if (_diagnosisController.labels.isEmpty) {
        print('Model or labels chưa load, load lại...');
        await _diagnosisController.loadModel();
      }
      // Truyền source là esp32cam
      await _diagnosisController.analyzeImage(source: DiagnosisSource.esp32cam);
      if(mounted) { // Thêm kiểm tra mounted trước khi gọi setState
        setState(() {}); 
      }
    }
  }

  @override
  void dispose() {
    _channel?.sink.close();
    _ipController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'ESP32-CAM Stream',
          style: GoogleFonts.poppins(
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        child: Column(
        children: [
          // Nhập IP ESP32-CAM
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _ipController,
                    decoration: InputDecoration(
                      labelText: 'ESP32-CAM IP',
                      hintText: 'VD: 172.20.10.10',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.numberWithOptions(decimal: true),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _connecting
                      ? null
                      : () {
                          if (_ipController.text.isNotEmpty) {
                            _channel?.sink.close();
                            _connectWebSocket(_ipController.text.trim());
                          }
                        },
                  child: _connecting
                      ? SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                      : Text('Kết nối'),
                ),
              ],
            ),
          ),
          // Connection Status
          Container(
            padding: const EdgeInsets.all(8),
            color: _isConnected ? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  _isConnected ? Icons.wifi : Icons.wifi_off,
                  color: _isConnected ? Colors.green : Colors.red,
                ),
                const SizedBox(width: 8),
                Text(
                  _isConnected ? 'Connected to ESP32-CAM' : 'Disconnected',
                  style: GoogleFonts.poppins(
                    color: _isConnected ? Colors.green : Colors.red,
                  ),
                ),
              ],
            ),
          ),
          // Stream Display
            Container(
              height: MediaQuery.of(context).size.height * 0.4,
              width: double.infinity,
            child: Center(
              child: _currentFrame != null
                  ? Image.memory(
                      _currentFrame!,
                      fit: BoxFit.contain,
                    )
                  : _connecting
                      ? const CircularProgressIndicator()
                        : const Text('Chưa có kết nối hoặc chưa có dữ liệu'),
            ),
          ),
          // Capture & Analyze Button
            if (_isConnected)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton.icon(
                  icon: Icon(Icons.camera_alt),
                  label: Text("Capture & Analyze"),
                  onPressed: _captureAndAnalyze,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                    padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                    textStyle: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
            // Kết quả chẩn đoán
          Obx(() {
            if (_diagnosisController.isLoading.value) {
                return const Padding(
                  padding: EdgeInsets.all(16.0),
                child: CircularProgressIndicator(),
              );
            }
              if (_diagnosisController.diseaseName.value.isNotEmpty) {
                return Container(
                  margin: const EdgeInsets.all(16.0),
                  padding: const EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                  color: Colors.green[50],
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.green, width: 1),
                  ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                      if (_diagnosisController.lastUploadedImageUrl.value.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 10.0),
                          child: Center(
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(8.0),
                              child: Image.network(
                                _diagnosisController.lastUploadedImageUrl.value,
                                height: 150,
                                fit: BoxFit.contain,
                                errorBuilder: (context, error, stackTrace) => Icon(Icons.error),
                                loadingBuilder: (context, child, loadingProgress) {
                                  if (loadingProgress == null) return child;
                                  return Center(child: CircularProgressIndicator());
                                },
                              ),
                            ),
                          ),
                        ),
                      Text(
                        "🦠 Disease: ${_diagnosisController.diseaseName.value}",
                        style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.red[700]),
                      ),
                      const SizedBox(height: 8),
                      Obx(() => Text(
                        "🎯 Confidence: ${(_diagnosisController.confidence.value * 100).toStringAsFixed(2)}%",
                        style: GoogleFonts.poppins(fontSize: 16, color: Colors.orange[700]),
                      )),
                      const SizedBox(height: 8),
                      Text(
                        "💡 Recommendation: ${_diagnosisController.recommendation.value}",
                        style: GoogleFonts.poppins(fontSize: 16, color: Colors.black87),
                    ),
                    ],
                ),
              );
            }
              return SizedBox.shrink(); // Không có gì để hiển thị nếu chưa chẩn đoán
          }),
        ],
        ),
      ),
    );
  }
} 