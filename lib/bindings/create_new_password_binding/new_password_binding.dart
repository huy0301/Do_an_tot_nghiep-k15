// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';

// Import NewPasswordController, là nơi chứa logic cho màn hình tạo mật khẩu mới.
import '../../controllers/create_new_password_controller/new_password_controller.dart';

// Lớp NewPasswordBinding chịu trách nhiệm khởi tạo và cung cấp NewPasswordController.
class NewPasswordBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controller.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo NewPasswordController một cách "lười biếng".
    // Controller chỉ được tạo ra khi nó được sử dụng lần đầu tiên.
    Get.lazyPut<NewPasswordController>(() => NewPasswordController());
  }
}
