import 'dart:convert';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:http/http.dart' as http;

class WeatherService {
  final String apiKey = "5710ae45242046421c2c729efc23f134"; // Replace with your API Key

  // ✅ 1. Get User's Current Location (Latitude & Longitude)
  Future<Position> _getCurrentLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Check if location services are enabled
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception("Location services are disabled.");
    }

    // Check & request permissions
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.deniedForever) {
        throw Exception("Location permissions are permanently denied.");
      }
    }

    return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);
  }

  // ✅ 2. Convert Coordinates to City Name
  Future<String> _getCityFromCoordinates(double lat, double lon) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(lat, lon);
      if (placemarks.isNotEmpty) {
        Placemark first = placemarks.first;
        String? city = first.locality; // Ưu tiên locality (thành phố trực thuộc)
        if (city == null || city.isEmpty) {
          city = first.subAdministrativeArea; // Thử subAdministrativeArea (quận/huyện)
        }
        if (city == null || city.isEmpty) {
          city = first.administrativeArea; // Thử administrativeArea (tỉnh/thành phố trung ương)
        }
        if (city == null || city.isEmpty) {
          city = first.country; // Cuối cùng thử quốc gia
        }
        return city ?? "Unknown Location"; // Trả về "Unknown Location" nếu tất cả đều null
      }
    } catch (e) {
      print("Error fetching city name: $e");
    }
    return "Unknown Location"; // Mặc định nếu có lỗi hoặc không tìm thấy
  }

  // ✅ 3. Fetch Weather Data Based on GPS Location
  Future<Map<String, dynamic>?> fetchWeather() async {
    try {
      Position position = await _getCurrentLocation();
      // Vẫn lấy tên thành phố để có thể hiển thị cho người dùng nếu cần
      String cityNameForDisplay = await _getCityFromCoordinates(
          position.latitude, position.longitude);
      print("Location determined: lat=${position.latitude}, lon=${position.longitude}, potential city name: $cityNameForDisplay");

      // Sử dụng tọa độ trực tiếp để fetch weather
      final url = Uri.parse(
          "https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=$apiKey&units=metric");

      final response = await http.get(url);

      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        // Thêm tên thành phố đã lấy được vào data để tiện sử dụng nếu muốn hiển thị
        data["userFriendlyCityName"] = cityNameForDisplay;
        // OpenWeatherMap cũng trả về một trường 'name' là tên địa điểm gần nhất họ tìm thấy từ tọa độ
        print("Successfully fetched weather for ${data['name']} (OpenWeatherMap name), user-determined city: $cityNameForDisplay");
        return data;
      } else {
        print("Error: Failed to fetch weather data using coordinates. Status Code: ${response.statusCode}, Body: ${response.body}");
        return null;
      }
    } catch (e) {
      print("Exception in fetchWeather (possibly location services): $e");
      return null;
    }
  }
}
