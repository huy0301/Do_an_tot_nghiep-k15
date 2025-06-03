import 'package:get/get.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:async'; // Import for StreamSubscription and StreamGroup if needed

class HealthSummaryController extends GetxController {
  // Overall stats
  RxInt totalPlantsTracked = 0.obs;
  RxInt healthyPlants = 0.obs;
  RxInt riskyPlants = 0.obs;
  RxInt diseasedPlants = 0.obs;

  // Today's stats for SCAN PLANT HEALTH section
  RxInt healthyPlantsToday = 0.obs;
  RxInt riskyPlantsToday = 0.obs;
  RxInt diseasedPlantsToday = 0.obs;
  // We might not need totalPlantsTrackedToday if not displayed in SCAN section

  final FirebaseFirestore firestore = FirebaseFirestore.instance;
  final FirebaseAuth auth = FirebaseAuth.instance;

  StreamSubscription? _diagnosisSubscription;
  StreamSubscription? _esp32camSubscription;

  @override
  void onInit() {
    super.onInit();
    // Listen to auth state changes to refetch data if user changes
    auth.authStateChanges().listen((User? user) {
      if (user != null) {
        fetchHealthSummary(user.uid);
      } else {
        _clearData();
      }
    });
    // Initial fetch if user is already logged in
    User? currentUser = auth.currentUser;
    if (currentUser != null) {
      fetchHealthSummary(currentUser.uid);
    }
  }

  void _clearData() {
    totalPlantsTracked.value = 0;
    healthyPlants.value = 0;
    riskyPlants.value = 0;
    diseasedPlants.value = 0;
    healthyPlantsToday.value = 0;
    riskyPlantsToday.value = 0;
    diseasedPlantsToday.value = 0;
    _diagnosisSubscription?.cancel();
    _esp32camSubscription?.cancel();
  }

  void fetchHealthSummary(String userId) {
    // Cancel previous subscriptions if any
    _diagnosisSubscription?.cancel();
    _esp32camSubscription?.cancel();

    List<DocumentSnapshot> diagnosisDocs = [];
    List<DocumentSnapshot> esp32camDocs = [];

    _diagnosisSubscription = firestore
        .collection("users")
        .doc(userId)
        .collection("diagnosis")
        .snapshots()
        .listen((snapshot) {
      diagnosisDocs = snapshot.docs;
      _processCombinedData(diagnosisDocs, esp32camDocs);
    });

    _esp32camSubscription = firestore
        .collection("users")
        .doc(userId)
        .collection("esp32cam")
        .snapshots()
        .listen((snapshot) {
      esp32camDocs = snapshot.docs;
      _processCombinedData(diagnosisDocs, esp32camDocs);
    });
  }

