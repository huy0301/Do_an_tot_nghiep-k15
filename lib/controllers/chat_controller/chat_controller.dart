import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

class ChatController extends GetxController {
  final TextEditingController textController = TextEditingController();
  RxList<Map<String, String>> messages = <Map<String, String>>[].obs;
  RxBool isTyping = false.obs;

  final GenerativeModel model = GenerativeModel(
    model: "gemini-2.0-flash",
    apiKey: "AIzaSyARVNQK2J9ohWgp5K7kioSRmrfeJJsKugI", // 🔥 Replace with secure API storage
  );

  @override
  void onInit() {
    super.onInit();
    _sendWelcomeMessage(); // ✅ Send Welcome Message on Start
  }

  // ✅ Send Welcome Message when Chat Starts
  void _sendWelcomeMessage() {
    messages.insert(0, {
      "sender": "bot",
      "text":
      "🌿 Chào mừng bạn đến với **AgroMind**! Tôi là **Cố vấn Sức khỏe Cây trồng** của bạn. 🌱\n\nBạn có thể hỏi tôi về:\n✅ Cách chăm sóc cây (Tưới nước, Ánh sáng, Phân bón)\n✅ Chẩn đoán bệnh cho cây\n✅ Lời khuyên về trồng và duy trì cây cảnh"
    });
  }

  // ✅ Send User Message and Fetch AI Response
  void sendMessage() async {
    String userMessage = textController.text.trim();
    if (userMessage.isEmpty) return;

    messages.insert(0, {"sender": "user", "text": userMessage});
    textController.clear();
    isTyping.value = true;

    try {
      // ✅ Ensure AI only answers plant-related queries
      if (!_isPlantRelated(userMessage)) {
        messages.insert(0, {
          "sender": "bot",
          "text": "🚫 Tôi chỉ có thể giúp bạn với các vấn đề liên quan đến **chăm sóc cây, sức khỏe cây trồng và làm vườn**. 🌱 Hãy thử hỏi về tưới nước, ánh sáng mặt trời hoặc bệnh của cây nhé."
        });
      } else {
        // Thêm yêu cầu trả lời bằng tiếng Việt vào prompt
        String prompt = "$userMessage\n\n(Hãy trả lời bằng tiếng Việt một cách chi tiết và thân thiện.)";
        
        final response = await model.generateContent([Content.text(prompt)]);
        String botResponse = response.text ?? "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể thử lại không?";
        messages.insert(0, {"sender": "bot", "text": botResponse});
      }
    } catch (e) {
      print("Gemini API Error: $e");
      messages.insert(0, {"sender": "bot", "text": "⚠️ Đã có lỗi xảy ra: Không thể xử lý yêu cầu của bạn vào lúc này. Vui lòng thử lại sau."});
    }

    isTyping.value = false;
  }

  // ✅ Validate if Query is Plant-Related
  bool _isPlantRelated(String query) {
    String lowerQuery = query.toLowerCase();
    List<String> plantKeywords = [
      // Tiếng Anh
      "plant", "watering", "fertilizer", "soil", "disease", "sunlight", "leaves", "growth",
      "flowers", "gardening", "seeds", "roots", "photosynthesis", "botany", "pest", "insect",
      "pruning", "repotting", "hydroponics", "organic", "compost", "mulch", "harvest", "crop",
      "tree", "shrub", "herb", "vegetable", "fruit",
      // Tiếng Việt (thêm các từ khóa phổ biến)
      "cây", "tưới", "nước", "phân bón", "đất trồng", "bệnh", "sâu", "nấm", "ánh sáng", "mặt trời", "lá",
      "tăng trưởng", "ra hoa", "làm vườn", "hạt giống", "rễ", "quang hợp", "thực vật học", "sâu bệnh",
      "côn trùng", "cắt tỉa", "thay chậu", "thủy canh", "hữu cơ", "phân compost", "lớp phủ", "thu hoạch",
      "cây trồng", "cây cảnh", "rau", "củ", "quả", "hoa"
    ];

    for (String keyword in plantKeywords) {
      if (lowerQuery.contains(keyword)) {
        return true;
      }
    }
    return false;
  }
}
