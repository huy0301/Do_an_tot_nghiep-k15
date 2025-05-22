import 'package:cloud_firestore/cloud_firestore.dart';

class PredictionHistory {
  final String id;
  final String userId;
  final String diseaseName;
  final double confidence;
  final String imageUrl;
  final DateTime timestamp;
  final String? platform; // 'web', 'flutter_tflite', 'esp32cam'
  final String? storagePath; // Đường dẫn trong Firebase Storage
  final String? treatment;    // Khuyến nghị điều trị
  final String? prevention;   // Biện pháp phòng ngừa

  PredictionHistory({
    required this.id,
    required this.userId,
    required this.diseaseName,
    required this.confidence,
    required this.imageUrl,
    required this.timestamp,
    this.platform,
    this.storagePath,
    this.treatment,
    this.prevention,
  });

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'diseaseName': diseaseName,
      'confidence': confidence,
      'imageUrl': imageUrl,
      'timestamp': Timestamp.fromDate(timestamp),
      'platform': platform,
      'storagePath': storagePath,
      'treatment': treatment,
      'prevention': prevention,
    };
  }

  factory PredictionHistory.fromMap(String id, Map<String, dynamic> data) {
    DateTime parsedTimestamp;
    if (data['timestamp'] is Timestamp) {
      parsedTimestamp = (data['timestamp'] as Timestamp).toDate();
    } else if (data['timestamp'] is String) {
      parsedTimestamp = DateTime.tryParse(data['timestamp'] as String) ?? DateTime.now();
    } else {
      parsedTimestamp = DateTime.now();
    }

    return PredictionHistory(
      id: id,
      userId: data['userId'] as String? ?? '',
      diseaseName: data['diseaseName'] as String? ?? 'N/A',
      confidence: (data['confidence'] as num?)?.toDouble() ?? 0.0,
      imageUrl: data['imageUrl'] as String? ?? '',
      timestamp: parsedTimestamp,
      platform: data['platform'] as String?,
      storagePath: data['storagePath'] as String?,
      treatment: data['treatment'] as String?,
      prevention: data['prevention'] as String?,
    );
  }
} 