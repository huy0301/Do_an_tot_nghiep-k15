import 'dart:io'; // For File operations if saving manually
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart'; // Added for Colors, and potentially for DateRangePickerDialog
import 'package:flutter/services.dart' show rootBundle; // To load font from assets
import 'package:get/get.dart';
import 'package:intl/intl.dart'; // For date formatting
import 'package:path_provider/path_provider.dart'; // To get file paths
import 'package:pdf/pdf.dart' as pdfLib; // Aliased to avoid conflict with material.Pdf class if any
import 'package:pdf/widgets.dart' as pw; // PDF library widgets (aliased)
import 'package:printing/printing.dart'; // Printing library
import 'package:open_filex/open_filex.dart'; // For opening the saved PDF

import '../model/prediction_history.dart';

class PredictionHistoryController extends GetxController {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  var isLoading = true.obs; // Bắt đầu với loading = true
  var predictionHistory = <PredictionHistory>[].obs; // Original full list
  var filteredPredictionHistory = <PredictionHistory>[].obs; // List to be displayed

  // Filter and Search States
  var searchQuery = ''.obs;
  var selectedDateRange = Rxn<DateTimeRange>(); // For date range filter

  // Font data (giữ lại nếu vẫn xuất PDF từ Flutter)
  pw.Font? _regularFont;
  pw.Font? _boldFont;
  // pw.Font? _italicFont; // If you have an italic version

  @override
  void onInit() {
    super.onInit();
    _loadFonts(); // ✅ Tải font ngay khi controller khởi tạo
    if (_auth.currentUser != null) {
      getPredictionHistory();
    }
    _auth.authStateChanges().listen((User? user) {
      if (user != null) {
        getPredictionHistory();
      } else {
        predictionHistory.clear();
        filteredPredictionHistory.clear(); 
        searchQuery.value = ''; 
        selectedDateRange.value = null; 
        isLoading.value = false; // Dừng loading nếu logout
      }
    });
    debounce(searchQuery, (_) => applyFiltersAndSearch(), time: const Duration(milliseconds: 500));
    ever(selectedDateRange, (_) => applyFiltersAndSearch()); // Tự động lọc khi ngày thay đổi
  }

  // Future<void> _loadFonts() async { ... } // Giữ lại nếu cần cho PDF

  // Hàm _transformFirestoreDoc để chuẩn hóa dữ liệu từ Firestore
  PredictionHistory _transformFirestoreDoc(DocumentSnapshot doc) {
    Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    
    DateTime timestamp;
    if (data['timestamp'] is Timestamp) {
      timestamp = (data['timestamp'] as Timestamp).toDate();
    } else if (data['timestamp'] is String) {
      timestamp = DateTime.tryParse(data['timestamp'] as String) ?? DateTime.now();
    } else {
      timestamp = DateTime.now(); // Default if not parsable or wrong type
    }

    // Ưu tiên các trường phẳng trước, sau đó mới đến data['result'] cho tương thích ngược
    String diseaseName = data['diseaseName'] ?? (data['result'] is Map ? data['result']['disease'] : 'N/A');
    double confidence = (data['confidence'] is num 
        ? data['confidence'].toDouble() 
        : (data['result'] is Map && data['result']['confidence'] is num 
            ? data['result']['confidence'].toDouble() 
            : 0.0));
    String treatment = data['treatment'] ?? (data['result'] is Map ? data['result']['treatment'] : (data['recommendation'] ?? 'Chưa có thông tin'));
    String prevention = data['prevention'] ?? (data['result'] is Map ? data['result']['prevention'] : 'Chưa có thông tin');

    return PredictionHistory(
      id: doc.id,
      userId: data['userId'] ?? '',
      diseaseName: diseaseName,
      confidence: confidence,
      imageUrl: data['imageUrl'] ?? '',
      timestamp: timestamp,
      platform: data['platform']?.toString() ?? 'unknown',
      treatment: treatment,
      prevention: prevention,
      storagePath: data['storagePath']?.toString() ?? '',
    );
  }

