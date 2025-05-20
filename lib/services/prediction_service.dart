import 'dart:convert';
import 'dart:typed_data';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:http/http.dart' as http;

class PredictionService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<Map<String, dynamic>> predictDisease(Uint8List imageBytes) async {
    try {
      final user = _auth.currentUser;
      if (user == null) {
        throw Exception('User not authenticated');
      }

      // Convert image to base64
      final base64Image = base64Encode(imageBytes);

      // Call prediction API
      final response = await http.post(
        Uri.parse('http://localhost:5000/predict'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'image': base64Image}),
      );

      if (response.statusCode != 200) {
        throw Exception('Prediction API request failed');
      }

      final prediction = jsonDecode(response.body);

      // Create a unique filename with timestamp
      final timestamp = DateTime.now().millisecondsSinceEpoch;
      final filename = '$timestamp.jpg';

      // Create a folder path based on the disease name and user ID
      final diseaseFolder = prediction['result'].toString().toLowerCase().replaceAll(' ', '_');
      final storagePath = 'users/${user.uid}/predictions/$diseaseFolder/$filename';

      // Upload image to Firebase Storage
      final storageRef = _storage.ref().child(storagePath);
      await storageRef.putData(imageBytes);

      // Get the download URL
      final imageUrl = await storageRef.getDownloadURL();

      // Save prediction data to Firestore
      final predictionData = {
        'userId': user.uid,
        'userEmail': user.email,
        'imageUrl': imageUrl,
        'storagePath': storagePath,
        'prediction': prediction['result'],
        'confidence': prediction['confidence'],
        'timestamp': FieldValue.serverTimestamp(),
        'device': 'Mobile App',
        'platform': 'mobile'
      };

      final docRef = await _firestore.collection('predictions').add(predictionData);

      // Update statistics
      await _updateStatistics(user.uid, prediction['result'], prediction['confidence']);

      return {
        ...prediction,
        'imageUrl': imageUrl,
        'id': docRef.id
      };
    } catch (e) {
      print('Error in prediction: $e');
      rethrow;
    }
  }

  Future<void> _updateStatistics(String userId, String disease, double confidence) async {
    final statsRef = _firestore.collection('statistics').doc(userId);
    
    await _firestore.runTransaction((transaction) async {
      final statsDoc = await transaction.get(statsRef);
      
      if (!statsDoc.exists) {
        // Create new statistics document
        transaction.set(statsRef, {
          'totalPredictions': 1,
          'diseases': {
            disease: {
              'count': 1,
              'totalConfidence': confidence,
              'averageConfidence': confidence,
            }
          },
          'overallAverageConfidence': confidence,
          'lastUpdated': FieldValue.serverTimestamp(),
        });
      } else {
        final data = statsDoc.data()!;
        final diseases = Map<String, dynamic>.from(data['diseases'] ?? {});
        
        // Update disease statistics
        if (diseases.containsKey(disease)) {
          final diseaseStats = Map<String, dynamic>.from(diseases[disease]);
          final newCount = (diseaseStats['count'] as int) + 1;
          final newTotalConfidence = (diseaseStats['totalConfidence'] as double) + confidence;
          
          diseases[disease] = {
            'count': newCount,
            'totalConfidence': newTotalConfidence,
            'averageConfidence': newTotalConfidence / newCount,
          };
        } else {
          diseases[disease] = {
            'count': 1,
            'totalConfidence': confidence,
            'averageConfidence': confidence,
          };
        }

        // Update overall statistics
        final totalPredictions = (data['totalPredictions'] as int) + 1;
        final overallTotalConfidence = (data['overallAverageConfidence'] as double) * (totalPredictions - 1) + confidence;
        
        transaction.update(statsRef, {
          'totalPredictions': totalPredictions,
          'diseases': diseases,
          'overallAverageConfidence': overallTotalConfidence / totalPredictions,
          'lastUpdated': FieldValue.serverTimestamp(),
        });
      }
    });
  }

  Stream<List<Map<String, dynamic>>> getPredictionHistory() {
    final user = _auth.currentUser;
    if (user == null) {
      throw Exception('User not authenticated');
    }

    return _firestore
        .collection('predictions')
        .where('userId', isEqualTo: user.uid)
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        return {
          'id': doc.id,
          ...data,
          'timestamp': (data['timestamp'] as Timestamp).toDate(),
        };
      }).toList();
    });
  }

  Stream<Map<String, dynamic>> getStatistics() {
    final user = _auth.currentUser;
    if (user == null) {
      throw Exception('User not authenticated');
    }

    return _firestore
        .collection('statistics')
        .doc(user.uid)
        .snapshots()
        .map((doc) {
      if (!doc.exists) {
        return {
          'totalPredictions': 0,
          'diseases': {},
          'overallAverageConfidence': 0.0,
        };
      }
      return doc.data()!;
    });
  }
} 