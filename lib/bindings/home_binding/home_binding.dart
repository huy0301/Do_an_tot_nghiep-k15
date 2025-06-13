// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';

// Import HomeController, là nơi chứa logic cho màn hình chính.
import '../../controllers/home_controller/home_controller.dart';

// Lớp HomeBinding chịu trách nhiệm khởi tạo và cung cấp HomeController.
class HomeBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controller.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo HomeController một cách "lười biếng".
    Get.lazyPut<HomeController>(() => HomeController());
  }
}