  void _processCombinedData(List<DocumentSnapshot> diagnosisDocs, List<DocumentSnapshot> esp32camDocs) {
    List<DocumentSnapshot> allDocs = [...diagnosisDocs, ...esp32camDocs];
    totalPlantsTracked.value = allDocs.length;

    int healthyOverall = 0;
    int riskyOverall = 0;
    int diseasedOverall = 0;

    int healthyTodayCount = 0;
    int riskyTodayCount = 0;
    int diseasedTodayCount = 0;

    DateTime now = DateTime.now();
    DateTime startOfToday = DateTime(now.year, now.month, now.day);
    DateTime endOfToday = DateTime(now.year, now.month, now.day, 23, 59, 59, 999);

    for (var doc in allDocs) {
      var data = doc.data() as Map<String, dynamic>;
      
      String? plantCondition = data["plantCondition"] as String?;
      // Normalize diseaseName: ensure it's lowercase and handle null/empty cases properly for comparison
      String diseaseName = (data['diseaseName'] ?? (data['result'] is Map ? data['result']['disease'] : null))?.toString().trim().toLowerCase() ?? "";
      if (diseaseName.isEmpty || diseaseName == "n/a") {
        // If diseaseName is effectively empty or N/A, consider it unknown unless plantCondition specifies otherwise
        // This helps prevent empty/NA disease names from being counted as healthy by default if plantCondition is also null
      }

      bool isHealthy = false;
      bool isRisky = false;
      bool isDiseased = false;

      if (plantCondition != null) {
        String normalizedPlantCondition = plantCondition.trim().toLowerCase();
        if (normalizedPlantCondition == "healthy") {
          isHealthy = true;
        } else if (normalizedPlantCondition == "risky") {
          isRisky = true;
        } else if (normalizedPlantCondition == "diseased") {
          isDiseased = true;
        } else { // Fallback to diseaseName if plantCondition is unrecognized
          if (diseaseName == "healthy" || diseaseName == "khỏe mạnh") {
            isHealthy = true;
          } else if (diseaseName.isNotEmpty && diseaseName != "n/a") {
            isDiseased = true;
          }
        }
      } else { // plantCondition is null, rely solely on diseaseName
        if (diseaseName == "healthy" || diseaseName == "khỏe mạnh") {
          isHealthy = true;
        } else if (diseaseName.isNotEmpty && diseaseName != "n/a") {
          isDiseased = true;
        }
      }
      
      // If after all checks, it's not specifically risky or diseased, and it's not explicitly healthy by diseaseName, 
      // it shouldn't be counted as healthy if the intention is to count only explicitly confirmed healthy plants.
      // However, the original logic defaulted to healthy if plantCondition was missing. Let's refine this.
      // If neither risky nor diseased, it's healthy *unless* diseaseName indicates something non-healthy or is empty.
      if (!isRisky && !isDiseased && isHealthy) {
        healthyOverall++;
      } else if (isRisky) {
        riskyOverall++;
      } else if (isDiseased) {
        diseasedOverall++;
      } else if (!isRisky && !isDiseased && !isHealthy && diseaseName.isEmpty) {
        // This case could be an unknown/uncategorized. For now, let's not count it in healthy, risky, or diseased for overall.
        // Or, if the expectation is that anything not diseased/risky is healthy, this needs to be adjusted.
        // Given the screenshot (3 total, 0 healthy, 3 diseased), it seems items not explicitly 'healthy' are counted as 'diseased'.
        // Let's re-evaluate. If it's not healthy and not risky, and diseaseName has a value, it implies diseased.
        // The previous logic: if plantCondition is null: if diseaseName is 'healthy' -> healthy, else if diseaseName is not empty -> diseased.
        // This means 'powdery_mildew' (not empty) becomes diseased.
        // Let's follow: if NOT healthy and NOT risky, and diseaseName is present and NOT 'healthy', then it's diseased.
        // This was implicitly handled by the else if (diseaseName.isNotEmpty && diseaseName != "n/a") for diseased count.
      }

      // Check for Today's stats
      DateTime? timestamp;
      if (data['timestamp'] is Timestamp) {
        timestamp = (data['timestamp'] as Timestamp).toDate();
      } else if (data['timestamp'] is String) {
        timestamp = DateTime.tryParse(data['timestamp'] as String);
      }

      if (timestamp != null && timestamp.isAfter(startOfToday) && timestamp.isBefore(endOfToday)) {
        if (isHealthy) healthyTodayCount++;
        if (isRisky) riskyTodayCount++;
        if (isDiseased) diseasedTodayCount++;
      }
    }

    // The issue with 0 healthy, 3 diseased for 3 total items (2 healthy, 1 mildew) suggests
    // that the 'healthy' items are being misclassified as 'diseased' in the overall count.
    // Let's re-verify the classification for overall counts.
    // The condition: `else if (diseaseName.isNotEmpty && diseaseName != "n/a")` might be too broad for diseased.
    // It should only be diseased if diseaseName is a known disease type OR plantCondition says so.
    // For the screenshot: 2 healthy, 1 powdery_mildew.
    // Total = 3. Healthy = 2. Diseased = 1. Risky = 0.
    // The UI shows: Total=3, Healthy=0, Risky=0, Diseased=3.

    // Corrected logic for overall counts based on re-evaluation:
    healthyOverall = 0; // Reset and recount with refined logic
    riskyOverall = 0;
    diseasedOverall = 0;

    for (var doc in allDocs) {
        var data = doc.data() as Map<String, dynamic>;
        String? plantC = data["plantCondition"] as String?;
        String diseaseN = (data['diseaseName'] ?? (data['result'] is Map ? data['result']['disease'] : null))?.toString().trim().toLowerCase() ?? "";

        bool counted = false;
        if (plantC != null) {
            String normPlantC = plantC.trim().toLowerCase();
            if (normPlantC == "healthy") { healthyOverall++; counted = true; }
            else if (normPlantC == "risky") { riskyOverall++; counted = true; }
            else if (normPlantC == "diseased") { diseasedOverall++; counted = true; }
        }

        if (!counted) { // If not determined by plantCondition, use diseaseName
            if (diseaseN == "healthy" || diseaseN == "khỏe mạnh") {
                healthyOverall++;
            } else if (diseaseN.isNotEmpty && diseaseN != "n/a") {
                // This is where 'powdery_mildew' should be counted as diseased.
                // And 'healthy' (if plantCondition was null) should have been caught above.
                diseasedOverall++; 
            } else {
                // If diseaseName is empty or N/A, and plantCondition was null, what to do?
                // These are effectively uncategorized. For summary, they might not fit cleanly.
                // For now, they won't increment any of the three main counters if they reach here.
            }
        }
    }

    healthyPlants.value = healthyOverall;
    riskyPlants.value = riskyOverall;
    diseasedPlants.value = diseasedOverall;

    healthyPlantsToday.value = healthyTodayCount;
    riskyPlantsToday.value = riskyTodayCount;
    diseasedPlantsToday.value = diseasedTodayCount;
  }

  @override
  void onClose() {
    _diagnosisSubscription?.cancel();
    _esp32camSubscription?.cancel();
    super.onClose();
  }
}
