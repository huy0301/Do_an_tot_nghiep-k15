import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

import '../controllers/HealthSummaryController/HealthSummaryController.dart';
import '../l10n/app_localizations.dart';

class HealthSummary extends StatelessWidget {
  final HealthSummaryController controller = Get.find<HealthSummaryController>();

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 5,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.green[100],
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  localizations.healthSummaryTitle,
                  style: GoogleFonts.poppins(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 20),

                // ✅ Display real-time data using Obx()
                Obx(() => Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(child: _buildHealthCard("${controller.totalPlantsTracked.value}", localizations.totalPlantsTracked, Colors.green[900]!)),
                    const SizedBox(width: 8),
                    Expanded(child: _buildHealthCard("${controller.healthyPlants.value}", "Số cây khỏe mạnh", Colors.green, onTap: () {
                      Get.snackbar("Thông báo", "Chuyển đến danh sách cây khỏe mạnh (chức năng đang phát triển)");
                      // TODO: Navigate to healthy plants list screen
                    })),
                    const SizedBox(width: 8),
                    Expanded(child: _buildHealthCard("${controller.riskyPlants.value}", "Số cây có nguy cơ", Colors.orange, onTap: () {
                      Get.snackbar("Thông báo", "Chuyển đến danh sách cây có nguy cơ (chức năng đang phát triển)");
                      // TODO: Navigate to risky plants list screen
                    })),
                    const SizedBox(width: 8),
                    Expanded(child: _buildHealthCard("${controller.diseasedPlants.value}", "Số cây bị bệnh", Colors.redAccent, onTap: () {
                      Get.snackbar("Thông báo", "Chuyển đến danh sách cây bị bệnh (chức năng đang phát triển)");
                      // TODO: Navigate to diseased plants list screen
                    })),
                  ],
                )),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHealthCard(String value, String label, Color color, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 6,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          children: [
            Text(
              value,
              style: GoogleFonts.poppins(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 5),
            Text(
              label,
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                fontSize: 10,
                color: Colors.white70,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
