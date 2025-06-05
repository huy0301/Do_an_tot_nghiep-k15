import 'package:agromind/screens/plant_diagnosis_screen/plant_diagnosis_screen.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import '../controllers/ScanPlantController/ScanPlantController.dart';
import '../controllers/HealthSummaryController/HealthSummaryController.dart';

class ScanPlantSection extends StatelessWidget {
  final ScanPlantController scanController = Get.put(ScanPlantController());
  final HealthSummaryController healthSummaryController = Get.find<HealthSummaryController>();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Get.to(() => PlantDiagnosisScreen()); // ✅ Navigate to Plant Diagnosis Page
      },
      child: Column(
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              Image.asset(
                'assets/images/scan_frame.png',
                height: 220,
              ),
              ClipOval(
                child: Image.asset(
                  'assets/images/sample_plant.png',
                  height: 140,
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            "SCAN PLANT HEALTH",
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 10),

          // ✅ Display Real-Time Data from Controller
          Obx(() => Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _buildStatusCircle("${healthSummaryController.riskyPlantsToday.value}", "Cây có nguy cơ", Colors.orangeAccent.withOpacity(0.8), onTap: () {
                Get.snackbar("Thông báo", "Cây có nguy cơ hôm nay (chức năng đang phát triển)");
              })),
              Expanded(child: _buildStatusCircle("${healthSummaryController.diseasedPlantsToday.value}", "Cây bị bệnh", Colors.redAccent.withOpacity(0.8), onTap: () {
                Get.snackbar("Thông báo", "Cây bị bệnh hôm nay (chức năng đang phát triển)");
              })),
              Expanded(child: _buildStatusCircle("${scanController.waterReminderCount.value}", "Nhắc nhở tưới", Colors.blueAccent.withOpacity(0.7), onTap: () {
                Get.snackbar("Thông báo", "Xem các nhắc nhở tưới cây (chức năng đang phát triển)");
              })),
              Expanded(child: _buildStatusCircle("${healthSummaryController.healthyPlantsToday.value}", "Cây khỏe mạnh", Colors.greenAccent.withOpacity(0.7), onTap: () {
                Get.snackbar("Thông báo", "Cây khỏe mạnh hôm nay (chức năng đang phát triển)");
              })),
            ],
          )),
        ],
      ),
    );
  }

  /// ✅ Status Circle with Dynamic Data
  Widget _buildStatusCircle(String number, String label, Color color, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(30),
      child: Column(
      children: [
        CircleAvatar(
          radius: 20,
          backgroundColor: color,
          child: Text(
            number,
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
        ),
        const SizedBox(height: 5),
        SizedBox(
          width: 70,
          child: Text(
          label,
          textAlign: TextAlign.center,
            softWrap: true,
          style: GoogleFonts.poppins(
            fontSize: 10,
            color: Colors.black87,
            ),
          ),
        ),
      ],
      ),
    );
  }
}
