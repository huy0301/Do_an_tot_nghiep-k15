import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

import '../controllers/HealthSummaryController/HealthSummaryController.dart';
import '../l10n/app_localizations.dart';

class HealthSummary extends StatelessWidget {
  final HealthSummaryController controller = Get.put(HealthSummaryController());

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
                    Expanded(child: _buildHealthCard("${controller.healthyPlants.value}", localizations.numberOfHealthyPlant, Colors.green)),
                    const SizedBox(width: 8),
                    Expanded(child: _buildHealthCard("${controller.riskyPlants.value}", localizations.numberOfRiskyPlant, Colors.orange)),
                    const SizedBox(width: 8),
                    Expanded(child: _buildHealthCard("${controller.diseasedPlants.value}", localizations.numberOfDiseasedPlant, Colors.redAccent)),
                  ],
                )),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHealthCard(String value, String label, Color color) {
    return Container(
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
    );
  }
}
