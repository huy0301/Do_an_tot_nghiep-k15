import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'dart:async'; // Required for Future

// Placeholder for generated l10n messages. 
// In a real setup, this would be auto-generated by `flutter gen-l10n` or a similar tool.
// For now, we'll create a simplified manual version.

class AppLocalizations {
  AppLocalizations(this.localeName);

  static Future<AppLocalizations> load(Locale locale) {
    final String name = locale.countryCode == null || locale.countryCode!.isEmpty
        ? locale.languageCode
        : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);

    // Simulating loading logic - in a real app, you'd load the .arb files here
    // or use the generated messages.
    return Future.value(AppLocalizations(localeName));
  }

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  // Add this static getter for the delegate
  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  final String localeName;

  // Example strings - these would come from your .arb files via code generation
  String get healthSummaryTitle {
    if (localeName == 'vi') return 'Tóm tắt sức khỏe';
    return 'Health Summary';
  }

  String get totalPlantsTracked {
    if (localeName == 'vi') return 'Tổng số cây\nđang theo dõi';
    return 'Total plants\ntracked';
  }

  String get numberOfHealthyPlant {
    if (localeName == 'vi') return 'Số lượng\ncây khỏe mạnh';
    return 'Number of\nHealthy Plant';
  }

  String get numberOfRiskyPlant {
    if (localeName == 'vi') return 'Số lượng\ncây có nguy cơ';
    return 'Number of\nRisky Plant';
  }

  String get numberOfDiseasedPlant {
    if (localeName == 'vi') return 'Số lượng\ncây bị bệnh';
    return 'Number of\nDiseased Plant';
  }

   String welcomeMessage(String userName) {
    if (localeName == 'vi') return 'Chào mừng, $userName!';
    return 'Welcome, $userName!';
  }

  String get noTasksAdded {
    if (localeName == 'vi') return 'Chưa có nhiệm vụ nào được thêm!';
    return 'No tasks added yet!';
  }

  String get addTap{
    if (localeName == 'vi') return 'Thêm công việc';
    return 'Add Task';
  }

  String get todayTask{
    if (localeName == 'vi') return 'Nhiệm vụ hôm nay';
    return 'Today\'s Tasks';
  }
  
  String get plantHealthCheck {
    if (localeName == 'vi') return 'Kiểm tra sức khỏe cây trồng';
    return 'Plant Health Check';
  }

  String get newRecommendation {
    if (localeName == 'vi') return 'Đề xuất mới';
    return 'New Recommendation';
  }

  String get waterReminder {
    if (localeName == 'vi') return 'Nhắc nhở tưới nước';
    return 'Water Reminder';
  }

  String get aiReminder {
    if (localeName == 'vi') return 'Nhắc nhở AI';
    return 'AI Reminder';
  }
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => ['en', 'vi'].contains(locale.languageCode);

  @override
  Future<AppLocalizations> load(Locale locale) => AppLocalizations.load(locale);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
} 