import 'package:cloud_firestore/cloud_firestore.dart';

class PredictionHistory {
  final String id;
  final String userId;
  final String diseaseName;
  final String imageUrl;
  final String storagePath;
  final double confidence;
  final DateTime timestamp;
  final String platform; // 'web' or 'mobile'
  final String recommendation;

  PredictionHistory({
    required this.id,
    required this.userId,
    required this.diseaseName,
    required this.imageUrl,
    required this.storagePath,
    required this.confidence,
    required this.timestamp,
    required this.platform,
    required this.recommendation,
  });

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'diseaseName': diseaseName,
      'imageUrl': imageUrl,
      'storagePath': storagePath,
      'confidence': confidence,
      'timestamp': timestamp,
      'platform': platform,
      'recommendation': recommendation,
    };
  }

  factory PredictionHistory.fromMap(String id, Map<String, dynamic> map) {
    return PredictionHistory(
      id: id,
      userId: map['userId'] ?? '',
      diseaseName: map['diseaseName'] ?? map['prediction'] ?? '',
      imageUrl: map['imageUrl'] ?? '',
      storagePath: map['storagePath'] ?? '',
      confidence: (map['confidence'] ?? 0.0).toDouble(),
      timestamp: (map['timestamp'] is Timestamp ? (map['timestamp'] as Timestamp).toDate() : DateTime.now()),
      platform: map['platform'] ?? '',
      recommendation: map['recommendation'] ?? '',
    );
  }
} 