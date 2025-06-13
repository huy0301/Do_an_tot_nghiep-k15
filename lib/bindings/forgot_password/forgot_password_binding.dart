// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';
// Import ForgotPasswordController, là nơi chứa logic cho màn hình quên mật khẩu.
import '../../controllers/forgot_password/forgot_password_controller.dart';

// Lớp ForgotPasswordBinding chịu trách nhiệm khởi tạo và cung cấp ForgotPasswordController.
class ForgotPasswordBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controller.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo ForgotPasswordController một cách "lười biếng".
    // Controller chỉ được tạo ra khi nó được sử dụng lần đầu tiên.
    Get.lazyPut<ForgotPasswordController>(() => ForgotPasswordController());
  }
}
