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

import '../model/prediction_history.dart';

class PredictionHistoryController extends GetxController {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  var isLoading = false.obs;
  var predictionHistory = <PredictionHistory>[].obs; // Original full list
  var filteredPredictionHistory = <PredictionHistory>[].obs; // List to be displayed and exported

  // Filter and Search States
  var searchQuery = ''.obs;
  var selectedDateRange = Rxn<DateTimeRange>(); // For date range filter

  // Font data
  pw.Font? _regularFont;
  pw.Font? _boldFont;
  // pw.Font? _italicFont; // If you have an italic version

  @override
  void onInit() {
    super.onInit();
    _loadFonts(); // Load fonts when controller initializes
    if (_auth.currentUser != null) {
      getPredictionHistory();
    }
    _auth.authStateChanges().listen((User? user) {
      if (user != null) {
        getPredictionHistory();
      } else {
        predictionHistory.clear();
        filteredPredictionHistory.clear(); // Clear filtered list too
        searchQuery.value = ''; // Reset search
        selectedDateRange.value = null; // Reset date filter
      }
    });
    // Debounce search queries to avoid excessive filtering on every keystroke
    debounce(searchQuery, (_) => applyFiltersAndSearch(), time: const Duration(milliseconds: 500));
  }

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

  // Hàm savePrediction này có thể không cần thiết nữa nếu PlantDiagnosisController đã xử lý hoàn toàn,
  // hoặc có thể được giữ lại cho các mục đích khác.
  // Hiện tại, tôi sẽ comment nó ra để tránh nhầm lẫn.
  /*
  Future<void> savePrediction({
    required String plantName,
    required String diseaseName,
    required String imageUrl,
    required double confidence,
    required String platform,
  }) async {
    try {
      final user = _auth.currentUser;
      if (user == null) return;

      final prediction = PredictionHistory(
        id: '', // Firestore sẽ tự tạo ID
        userId: user.uid,
        plantName: plantName,
        diseaseName: diseaseName,
        imageUrl: imageUrl,
        confidence: confidence,
        timestamp: DateTime.now(),
        platform: platform,
      );
      // This was writing to a generic 'prediction_history' collection.
      // The new path is users/{userId}/plant_diagnosis
      await _firestore.collection('users').doc(user.uid).collection('plant_diagnosis').add(prediction.toMap());
      await getPredictionHistory(); // Refresh danh sách
    } catch (e) {
      Get.snackbar('Error', 'Failed to save prediction history: ${e.toString()}');
    }
  }
  */

