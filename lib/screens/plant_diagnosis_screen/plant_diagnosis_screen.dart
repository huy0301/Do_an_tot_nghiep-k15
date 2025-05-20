import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../controllers/plant_diagnosis_controller/plant_diagnosis_controller.dart';
import '../../controllers/prediction_history_controller.dart'; // Import PredictionHistoryController
import '../../model/prediction_history.dart'; // Import PredictionHistory model
import '../custom_drawer/custom_drawer.dart'; // ✅ Custom Drawer Imported

class PlantDiagnosisScreen extends StatelessWidget {
  final PlantDiagnosisController controller = Get.put(PlantDiagnosisController());
  final PredictionHistoryController historyController = Get.put(PredictionHistoryController()); // Initialize PredictionHistoryController. It will fetch history in its onInit.
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>(); // ✅ Added GlobalKey

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey, // ✅ Assign Scaffold Key
      drawer: CustomDrawer(onClose: () { // ✅ Fixed Missing onClose
        _scaffoldKey.currentState?.closeDrawer();
      }),
      body: Stack(
        children: [
          // ✅ Background Image
          Positioned.fill(
            child: Image.asset(
              'assets/images/plantdiagnosis_background.png',
              fit: BoxFit.cover,
            ),
          ),

          // ✅ Main Content
          SafeArea(
            child: Column(
              children: [
                // ✅ Header Section (Now Uses Builder to Open Drawer)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Builder(
                        builder: (BuildContext context) {
                          return GestureDetector(
                            onTap: () {
                              Scaffold.of(context).openDrawer(); // ✅ Opens Drawer Properly
                            },
                            child: Image.asset('assets/images/app_logo.png', height: 40),
                          );
                        },
                      ),
                      Text(
                        "Plant Diagnosis",
                        style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                      ),
                      Row(
                        children: [
                          IconButton(
                            icon: Icon(Icons.history, color: Colors.blueAccent),
                            onPressed: () {
                              Get.toNamed('/prediction-history');
                            },
                          ),
                      IconButton(
                        icon: Icon(Icons.info_outline, color: Colors.blueAccent),
                        onPressed: () {
                          Get.snackbar("Info", "Upload or capture an image for analysis.");
                        },
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // ✅ Scrollable Content
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        // ✅ Instruction Text
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 20),
                          child: Text(
                            "Upload a clear image of the affected plant area or take a photo for analysis.",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.w500, color: Colors.black87),
                          ),
                        ),

                        // ✅ File Upload Box
                        GestureDetector(
                          onTap: () => controller.pickImageFromGallery(),
                          child: Obx(() => Container(
                            height: 150,
                            width: MediaQuery.of(context).size.width * 0.7,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.green, width: 2),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: controller.selectedImagePath.isEmpty
                                ? Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.image, size: 40, color: Colors.grey),
                                const SizedBox(height: 5),
                                Text("Select file", style: GoogleFonts.poppins(fontSize: 14, color: Colors.grey)),
                              ],
                            )
                                : ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Image.file(File(controller.selectedImagePath.value), fit: BoxFit.cover),
                            ),
                          )),
                        ),

                        const SizedBox(height: 30),

                        // ✅ OR Separator
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 30.0),
                          child: Row(
                            children: [
                              Expanded(child: Divider(color: Colors.black54)),
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 10),
                                child: Text(
                                  "or",
                                  style: GoogleFonts.poppins(fontSize: 14, color: Colors.black54),
                                ),
                              ),
                              Expanded(child: Divider(color: Colors.black54)),
                            ],
                          ),
                        ),

                        const SizedBox(height: 30),

                        // ✅ Open Camera Button
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Camera Button
                            Expanded(
                              child: GestureDetector(
                              onTap: () => controller.captureImageFromCamera(),
                              child: Container(
                                padding: EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(50),
                                  border: Border.all(color: Colors.green, width: 2),
                                  boxShadow: [
                                    BoxShadow(color: Colors.green.withOpacity(0.2), blurRadius: 5, spreadRadius: 2),
                                  ],
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(Icons.camera_alt, color: Colors.green),
                                    const SizedBox(width: 8),
                                    Text(
                                      "Take Photo",
                                      style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.green),
                                    ),
                                  ],
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 10),
                            // Gallery Button
                            Expanded(
                              child: GestureDetector(
                              onTap: () => controller.pickImageFromGallery(),
                              child: Container(
                                padding: EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(50),
                                  border: Border.all(color: Colors.green, width: 2),
                                  boxShadow: [
                                    BoxShadow(color: Colors.green.withOpacity(0.2), blurRadius: 5, spreadRadius: 2),
                                  ],
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(Icons.photo_library, color: Colors.green),
                                    const SizedBox(width: 8),
                                    Text(
                                      "Gallery",
                                      style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.green),
                                    ),
                                  ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 20),

                        // ✅ **AI Diagnosis Results**
                        // ✅ AI Diagnosis Results - Adjusts size based on content
                        Obx(() => controller.diseaseName.value.isNotEmpty
                            ? Column(
                          children: [
                            const SizedBox(height: 20),
                            Container(
                              padding: EdgeInsets.all(15),
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              decoration: BoxDecoration(
                                color: Colors.green.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: Colors.green, width: 1),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "🦠 Disease: ${controller.diseaseName.value}",
                                    style: GoogleFonts.poppins(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.red),
                                  ),
                                  const SizedBox(height: 5),
                                  // Hiển thị Confidence
                                  Obx(() => Text(
                                      "🎯 Confidence: ${(controller.confidence.value * 100).toStringAsFixed(1)}%",
                                      style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.w500, color: Colors.blueAccent),
                                    )
                                  ),
                                  const SizedBox(height: 5),

                                  // ✅ Auto-Resizing Recommendation Box
                                  Container(
                                    width: double.infinity, // ✅ Takes full width
                                    padding: EdgeInsets.all(10),
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(8),
                                      border: Border.all(color: Colors.green, width: 1),
                                    ),
                                    child: Text(
                                      "💡 Recommendation: ${controller.recommendation.value}",
                                      textAlign: TextAlign.center,
                                      style: GoogleFonts.poppins(fontSize: 14, color: Colors.black87),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        )
                            : Container()), // ✅ Show nothing if plantName is empty

                        // ✅ Recent Prediction History Section
                        const SizedBox(height: 30),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Recent History",
                                style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                              ),
                              TextButton(
                                onPressed: () => Get.toNamed('/prediction-history'),
                                child: Text(
                                  "View All",
                                  style: GoogleFonts.poppins(fontSize: 14, color: Colors.green, fontWeight: FontWeight.w600),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Obx(() {
                          if (historyController.isLoading.value && historyController.predictionHistory.isEmpty) {
                            return const Center(child: CircularProgressIndicator());
                          }
                          if (historyController.predictionHistory.isEmpty) {
                            return Center(
                              child: Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Text(
                                  "No diagnosis history yet.",
                                  style: GoogleFonts.poppins(fontSize: 14, color: Colors.grey),
                                ),
                              ),
                            );
                          }
                          // Display up to 3 recent items
                          final recentHistory = historyController.predictionHistory.take(3).toList();
                          return ListView.builder(
                            shrinkWrap: true,
                            physics: NeverScrollableScrollPhysics(), // To disable scrolling within the SingleChildScrollView
                            itemCount: recentHistory.length,
                            itemBuilder: (context, index) {
                              final prediction = recentHistory[index];
                              // Using a simplified card for display here, or you can reuse PredictionHistoryCard
                              return Card(
                                margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 5),
                                elevation: 2,
                                child: ListTile(
                                  leading: prediction.imageUrl.isNotEmpty
                                      ? ClipRRect(
                                          borderRadius: BorderRadius.circular(4.0),
                                          child: Image.network(prediction.imageUrl, width: 50, height: 50, fit: BoxFit.cover),
                                        )
                                      : Icon(Icons.image_not_supported, size: 50, color: Colors.grey),
                                  title: Text(prediction.diseaseName, style: GoogleFonts.poppins(fontWeight: FontWeight.w600, fontSize: 15)),
                                  subtitle: Text("Confidence: ${(prediction.confidence * 100).toStringAsFixed(1)}%", style: GoogleFonts.poppins(color: Colors.orangeAccent)),
                                  trailing: Text(
                                    _formatDate(prediction.timestamp),
                                    style: GoogleFonts.poppins(fontSize: 10, color: Colors.grey),
                                  ),
                                  onTap: () {
                                    // Optional: Navigate to a detailed view or show more info
                                  },
                                ),
                              );
                            },
                          );
                        }),
                        const SizedBox(height: 20), // Spacing at the bottom
                      ],
                    ),
                  ),
                ),

                // ✅ Continue Button (Fixed at Bottom)
                Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: ElevatedButton(
                    onPressed: () {
                      if (controller.selectedImagePath.isNotEmpty) {
                        controller.analyzeImage(); // ✅ Run TFLite Model First
                      } else {
                        Get.snackbar("Error", "Please upload or capture an image.");
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      padding: EdgeInsets.symmetric(horizontal: 90, vertical: 12),
                    ),
                    child: Text(
                      "Analyze",
                      style: GoogleFonts.poppins(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Helper function to format date, if not already present or can be moved to a utility file
String _formatDate(DateTime date) {
  return '${date.day}/${date.month}/${date.year}'; // Simplified date format
}
