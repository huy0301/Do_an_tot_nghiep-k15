import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../controllers/forgot_password/forgot_password_controller.dart';

class ForgotPasswordScreen extends StatelessWidget {
  final ForgotPasswordController controller = Get.put(ForgotPasswordController());

  ForgotPasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Lấy chiều cao tổng thể của màn hình để tính toán khoảng trống động
    final double screenHeight = MediaQuery.of(context).size.height;
    // Tính toán chiều cao khả dụng sau khi trừ đi padding trên cùng và dưới cùng
    final double availableHeight = screenHeight - MediaQuery.of(context).padding.top - MediaQuery.of(context).padding.bottom;

    return Scaffold(
      resizeToAvoidBottomInset: false, // Giúp tránh lỗi overflow khi bàn phím nổi lên
      body: Stack(
        children: [
          // Background Image
          Positioned.fill(
            child: Image.asset(
              'assets/images/login_background.png', // Background image của bạn
              fit: BoxFit.cover,
            ),
          ),
          // Sử dụng SingleChildScrollView để tránh lỗi overflow khi bàn phím xuất hiện
          SingleChildScrollView(
            // Padding này sẽ áp dụng cho toàn bộ nội dung cuộn được
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            // Sử dụng ConstrainedBox để cung cấp ràng buộc chiều cao tối thiểu cho Column
            // Điều này giúp Spacer hoạt động vì Column biết nó có thể mở rộng đến đâu.
            // Chiều cao tối thiểu nên bằng chiều cao của màn hình để Spacer có không gian để "đẩy".
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: availableHeight, // Chiều cao tối thiểu bằng chiều cao màn hình
              ),
              child: IntrinsicHeight( // IntrinsicHeight giúp các con của Column tự xác định chiều cao cần thiết
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Back Button
                    SizedBox(height: MediaQuery.of(context).padding.top + 10),
                    Align(
                      alignment: Alignment.topLeft,
                      child: IconButton(
                        icon: const Icon(Icons.arrow_back, color: Colors.white),
                        onPressed: () {
                          Get.back(); // Điều hướng trở lại màn hình trước
                        },
                      ),
                    ),
                    const SizedBox(height: 80),

                    // Title
                    Center(
                      child: Text(
                        'Quên Mật Khẩu', // Đã việt hóa
                        style: GoogleFonts.philosopher(
                          fontSize: 35,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 30),

                    // Description
                    Center(
                      child: Text(
                        'Đừng lo lắng! Nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi mã để đặt lại mật khẩu của bạn.', // Đã việt hóa
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 50),

                    // Email Input Field Label
                    Text(
                      'Email', // Đã việt hóa
                      style: GoogleFonts.poppins(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 5),
                    // Email Input Field
                    TextField(
                      controller: controller.emailController, // Gắn controller
                      decoration: InputDecoration(
                        hintText: 'Nhập email của bạn', // Hint text tiếng Việt
                        hintStyle: GoogleFonts.poppins(color: Colors.white70),
                        filled: true,
                        fillColor: Colors.transparent,
                        enabledBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.white, width: 1.5),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.green, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        errorStyle: GoogleFonts.poppins(color: Colors.redAccent), // Style cho văn bản lỗi
                      ),
                      style: GoogleFonts.poppins(color: Colors.white),
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.done, // Nút 'Done' trên bàn phím
                      onSubmitted: (_) { // Gọi hàm khi nhấn Done trên bàn phím
                        controller.sendResetInstructions();
                      },
                    ),
                    const SizedBox(height: 40),

                    // Send Reset Instruction Button
                    Center(
                      child: OutlinedButton(
                        onPressed: () {
                          controller.sendResetInstructions();
                        },
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Colors.white, width: 1.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 60, vertical: 12),
                        ),
                        child: Text(
                          'Gửi Hướng Dẫn Đặt Lại', // Đã việt hóa
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),

                    const Spacer(), // Dòng này giờ sẽ hoạt động đúng cách

                    // Footer
                    Center(
                      child: Text(
                        'Bản quyền @AgroMind 2025', // Đã việt hóa
                        style: GoogleFonts.poppins(color: Colors.white70, fontSize: 14),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}