import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:firebase_auth/firebase_auth.dart'; // <--- Điểm khác biệt 1

class ForgotPasswordController extends GetxController {
  TextEditingController emailController = TextEditingController();
  final FirebaseAuth _auth = FirebaseAuth.instance; // <--- Điểm khác biệt 2

  void sendResetInstructions() async { // <--- Điểm khác biệt 3: async
    String email = emailController.text.trim();

    if (email.isEmpty) {
      Get.snackbar(
        "Lỗi",
        "Vui lòng nhập địa chỉ email của bạn",
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
      return;
    }

    if (!GetUtils.isEmail(email)) {
      Get.snackbar(
        "Email không hợp lệ",
        "Vui lòng nhập một địa chỉ email hợp lệ",
        backgroundColor: Colors.orange,
        colorText: Colors.white,
      );
      return;
    }

    // --- Bắt đầu phần tích hợp Firebase Auth ---
    try { // <--- Điểm khác biệt 4: try-catch để xử lý lỗi bất đồng bộ
      await _auth.sendPasswordResetEmail(email: email); // <--- Điểm khác biệt 5: Lệnh gọi Firebase Auth thực tế

      Get.snackbar(
        "Thành công",
        "Hướng dẫn đặt lại mật khẩu đã được gửi đến $email. Vui lòng kiểm tra hộp thư đến của bạn (và thư mục spam/rác).",
        backgroundColor: Colors.green,
        colorText: Colors.white,
        duration: Duration(seconds: 7),
        snackPosition: SnackPosition.BOTTOM,
      );
      emailController.clear(); // <--- Điểm khác biệt 6: Xóa nội dung email

    } on FirebaseAuthException catch (e) { // <--- Điểm khác biệt 7: Bắt lỗi Firebase Auth cụ thể
      String errorMessage = "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";

      if (e.code == 'user-not-found') {
        errorMessage = "Không tìm thấy người dùng với email này. Vui lòng kiểm tra lại địa chỉ email.";
      } else if (e.code == 'invalid-email') {
        errorMessage = "Địa chỉ email không đúng định dạng.";
      } else if (e.code == 'too-many-requests') {
        errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.";
      }

      Get.snackbar(
        "Lỗi",
        errorMessage,
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
      print("Lỗi Firebase Auth: ${e.code} - ${e.message}");
    } catch (e) { // <--- Điểm khác biệt 8: Bắt lỗi chung
      Get.snackbar(
        "Lỗi",
        "Không thể gửi hướng dẫn đặt lại mật khẩu. Vui lòng thử lại.",
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
      print("Lỗi chung: $e");
    }
  }
}