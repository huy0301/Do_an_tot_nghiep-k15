import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart'; // For date formatting in UI if needed
import '../../controllers/prediction_history_controller.dart';
// import '../../model/prediction_history.dart'; // Unused import, model is used via controller
import '../../widgets/prediction_history_card.dart'; 

class PredictionHistoryScreen extends StatelessWidget {
  final PredictionHistoryController controller = Get.find<PredictionHistoryController>();
  final TextEditingController _searchController = TextEditingController();

  PredictionHistoryScreen({super.key});

  void _showFilterDialog(BuildContext context) {
    showDateRangePicker(
      context: context,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
      initialDateRange: controller.selectedDateRange.value,
      locale: const Locale('vi', 'VN'),
      helpText: 'CHỌN KHOẢNG NGÀY',
      cancelText: 'HỦY',
      confirmText: 'CHỌN',
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: const ColorScheme.light(
              primary: Colors.green,
              onPrimary: Colors.white,
              surface: Colors.white,
              onSurface: Colors.black,
            ),
            dialogBackgroundColor: Colors.white,
          ),
          child: child!,
        );
      },
    ).then((pickedRange) {
      if (pickedRange != null) {
        // Gán trực tiếp vào Rx variable của controller
        controller.selectedDateRange.value = pickedRange;
      }
    });
  }

  // Hàm mới để xóa tất cả bộ lọc
  void _clearAllFilters(){
    _searchController.clear();
    controller.searchQuery.value = '';
    controller.selectedDateRange.value = null;
     Get.snackbar("Thông báo", "Đã xóa bộ lọc.", snackPosition: SnackPosition.BOTTOM);
  }

  @override
  Widget build(BuildContext context) {
    if (_searchController.text != controller.searchQuery.value) {
      _searchController.text = controller.searchQuery.value;
       // Di chuyển con trỏ về cuối text sau khi set
      _searchController.selection = TextSelection.fromPosition(TextPosition(offset: _searchController.text.length));
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Lịch sử Chẩn đoán',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        elevation: 1,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list, color: Colors.blueAccent),
            tooltip: 'Lọc theo ngày',
            onPressed: () => _showFilterDialog(context),
          ),
          Obx(() => 
            (controller.selectedDateRange.value != null || controller.searchQuery.value.isNotEmpty)
            ? IconButton(
                icon: const Icon(Icons.filter_alt_off_outlined, color: Colors.orangeAccent),
                tooltip: 'Xóa bộ lọc',
                onPressed: _clearAllFilters, // Gọi hàm mới
              )
            : const SizedBox.shrink()
          ),
          Obx(() => 
            controller.filteredPredictionHistory.isEmpty
            ? const SizedBox.shrink()
            : IconButton(
                icon: const Icon(Icons.picture_as_pdf, color: Colors.redAccent),
                tooltip: 'Xuất báo cáo PDF',
                onPressed: () {
                  if (controller.filteredPredictionHistory.isNotEmpty) {
                    controller.generatePdfReport(controller.filteredPredictionHistory.toList());
                  } else {
                    Get.snackbar(
                      "Thông báo", 
                      "Không có dữ liệu lịch sử (đã lọc) để xuất.",
                      snackPosition: SnackPosition.BOTTOM
                    );
                  }
                },
              ),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Tìm kiếm theo tên bệnh...',
                hintStyle: GoogleFonts.poppins(fontSize: 14),
                prefixIcon: const Icon(Icons.search, size: 20),
                suffixIcon: Obx(() => controller.searchQuery.value.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 20),
                        onPressed: () {
                          _searchController.clear();
                          controller.searchQuery.value = ''; // Gán trực tiếp
                        },
                      )
                    : const SizedBox.shrink()),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: BorderSide(color: Colors.grey.shade300),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: BorderSide(color: Colors.green, width: 1.5),
                ),
                contentPadding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
              ),
              onChanged: (value) {
                controller.searchQuery.value = value; // Gán trực tiếp
              },
            ),
          ),
          Obx(() {
            if (controller.selectedDateRange.value == null) return const SizedBox.shrink();
            final start = DateFormat('dd/MM/yy', 'vi_VN').format(controller.selectedDateRange.value!.start);
            final end = DateFormat('dd/MM/yy', 'vi_VN').format(controller.selectedDateRange.value!.end);
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
              child: Chip(
                avatar: const Icon(Icons.date_range, color: Colors.white, size: 16),
                label: Text('Lọc từ: $start - $end', style: GoogleFonts.poppins(color: Colors.white, fontSize: 12)),
                backgroundColor: Colors.blueAccent.withOpacity(0.8),
                deleteIcon: const Icon(Icons.close, size: 16, color: Colors.white),
                onDeleted: () {
                  controller.selectedDateRange.value = null; // Gán trực tiếp
                },
              ),
            );
          }),
          Expanded(
            child: Obx(() {
              if (controller.isLoading.value && controller.predictionHistory.isEmpty) {
                return const Center(child: CircularProgressIndicator());
              }
              if (controller.filteredPredictionHistory.isEmpty) {
                String message = "Không có lịch sử chẩn đoán.";
                if(controller.searchQuery.value.isNotEmpty || controller.selectedDateRange.value != null){
                  message = "Không tìm thấy kết quả nào khớp với bộ lọc của bạn.";
                }
                return Center(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      message,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
                    ),
                  ),
                );
              }
              return ListView.builder(
                itemCount: controller.filteredPredictionHistory.length,
                itemBuilder: (context, index) {
                  final prediction = controller.filteredPredictionHistory[index];
                  return PredictionHistoryCard(prediction: prediction);
                },
              );
            }),
          ),
        ],
      ),
    );
  }
} 