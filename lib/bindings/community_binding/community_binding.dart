// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';

// Import CommunityController, là nơi chứa logic cho màn hình cộng đồng.
import '../../controllers/community_controller/community_controller.dart';

// Lớp CommunityBinding chịu trách nhiệm khởi tạo và cung cấp CommunityController.
class CommunityBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controller.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo CommunityController một cách "lười biếng".
    // Controller chỉ được tạo ra khi nó được sử dụng lần đầu tiên.
    Get.lazyPut<CommunityController>(() => CommunityController());
  }
}