  Future<void> getPredictionHistory() async {
    User? user = _auth.currentUser;
    if (user == null) {
      predictionHistory.clear();
      applyFiltersAndSearch(); 
      isLoading.value = false;
      return;
    }

    isLoading.value = true;
    try {
      QuerySnapshot diagnosisSnapshot = await _firestore
          .collection('users')
          .doc(user.uid)
          .collection('diagnosis')
          .orderBy('timestamp', descending: true)
          .get();

      QuerySnapshot esp32camSnapshot = await _firestore
          .collection('users')
          .doc(user.uid)
          .collection('esp32cam')
          .orderBy('timestamp', descending: true)
          .get();

      List<PredictionHistory> combinedHistory = [];
      combinedHistory.addAll(diagnosisSnapshot.docs.map(_transformFirestoreDoc).toList());
      combinedHistory.addAll(esp32camSnapshot.docs.map(_transformFirestoreDoc).toList());

      combinedHistory.sort((a, b) => b.timestamp.compareTo(a.timestamp));
      
      predictionHistory.value = combinedHistory;
      applyFiltersAndSearch(); 
      
    } catch (e) {
      print("Error fetching prediction history: $e");
      Get.snackbar('Lỗi', 'Không thể tải lịch sử: ${e.toString()}');
      predictionHistory.clear(); 
      applyFiltersAndSearch(); 
    } finally {
      isLoading.value = false;
    }
  }

  void applyFiltersAndSearch() {
    List<PredictionHistory> result = List.from(predictionHistory);

    if (searchQuery.value.isNotEmpty) {
      String query = searchQuery.value.toLowerCase();
      result = result.where((history) {
        return history.diseaseName.toLowerCase().contains(query) ||
               (history.platform?.toLowerCase().contains(query) ?? false);
      }).toList();
    }

    if (selectedDateRange.value != null) {
      final startDate = selectedDateRange.value!.start;
      // Điều chỉnh endDate để bao gồm toàn bộ ngày kết thúc
      final endDate = DateTime(selectedDateRange.value!.end.year, selectedDateRange.value!.end.month, selectedDateRange.value!.end.day, 23, 59, 59);

      result = result.where((history) {
        // Đảm bảo so sánh DateTime với DateTime
        return !history.timestamp.isBefore(startDate) && !history.timestamp.isAfter(endDate);
      }).toList();
    }
    
    filteredPredictionHistory.value = result;
  }
  
  // ... (Phần generatePdfReport và _loadFonts có thể được giữ lại hoặc xóa nếu không dùng PDF từ Flutter) ...
  // Nếu giữ lại generatePdfReport, cần cập nhật _getPdfTableData cho phù hợp với các trường của PredictionHistory

  Future<void> _loadFonts() async {
    try {
      final fontDataRegular = await rootBundle.load("assets/fonts/NotoSans-Regular.ttf");
      _regularFont = pw.Font.ttf(fontDataRegular.buffer.asByteData());

      final fontDataBold = await rootBundle.load("assets/fonts/NotoSans-Bold.ttf");
      _boldFont = pw.Font.ttf(fontDataBold.buffer.asByteData());
      
      // Ensuring italic font loading is commented out if not used or causing issues
      // final fontDataItalic = await rootBundle.load("assets/fonts/NotoSans-Italic.ttf");
      // _italicFont = pw.Font.ttf(fontDataItalic.buffer.asByteData());

      print("Fonts loaded successfully for PDF generation.");
    } catch (e) {
      print("Error loading fonts for PDF: $e");
      Get.snackbar("Lỗi Font PDF", "Không thể tải font để tạo PDF: ${e.toString()}");
    }
  }

