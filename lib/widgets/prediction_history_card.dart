import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../model/prediction_history.dart'; // Adjust path as needed
import 'package:intl/intl.dart'; // For date formatting

class PredictionHistoryCard extends StatelessWidget {
  final PredictionHistory prediction;

  const PredictionHistoryCard({super.key, required this.prediction});

  String _formatDate(DateTime date) {
    return DateFormat('dd/MM/yyyy hh:mm a').format(date);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: prediction.imageUrl.isNotEmpty
                      ? Image.network(
                          prediction.imageUrl,
                          width: 70,
                          height: 70,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) => 
                              Icon(Icons.broken_image, size: 70, color: Colors.grey[400]),
                          loadingBuilder: (context, child, loadingProgress) {
                            if (loadingProgress == null) return child;
                            return const SizedBox(
                              width: 70,
                              height: 70,
                              child: Center(child: CircularProgressIndicator()),
                            );
                          },
                        )
                      : Icon(Icons.image_not_supported, size: 70, color: Colors.grey[400]),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        prediction.diseaseName,
                        style: GoogleFonts.poppins(fontSize: 17, fontWeight: FontWeight.bold, color: Colors.teal[700]),
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Confidence: ${(prediction.confidence * 100).toStringAsFixed(1)}%',
                        style: GoogleFonts.poppins(fontSize: 13, color: Colors.grey[700], fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Platform: ${prediction.platform}',
                        style: GoogleFonts.poppins(fontSize: 12, color: Colors.grey[600]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            // Hiển thị Điều trị nếu có
            if (prediction.treatment != null && prediction.treatment!.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(bottom: 4.0),
                child: Text(
                  "Điều trị: ${prediction.treatment}",
                  style: GoogleFonts.poppins(fontSize: 13, color: Colors.black87),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            // Hiển thị Phòng ngừa nếu có
            if (prediction.prevention != null && prediction.prevention!.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(bottom: 4.0),
                child: Text(
                  "Phòng ngừa: ${prediction.prevention}",
                  style: GoogleFonts.poppins(fontSize: 13, color: Colors.black87),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            const SizedBox(height: 8),
            Align(
              alignment: Alignment.bottomRight,
              child: Text(
                _formatDate(prediction.timestamp),
                style: GoogleFonts.poppins(fontSize: 10, color: Colors.grey[600]),
              ),
            ),
          ],
        ),
      ),
    );
  }
} 