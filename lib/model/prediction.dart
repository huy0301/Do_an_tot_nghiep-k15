class Prediction {
  final String id;
  final String userId;
  final String userEmail;
  final String imageUrl;
  final String storagePath;
  final String prediction;
  final double confidence;
  final DateTime timestamp;
  final String device;
  final String platform;

  Prediction({
    required this.id,
    required this.userId,
    required this.userEmail,
    required this.imageUrl,
    required this.storagePath,
    required this.prediction,
    required this.confidence,
    required this.timestamp,
    required this.device,
    required this.platform,
  });

  factory Prediction.fromMap(Map<String, dynamic> map) {
    return Prediction(
      id: map['id'] as String,
      userId: map['userId'] as String,
      userEmail: map['userEmail'] as String,
      imageUrl: map['imageUrl'] as String,
      storagePath: map['storagePath'] as String,
      prediction: map['prediction'] as String,
      confidence: (map['confidence'] as num).toDouble(),
      timestamp: map['timestamp'] as DateTime,
      device: map['device'] as String,
      platform: map['platform'] as String,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'userEmail': userEmail,
      'imageUrl': imageUrl,
      'storagePath': storagePath,
      'prediction': prediction,
      'confidence': confidence,
      'timestamp': timestamp,
      'device': device,
      'platform': platform,
    };
  }
} 