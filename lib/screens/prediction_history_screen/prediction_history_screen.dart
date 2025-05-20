import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../controllers/prediction_history_controller.dart';
// import '../../model/prediction_history.dart'; // Unused import, ensuring it's removed or commented
import '../../widgets/prediction_history_card.dart'; // Assuming you have or will create this

class PredictionHistoryScreen extends StatelessWidget {
  final PredictionHistoryController controller = Get.find<PredictionHistoryController>();

  // Removed 'const' from constructor because 'controller' is initialized with a non-constant value (Get.find()).
  PredictionHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Diagnosis History',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        elevation: 1,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
      ),
      body: Obx(() {
        if (controller.isLoading.value && controller.predictionHistory.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }
        if (controller.predictionHistory.isEmpty) {
          return Center(
            child: Text(
              "No diagnosis history available.",
              style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
            ),
          );
        }
        return ListView.builder(
          itemCount: controller.predictionHistory.length,
          itemBuilder: (context, index) {
            final prediction = controller.predictionHistory[index];
            // You might want to create a more detailed card or reuse/enhance PredictionHistoryCard
            return PredictionHistoryCard(prediction: prediction);
          },
        );
      }),
    );
  }
} 