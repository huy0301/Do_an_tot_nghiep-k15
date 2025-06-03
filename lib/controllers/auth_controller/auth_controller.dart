import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';
import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';

class AuthController extends GetxController {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseStorage _storage = FirebaseStorage.instance;

  var user = Rxn<User>(); // ✅ Track logged-in user

  @override
  void onInit() {
    super.onInit();
    user.bindStream(_auth.authStateChanges()); // ✅ Track login state
  }

  /// ✅ **Implement onClose() Method**
  @override
  void onClose() {
    user.close(); // ✅ Dispose the user stream
    super.onClose();
  }

  /// **Get User Details from Firestore**
  Future<Map<String, dynamic>?> getUserDetails() async {
    if (user.value == null) return null;
    var doc = await _firestore.collection("users").doc(user.value!.uid).get();
    return doc.data();
  }

  /// **Update User Profile in Firestore**
  Future<void> updateUserProfile({
    required String firstName,
    required String lastName,
    required String location,
    File? imageFile,
  }) async {
    if (user.value == null) {
      Get.snackbar("Error", "User not logged in.");
      return;
    }
    String userId = user.value!.uid;
    Get.dialog(Center(child: CircularProgressIndicator()), barrierDismissible: false);

    try {
      String? imageUrl;
      if (imageFile != null) {
        final ref = _storage.ref().child('profile_images').child(userId + '.jpg');
        await ref.putFile(imageFile);
        imageUrl = await ref.getDownloadURL();
      }

      Map<String, dynamic> dataToUpdate = {
        "firstName": firstName,
        "lastName": lastName,
        "location": location,
      };

      if (imageUrl != null) {
        dataToUpdate['profileImageUrl'] = imageUrl;
      }

      await _firestore.collection("users").doc(userId).set(dataToUpdate, SetOptions(merge: true));
      
      Get.back();
      Get.snackbar("Thành công", "Hồ sơ đã được cập nhật.");
    } catch (e) {
      Get.back();
      Get.snackbar("Lỗi", "Không thể cập nhật hồ sơ: ${e.toString()}");
      print("Update profile error: $e");
    }
  }

  /// **Logout User**
  Future<void> logout() async {
    await _auth.signOut();
    Get.offAllNamed("/login"); // ✅ Redirect to login screen
  }
}
