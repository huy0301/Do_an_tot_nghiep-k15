// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';
// Import CustomDrawerController, là nơi chứa logic cho navigation drawer.
import '../../controllers/drawer_controller/drawer_controller.dart';

// Lớp DrawerBinding chịu trách nhiệm khởi tạo và cung cấp CustomDrawerController.
class DrawerBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controller.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo CustomDrawerController một cách "lười biếng".
    // Controller chỉ được tạo ra khi nó được sử dụng lần đầu tiên.
    Get.lazyPut<CustomDrawerController>(() => CustomDrawerController());
  }
}
