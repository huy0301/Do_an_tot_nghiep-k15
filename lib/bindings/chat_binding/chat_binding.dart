// Import thư viện GetX để quản lý trạng thái và dependencies.
import 'package:get/get.dart';
// Import ChatController, là nơi chứa logic cho màn hình chat.
import '../../controllers/chat_controller/chat_controller.dart';

// Lớp ChatBinding chịu trách nhiệm khởi tạo và cung cấp ChatController cho các route sử dụng nó.
// Kế thừa từ Bindings của GetX.
class ChatBinding extends Bindings {
  // Ghi đè phương thức dependencies để đăng ký các controllers hoặc services.
  @override
  void dependencies() {
    // Sử dụng Get.lazyPut để khởi tạo ChatController một cách "lười biếng".
    // Controller chỉ được tạo ra khi nó được sử dụng lần đầu tiên.
    Get.lazyPut<ChatController>(() => ChatController());
  }
}
