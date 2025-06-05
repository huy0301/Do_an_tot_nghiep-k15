import 'package:agromind/screens/custom_drawer/custom_drawer.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../../controllers/auth_controller/auth_controller.dart';
import 'package:cached_network_image/cached_network_image.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final AuthController authController = Get.find<AuthController>();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController locationController = TextEditingController();
  String email = "";
  File? _selectedImage;
  String? _currentProfileImageUrl;
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    loadUserData();
  }

  /// **Load user details from Firestore**
  Future<void> loadUserData() async {
    final currentUserEmail = authController.user.value?.email;
    var userData = await authController.getUserDetails();
    if (mounted) {
      setState(() {
        email = currentUserEmail ?? userData?['email'] ?? "N/A"; 
        firstNameController.text = userData?['firstName'] ?? "";
        lastNameController.text = userData?['lastName'] ?? "";
        locationController.text = userData?['location'] ?? "";
        _currentProfileImageUrl = userData?['profileImageUrl'];
      });
    }
  }

  /// **Pick Profile Image**
  Future<void> pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery, imageQuality: 70);
    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
      });
    }
  }

  /// **Update User Profile in Firestore**
  void updateProfile() async {
    await authController.updateUserProfile(
      firstName: firstNameController.text,
      lastName: lastNameController.text,
      location: locationController.text,
      imageFile: _selectedImage,
    );
    await loadUserData();
    if (mounted) {
    setState(() {
        _isEditing = false;
        _selectedImage = null;
    });
    }
  }

  void onClose() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: CustomDrawer(onClose: onClose),
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          "Profile & Settings",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/images/plantdiagnosis_background.png",
              fit: BoxFit.cover,
            ),
          ),
          Center(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 60),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: 10),
                  Stack(
                    children: [
                      CircleAvatar(
                        radius: 60,
                        backgroundColor: Colors.grey[300],
                        backgroundImage: _selectedImage != null
                            ? FileImage(_selectedImage!) as ImageProvider
                            : (_currentProfileImageUrl != null && _currentProfileImageUrl!.isNotEmpty
                                ? CachedNetworkImageProvider(_currentProfileImageUrl!)
                                : AssetImage("assets/images/profile_placeholder.png") as ImageProvider),
                        child: (_selectedImage == null && (_currentProfileImageUrl == null || _currentProfileImageUrl!.isEmpty))
                            ? Icon(Icons.person, size: 50, color: Colors.white70)
                            : null,
                      ),
                      if (_isEditing)
                      Positioned(
                        bottom: 5,
                        right: 5,
                        child: FloatingActionButton(
                          mini: true,
                          backgroundColor: Colors.green.shade700,
                          onPressed: pickImage,
                          child: Icon(Icons.camera_alt, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                  buildTextField(
                    label: "Email",
                    icon: Icons.email,
                    value: email,
                    isEditable: false,
                  ),
                  SizedBox(height: 10),
                  buildTextField(
                    controller: firstNameController,
                    label: "First Name",
                    icon: Icons.person,
                    isEditable: _isEditing,
                  ),
                  SizedBox(height: 10),
                  buildTextField(
                    controller: lastNameController,
                    label: "Last Name",
                    icon: Icons.person_outline,
                    isEditable: _isEditing,
                  ),
                  SizedBox(height: 10),
                  buildTextField(
                    controller: locationController,
                    label: "Location",
                    icon: Icons.location_on,
                    isEditable: _isEditing,
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      if (_isEditing) {
                        updateProfile();
                      } else {
                        setState(() {
                          _isEditing = true;
                        });
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green.shade800,
                      padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    child: Text(
                      _isEditing ? "Save Profile" : "Edit Profile",
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      authController.logout();
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red.shade600,
                      padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    child: Text(
                      "Logout",
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// 🌟 **Reusable TextField Widget**
  Widget buildTextField({
    TextEditingController? controller,
    required String label,
    required IconData icon,
    bool isEditable = true,
    String? value,
  }) {
    return TextField(
      controller: controller ?? TextEditingController(text: value),
      readOnly: !isEditable,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: Colors.green.shade800),
        filled: true,
        fillColor: Colors.white.withOpacity(0.9),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide.none,
        ),
      ),
      style: TextStyle(fontSize: 16),
    );
  }
}
