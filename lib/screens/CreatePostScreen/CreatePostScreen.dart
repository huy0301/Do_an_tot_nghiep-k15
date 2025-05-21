import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart'; // 📌 Import for Date Formatting


class CreatePostScreen extends StatefulWidget {
  @override
  _CreatePostScreenState createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final ImagePicker picker = ImagePicker();
  File? selectedImage;
  bool isUploading = false;

  // 📌 Pick Image from Gallery
  Future<void> pickImage() async {
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        selectedImage = File(pickedFile.path);
      });
    }
  }

  // 📌 Convert Image to Base64
  Future<String> convertImageToBase64(File imageFile) async {
    List<int> imageBytes = await imageFile.readAsBytes();
    return base64Encode(imageBytes);
  }

  // 📌 Fetch Logged-in User Details from Firestore
  // 📌 Fetch Logged-in User Details from Firestore Safely
  Future<Map<String, dynamic>?> getUserDetails() async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      print("getUserDetails: User is null. Not logged in?");
      // Return default for non-logged in user or if user becomes null during async gap
      return {
        "username": "Anonymous User",
        "userProfilePic": "",
      };
    }
    print("getUserDetails: User ID: ${user.uid}");

    try {
      DocumentSnapshot userDoc =
      await FirebaseFirestore.instance.collection("users").doc(user.uid).get();

      if (userDoc.exists && userDoc.data() != null) {
        print("getUserDetails: User document data found: ${userDoc.data()}");
        Map<String, dynamic> userData = userDoc.data() as Map<String, dynamic>;
        String firstName = userData.containsKey("firstName") ? userData["firstName"] : "";
        String lastName = userData.containsKey("lastName") ? userData["lastName"] : "";
        String fullName = "$firstName $lastName".trim();

        return {
          "username": fullName.isNotEmpty ? fullName : "User (No Name)", // More specific default
          "userProfilePic": userData.containsKey("profilePic") ? userData["profilePic"] : "",
        };
      } else {
        print("getUserDetails: User document does not exist or data is null for ID: ${user.uid}. Returning default details.");
        // Return default if document doesn't exist or has no data
        return {
          "username": "User (No Data)",
          "userProfilePic": "",
        };
      }
    } catch (e) {
      print("⚠️ Error fetching user details: $e. Returning default details.");
      // Return default on any other error
      return {
        "username": "User (Error)",
        "userProfilePic": "",
      };
    }
    // This line should ideally not be reached if logic is correct, 
    // but as a failsafe, return default.
    // print("getUserDetails: Reached end of function unexpectedly. Returning default details.");
    // return {
    //   "username": "User (Failsafe)",
    //   "userProfilePic": "",
    // };
  }


  // 📌 Upload Post to Firestore with Base64 Image and Full Name
  // 📌 Upload Post to Firestore with Base64 Image and Full Name
  Future<void> uploadPost() async {
    if (selectedImage == null || titleController.text.isEmpty || descriptionController.text.isEmpty) {
      Get.snackbar("Error", "All fields are required!", backgroundColor: Colors.red, colorText: Colors.white);
      return;
    }

    setState(() {
      isUploading = true;
    });

    try {
      // ✅ Get Logged-in User ID
      String userId = FirebaseAuth.instance.currentUser?.uid ?? "unknown_user";

      // ✅ Fetch User Details
      Map<String, dynamic>? userDetails = await getUserDetails();
      if (userDetails == null) {
        Get.snackbar("Error", "User details not found!", backgroundColor: Colors.red, colorText: Colors.white);
        return;
      }

      // ✅ Convert Image to Base64
      String base64Image = await convertImageToBase64(selectedImage!);

      // ✅ Get Formatted Timestamp (Example: "16 March 2025, 09:00 AM")
      String formattedTimestamp = DateFormat("dd MMM yyyy, hh:mm a").format(DateTime.now());

      // ✅ Store Post Data in Firestore
      await FirebaseFirestore.instance.collection("community_posts").add({
        "userId": userId,
        "username": userDetails["username"], // 🔥 Store Full Name Instead of Just Username
        "userProfilePic": userDetails["userProfilePic"], // 🔥 Store Profile Picture
        "title": titleController.text,
        "description": descriptionController.text,
        "imageBase64": base64Image,  // 🔥 Store Base64 Image
        "likes": 0, // 🔥 Initialize Likes
        "timestamp": formattedTimestamp, // 🔥 Store Formatted Timestamp
      });

      // ✅ Show Success Message
      Get.snackbar("Success", "Post uploaded successfully!", backgroundColor: Colors.green, colorText: Colors.white);

      // ✅ Wait for 1 second, then go to Community Screen & Refresh Posts
      await Future.delayed(Duration(seconds: 1));

      // ✅ Ensure we pop the CreatePostScreen and navigate back to CommunityScreen
      Get.offAllNamed("/community");

    } catch (e) {
      Get.snackbar("Error", "Failed to upload post: $e", backgroundColor: Colors.red, colorText: Colors.white);
    }

    setState(() {
      isUploading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Create Post"), backgroundColor: Colors.green[200]),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              // 📌 Image Preview
              GestureDetector(
                onTap: pickImage,
                child: Container(
                  height: 200,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: selectedImage != null
                      ? Image.file(selectedImage!, fit: BoxFit.cover)
                      : Icon(Icons.add_a_photo, size: 50, color: Colors.grey),
                ),
              ),

              SizedBox(height: 16),

              // 📌 Title Input
              TextField(
                controller: titleController,
                decoration: InputDecoration(labelText: "Post Title"),
              ),

              SizedBox(height: 16),

              // 📌 Description Input
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: "Description"),
                maxLines: 3,
              ),

              SizedBox(height: 20),

              // 📌 Upload Button
              ElevatedButton(
                onPressed: isUploading ? null : uploadPost,
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                child: isUploading
                    ? CircularProgressIndicator(color: Colors.white)
                    : Text("Upload Post"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