  Future<void> generatePdfReport(List<PredictionHistory> historyEntries) async {
    if (historyEntries.isEmpty) {
      Get.snackbar("Thông báo", "Không có dữ liệu để xuất báo cáo.");
      return;
    }

    Get.dialog(
      const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text("Đang tạo báo cáo PDF..."),
          ],
        ),
      ),
      barrierDismissible: false,
    );

    try {
      if (_regularFont == null || _boldFont == null) {
        Get.back(); // Close loading dialog
        Get.snackbar("Lỗi PDF", "Font chữ chưa được tải. Không thể tạo PDF.");
        return;
      }

      final pdf = pw.Document();

      final baseStyle = pw.TextStyle(font: _regularFont, fontSize: 10);
      final titleStyle = pw.TextStyle(font: _boldFont, fontSize: 18);
      final sectionTitleStyle = pw.TextStyle(font: _boldFont, fontSize: 14);
      final headerTableStyle = pw.TextStyle(font: _boldFont, fontSize: 11, color: pdfLib.PdfColors.white);

      String formatDate(DateTime dt) {
        return DateFormat('dd/MM/yyyy, HH:mm', Get.locale?.languageCode ?? 'vi_VN').format(dt);
      }
      
      String reportTitleSuffix = '';
      if (selectedDateRange.value != null) {
        final start = DateFormat('dd/MM/yyyy', Get.locale?.languageCode ?? 'vi_VN').format(selectedDateRange.value!.start);
        final end = DateFormat('dd/MM/yyyy', Get.locale?.languageCode ?? 'vi_VN').format(selectedDateRange.value!.end);
        reportTitleSuffix = '\n(Từ $start đến $end)';
      }

      Map<String, int> diseaseCounts = {};
      for (var entry in historyEntries) {
        diseaseCounts[entry.diseaseName] = (diseaseCounts[entry.diseaseName] ?? 0) + 1;
      }

      pdf.addPage(
        pw.MultiPage(
          maxPages: 1000,
          pageFormat: pdfLib.PdfPageFormat.a4,
          theme: pw.ThemeData.withFont(
            base: _regularFont!,
            bold: _boldFont!,
          ),
          header: (pw.Context context) {
            return pw.Container(
              alignment: pw.Alignment.centerRight,
              margin: const pw.EdgeInsets.only(bottom: 3.0 * pdfLib.PdfPageFormat.mm),
              padding: const pw.EdgeInsets.only(bottom: 3.0 * pdfLib.PdfPageFormat.mm),
              decoration: const pw.BoxDecoration(
                border: pw.Border(bottom: pw.BorderSide(width: 0.5, color: pdfLib.PdfColors.grey)),
              ),
              child: pw.Text(
                'Báo cáo Lịch sử Chẩn đoán',
                style: pw.Theme.of(context).defaultTextStyle.copyWith(color: pdfLib.PdfColors.grey, font: _regularFont, fontSize: 9),
              )
            );
          },
          footer: (pw.Context context) { 
            return pw.Container(
              alignment: pw.Alignment.centerRight,
              margin: const pw.EdgeInsets.only(top: 1.0 * pdfLib.PdfPageFormat.cm),
              child: pw.Text(
                'Trang ${context.pageNumber} của ${context.pagesCount}',
                style: pw.Theme.of(context).defaultTextStyle.copyWith(color: pdfLib.PdfColors.grey, font: _regularFont, fontSize: 9),
              ),
            );
          },
          build: (pw.Context context) => <pw.Widget>[
            pw.Header(
              level: 0,
              child: pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                crossAxisAlignment: pw.CrossAxisAlignment.start, 
                children: <pw.Widget>[
                  pw.Expanded(child: pw.Text('Báo cáo Lịch sử Chẩn đoán Bệnh$reportTitleSuffix', style: titleStyle, maxLines: 3)),
                  pw.Column(
                      crossAxisAlignment: pw.CrossAxisAlignment.end,
                      children: [
                         if (_auth.currentUser?.email != null) pw.Text('Người dùng: ${_auth.currentUser!.email}', style: baseStyle),
                          pw.Text('Ngày xuất: ${DateFormat('dd/MM/yyyy HH:mm', Get.locale?.languageCode ?? 'vi_VN').format(DateTime.now())}', style: baseStyle),
                      ]
                  )
                ],
              ),
            ),
            pw.SizedBox(height: 15),

            pw.Text('Tổng hợp kết quả:', style: sectionTitleStyle),
            pw.SizedBox(height: 5),
            diseaseCounts.isNotEmpty
              ? pw.Table(
                  border: pw.TableBorder.all(color: pdfLib.PdfColors.grey400, width: 0.5),
                  children: [
                    pw.TableRow(
                      decoration: const pw.BoxDecoration(color: pdfLib.PdfColors.teal),
                      children: [
                        pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Loại bệnh / Tình trạng', style: headerTableStyle)),
                        pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Số lượng', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                      ],
                    ),
                    ...diseaseCounts.entries.map((entry) {
                      return pw.TableRow(
                        children: [
                          pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.key, style: baseStyle)),
                          pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.value.toString(), style: baseStyle.copyWith(font: _boldFont), textAlign: pw.TextAlign.center)),
                        ],
                      );
                    }).toList(),
                  ],
                )
              : pw.Padding(padding: const pw.EdgeInsets.symmetric(vertical: 8.0), child: pw.Text('Không có dữ liệu để tổng hợp.', style: baseStyle)),
            pw.SizedBox(height: 15),

            pw.Text('Chi tiết kết quả từng ảnh:', style: sectionTitleStyle),
            pw.SizedBox(height: 5),
            pw.Table.fromTextArray(
              columnWidths: {
                0: const pw.FlexColumnWidth(1.5),
                1: const pw.FlexColumnWidth(2),
                2: const pw.FlexColumnWidth(1.2),
                3: const pw.FlexColumnWidth(0.8),
                4: const pw.FlexColumnWidth(3),
                5: const pw.FlexColumnWidth(3),
              },
              border: pw.TableBorder.all(color: pdfLib.PdfColors.grey600, width: 0.5),
              headerStyle: headerTableStyle,
              headerDecoration: const pw.BoxDecoration(color: pdfLib.PdfColors.teal),
              cellStyle: baseStyle,
              cellAlignment: pw.Alignment.centerLeft,
              cellAlignments: {
                2: pw.Alignment.centerRight,
              },
              headers: <String>['Ngày giờ', 'Bệnh', 'Độ chính xác (%)', 'Nguồn', 'Điều trị', 'Phòng ngừa'],
              data: _getPdfTableData(historyEntries),
            ),
          ],
        )
      );

      final output = await getTemporaryDirectory();
      final timestamp = DateFormat('yyyyMMdd_HHmmss').format(DateTime.now());
      final fileName = "lich_su_chan_doan_$timestamp.pdf";
      final file = File("${output.path}/$fileName");
      await file.writeAsBytes(await pdf.save());

      Get.back(); // Close loading dialog

      Get.snackbar(
        "Thành công",
        "Đã lưu báo cáo PDF vào thư mục tạm.",
        mainButton: TextButton(
          onPressed: () {
            OpenFilex.open(file.path);
          },
          child: const Text("MỞ FILE"),
        ),
        duration: const Duration(seconds: 8),
      );

    } catch (e) {
      Get.back(); // Close loading dialog
      Get.snackbar("Lỗi", "Không thể tạo hoặc lưu file PDF: ${e.toString()}");
      print("Error in generatePdfReport: $e");
    }
  }

  // Helper function to generate table data for PDF
  List<List<String>> _getPdfTableData(List<PredictionHistory> entries) {
    return entries.map((entry) {
      return [
        entry.timestamp != null ? DateFormat('dd/MM/yy HH:mm', Get.locale?.languageCode ?? 'vi_VN').format(entry.timestamp) : 'N/A',
        entry.diseaseName,
        entry.confidence != null ? '${(entry.confidence! * 100).toStringAsFixed(1)}%' : 'N/A',
        entry.platform ?? 'N/A',
        entry.treatment ?? 'N/A',
        entry.prevention ?? 'N/A',
      ];
    }).toList();
  }

  // Xóa một mục trong lịch sử
  Future<void> deletePrediction(String predictionId) async {
    try {
      final user = _auth.currentUser;
      if (user == null) {
        Get.snackbar("Error", "User not logged in. Cannot delete.");
        return;
      }

      // All diagnoses are now stored in the 'diagnosis' collection.
      // The 'platform' field within the document can differentiate the source if needed,
      // but for deletion, we only need the ID and the common collection path.
      print("Attempting to delete prediction $predictionId from users/${user.uid}/diagnosis");

      await _firestore
          .collection('users')
          .doc(user.uid)
          .collection('diagnosis') // ✅ Corrected path to 'diagnosis'
          .doc(predictionId)
          .delete();
          
      predictionHistory.removeWhere((prediction) => prediction.id == predictionId);
      applyFiltersAndSearch(); // Re-apply filters to update filtered list

      Get.snackbar('Success', 'Prediction deleted successfully');
    } catch (e) {
      print("❌ Error deleting prediction: $e");
      Get.snackbar('Error', 'Failed to delete prediction: ${e.toString()}');
    }
  }
} 