  Future<void> generatePdfReport(List<PredictionHistory> historyEntries) async {
    if (_regularFont == null || _boldFont == null) {
      Get.snackbar("Lỗi PDF", "Font chữ chưa sẵn sàng để tạo PDF. Vui lòng thử lại.");
      await _loadFonts(); 
      if (_regularFont == null || _boldFont == null) return; 
    }

    // --- DEBUG FLAG ---
    const bool _debugLimitEntries = true;
    // --- END DEBUG FLAG ---

    final pdf = pw.Document();

    final baseStyle = pw.TextStyle(font: _regularFont, fontSize: 10);
    final titleStyle = pw.TextStyle(font: _boldFont, fontSize: 18);
    final sectionTitleStyle = pw.TextStyle(font: _boldFont, fontSize: 14);
    final headerTableStyle = pw.TextStyle(font: _boldFont, fontSize: 11, color: pdfLib.PdfColors.white);
    final boldTableCellStyle = pw.TextStyle(font: _boldFont, fontSize: 10);

    String formatDate(DateTime dt) {
      return DateFormat('dd/MM/yyyy, HH:mm', 'vi_VN').format(dt);
    }
    
    String reportTitleSuffix = '';
    if (selectedDateRange.value != null) {
      final start = DateFormat('dd/MM/yyyy').format(selectedDateRange.value!.start);
      final end = DateFormat('dd/MM/yyyy').format(selectedDateRange.value!.end);
      reportTitleSuffix = '\n(Từ $start đến $end)';
    }

    // --- PHẦN TÍNH TOÁN TỔNG HỢP --- 
    Map<String, int> diseaseCounts = {};
    if (historyEntries.isNotEmpty) {
      for (var entry in historyEntries) {
        diseaseCounts[entry.diseaseName] = (diseaseCounts[entry.diseaseName] ?? 0) + 1;
      }
    }
    // --- KẾT THÚC PHẦN TÍNH TOÁN TỔNG HỢP ---

    // --- PREPARE ENTRIES FOR DETAILED TABLE (respecting debug flag) ---
    List<PredictionHistory> entriesForDetailedTable = historyEntries;
    if (_debugLimitEntries) {
      entriesForDetailedTable = historyEntries.take(5).toList();
      print("PDF DEBUG: Limiting detailed entries to ${entriesForDetailedTable.length}");
    }
    // --- END PREPARE ENTRIES ---

    pdf.addPage(
      pw.MultiPage(
        pageFormat: pdfLib.PdfPageFormat.a4,
        theme: pw.ThemeData.withFont(
          base: _regularFont!,
          bold: _boldFont!,
        ),
        header: (pw.Context context) { // Header của mỗi trang
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
        footer: (pw.Context context) { // Footer của mỗi trang
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
          // --- TIÊU ĐỀ BÁO CÁO CHUNG ---
          pw.Header(
            level: 0,
            child: pw.Row(
              mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
              crossAxisAlignment: pw.CrossAxisAlignment.start, // Align items to the start vertically for multi-line title
              children: <pw.Widget>[
                pw.Expanded(child: pw.Text('Báo cáo Kết quả Chẩn đoán Bệnh$reportTitleSuffix', style: titleStyle, maxLines: 3)),
                pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.end,
                    children: [
                        // Người dùng: (Lấy từ FirebaseAuth nếu có, ví dụ)
                        // if (_auth.currentUser?.email != null) pw.Text('Người dùng: ${_auth.currentUser!.email}', style: baseStyle),
                        pw.Text('Ngày xuất: ${DateFormat('dd/MM/yyyy HH:mm').format(DateTime.now())}', style: baseStyle),
                    ]
                )
              ],
            ),
          ),
          pw.SizedBox(height: 15),

          // --- PHẦN TỔNG HỢP KẾT QUẢ ---
          pw.Text('Tổng hợp kết quả:', style: sectionTitleStyle),
          pw.SizedBox(height: 5),
          diseaseCounts.isNotEmpty
            ? pw.Table(
                border: pw.TableBorder.all(color: pdfLib.PdfColors.grey400, width: 0.5),
                columnWidths: {
                  0: const pw.FlexColumnWidth(3),
                  1: const pw.FlexColumnWidth(1),
                },
                children: [
                  pw.TableRow(
                    decoration: const pw.BoxDecoration(color: pdfLib.PdfColors.green700), // Màu xanh lá đậm hơn
                    children: [
                      pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Loại bệnh / Tình trạng', style: headerTableStyle)),
                      pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Số lượng', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                    ],
                  ),
                  ...diseaseCounts.entries.map((entry) {
                    return pw.TableRow(
                      children: [
                        pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.key, style: baseStyle)),
                        pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.value.toString(), style: boldTableCellStyle, textAlign: pw.TextAlign.center)),
                      ],
                    );
                  }).toList(),
                ],
              )
            : pw.Padding(padding: const pw.EdgeInsets.symmetric(vertical: 8.0), child: pw.Text('Không có dữ liệu để tổng hợp.', style: baseStyle)),
          pw.SizedBox(height: 15),

          // --- PHẦN CHI TIẾT KẾT QUẢ TỪNG ẢNH ---
          pw.Text('Chi tiết kết quả từng ảnh:', style: sectionTitleStyle),
          pw.SizedBox(height: 5),
          pw.Table(
            border: pw.TableBorder.all(color: pdfLib.PdfColors.grey600, width: 0.5),
            columnWidths: {
              0: const pw.FlexColumnWidth(1.8), // Ngày giờ
              1: const pw.FlexColumnWidth(2.5), // Tên bệnh
              2: const pw.FlexColumnWidth(1.5), // Độ tin cậy
              3: const pw.FlexColumnWidth(1.2), // Nền tảng
            },
            children: [
              pw.TableRow(
                decoration: const pw.BoxDecoration(color: pdfLib.PdfColors.blueGrey700),
                children: [
                  pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Ngày giờ', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                  pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Bệnh', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                  pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Độ chính xác (%)', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                  pw.Padding(padding: const pw.EdgeInsets.all(5), child: pw.Text('Nền tảng', style: headerTableStyle, textAlign: pw.TextAlign.center)),
                ],
              ),
              ...entriesForDetailedTable.map((entry) {
                return pw.TableRow(
                  children: [
                    pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(formatDate(entry.timestamp), style: baseStyle)),
                    pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.diseaseName, style: baseStyle)),
                    pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('${(entry.confidence * 100).toStringAsFixed(1)}%', style: baseStyle, textAlign: pw.TextAlign.right)),
                    pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text(entry.platform, style: baseStyle)),
                  ],
                );
              }).toList(),
            ],
          ),

          if (historyEntries.isEmpty)
            pw.Padding(
              padding: const pw.EdgeInsets.only(top:20),
              child: pw.Text("Không có dữ liệu lịch sử chi tiết để hiển thị theo bộ lọc đã chọn.", style: baseStyle, textAlign: pw.TextAlign.center),
            ),
        ],
      ),
    );

    try {
      await Printing.layoutPdf(
        onLayout: (pdfLib.PdfPageFormat format) async => pdf.save(),
        name: 'BaoCao_ChanDoan_${DateFormat('yyyyMMdd_HHmmss').format(DateTime.now())}.pdf',
      );
      Get.snackbar(
        "Thành công", 
        "Đã tạo báo cáo PDF.", 
        backgroundColor: Colors.green.withOpacity(0.4),
        colorText: Colors.white 
      );
    } catch (e) {
      print("Error sharing/printing PDF: $e");
      Get.snackbar("Lỗi PDF", "Không thể hiển thị hoặc lưu PDF: ${e.toString()}");
    }
  }

  // Lấy lịch sử dự đoán của người dùng hiện tại
  Future<void> getPredictionHistory() async {
    try {
      isLoading.value = true;
      final user = _auth.currentUser;
      if (user == null) {
        predictionHistory.clear();
        filteredPredictionHistory.clear();
        isLoading.value = false;
        return;
      }

      // Path for Flutter mobile diagnoses
      final diagnosisPath = _firestore
          .collection('users')
          .doc(user.uid)
          .collection('diagnosis');

      // Path for ESP32-CAM diagnoses
      final esp32camPath = _firestore
          .collection('users')
          .doc(user.uid)
          .collection('esp32cam');

      // Fetch from both collections
      final diagnosisFuture = diagnosisPath.orderBy('timestamp', descending: true).get();
      final esp32camFuture = esp32camPath.orderBy('timestamp', descending: true).get();

      final results = await Future.wait([diagnosisFuture, esp32camFuture]);

      final diagnosisSnapshot = results[0] as QuerySnapshot<Map<String, dynamic>> ;
      final esp32camSnapshot = results[1] as QuerySnapshot<Map<String, dynamic>> ;
      
      List<PredictionHistory> combinedHistory = [];

      combinedHistory.addAll(diagnosisSnapshot.docs
          .map((doc) => PredictionHistory.fromMap(doc.id, doc.data()))
          .toList());
      
      combinedHistory.addAll(esp32camSnapshot.docs
          .map((doc) => PredictionHistory.fromMap(doc.id, doc.data()))
          .toList());

      // Sort the combined list by timestamp, newest first
      combinedHistory.sort((a, b) => b.timestamp.compareTo(a.timestamp));

      predictionHistory.value = combinedHistory;
      applyFiltersAndSearch(); // Apply initial filters (if any) and search
    } catch (e) {
      Get.snackbar('Error', 'Failed to get prediction history: ${e.toString()}');
      print("Error fetching history: $e"); // Added print for debugging
    } finally {
      isLoading.value = false;
    }
  }

  void updateSearchQuery(String query) {
    searchQuery.value = query;
    // Debouncing in onInit will call applyFiltersAndSearch
  }
  
  void setDateRange(DateTimeRange? range) {
    selectedDateRange.value = range;
    applyFiltersAndSearch();
  }

  void clearFilters() {
    searchQuery.value = '';
    selectedDateRange.value = null;
    applyFiltersAndSearch();
    Get.snackbar("Thông báo", "Đã xóa bộ lọc.", snackPosition: SnackPosition.BOTTOM);
  }

  void applyFiltersAndSearch() {
    List<PredictionHistory> _filtered = List<PredictionHistory>.from(predictionHistory);

    // Apply Date Range Filter
    if (selectedDateRange.value != null) {
      _filtered = _filtered.where((item) {
        // Ensure item timestamp is after or at the start of the day of dateRange.start
        // and before or at the end of the day of dateRange.end
        final itemDate = item.timestamp;
        final startDate = selectedDateRange.value!.start;
        final endDate = selectedDateRange.value!.end;

        // Normalize start date to beginning of day, end date to end of day for inclusive range
        final startOfDay = DateTime(startDate.year, startDate.month, startDate.day);
        final endOfDay = DateTime(endDate.year, endDate.month, endDate.day, 23, 59, 59);
        
        return !itemDate.isBefore(startOfDay) && !itemDate.isAfter(endOfDay);
      }).toList();
    }

    // Apply Search Query Filter (on diseaseName for now)
    if (searchQuery.value.isNotEmpty) {
      String lowerCaseQuery = searchQuery.value.toLowerCase();
      _filtered = _filtered.where((item) {
        return item.diseaseName.toLowerCase().contains(lowerCaseQuery) ||
               (item.recommendation.toLowerCase().contains(lowerCaseQuery)); // Optionally search in recommendations
      }).toList();
    }
    
    filteredPredictionHistory.value = _filtered;
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