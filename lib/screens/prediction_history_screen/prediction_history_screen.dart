import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart'; // For date formatting in UI if needed
import '../../controllers/prediction_history_controller.dart';
// import '../../model/prediction_history.dart'; // Unused import, ensuring it's removed or commented
import '../../widgets/prediction_history_card.dart'; // Assuming you have or will create this

class PredictionHistoryScreen extends StatelessWidget {
  final PredictionHistoryController controller = Get.find<PredictionHistoryController>();
  final TextEditingController _searchController = TextEditingController();

  // Removed 'const' from constructor because 'controller' is initialized with a non-constant value (Get.find()).
  PredictionHistoryScreen({super.key});

  void _showFilterDialog(BuildContext context) {
    // Có thể mở rộng dialog này để thêm các bộ lọc khác (ví dụ: theo tên bệnh)
    showDateRangePicker(
      context: context,
      firstDate: DateTime(2020), // Giới hạn ngày bắt đầu có thể chọn
      lastDate: DateTime.now(),  // Giới hạn ngày kết thúc có thể chọn
      initialDateRange: controller.selectedDateRange.value,
      locale: const Locale('vi', 'VN'), // Tiếng Việt
      helpText: 'CHỌN KHOẢNG NGÀY',
      cancelText: 'HỦY',
      confirmText: 'CHỌN',
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: const ColorScheme.light(
              primary: Colors.green, // Màu chính của DatePicker
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
        controller.setDateRange(pickedRange);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // Initialize search text field if controller has a query (e.g. after screen rotation)
    if (_searchController.text != controller.searchQuery.value) {
      _searchController.text = controller.searchQuery.value;
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
          // Nút Lọc
          IconButton(
            icon: const Icon(Icons.filter_list, color: Colors.blueAccent),
            tooltip: 'Lọc theo ngày',
            onPressed: () => _showFilterDialog(context),
          ),
          // Nút Xóa Bộ lọc (chỉ hiển thị nếu có bộ lọc đang áp dụng)
          Obx(() => 
            (controller.selectedDateRange.value != null || controller.searchQuery.value.isNotEmpty)
            ? IconButton(
                icon: const Icon(Icons.filter_alt_off_outlined, color: Colors.orangeAccent),
                tooltip: 'Xóa bộ lọc',
                onPressed: () => controller.clearFilters(),
              )
            : const SizedBox.shrink()
          ),
          // Nút Xuất PDF
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
          // Thanh tìm kiếm
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Tìm kiếm theo tên bệnh, khuyến nghị...',
                hintStyle: GoogleFonts.poppins(fontSize: 14),
                prefixIcon: const Icon(Icons.search, size: 20),
                suffixIcon: Obx(() => controller.searchQuery.value.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 20),
                        onPressed: () {
                          _searchController.clear();
                          controller.updateSearchQuery('');
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
                controller.updateSearchQuery(value);
              },
            ),
          ),
          // Hiển thị thông tin bộ lọc đang áp dụng
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
                  controller.setDateRange(null); // Xóa bộ lọc ngày
                },
              ),
            );
          }),

          Expanded(
            child: Obx(() {
              if (controller.isLoading.value && controller.filteredPredictionHistory.isEmpty && controller.predictionHistory.isEmpty) {
                 // Chỉ hiện loading khi khởi tạo và chưa có gì cả (kể cả full list)
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