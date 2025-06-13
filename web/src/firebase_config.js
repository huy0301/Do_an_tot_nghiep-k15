// Import các hàm cần thiết từ Firebase SDK.
// Mỗi hàm tương ứng với một dịch vụ của Firebase.
import { initializeApp } from "firebase/app"; // Hàm khởi tạo ứng dụng Firebase.
import { getAuth } from "firebase/auth"; // Hàm để lấy đối tượng quản lý xác thực người dùng.
import { getFirestore } from "firebase/firestore"; // Hàm để lấy đối tượng tương tác với Firestore Database.
import { getStorage } from "firebase/storage"; // Hàm để lấy đối tượng tương tác với Firebase Storage.

// **CẢNH BÁO BẢO MẬT:**
// Việc lưu trữ các thông tin cấu hình Firebase (API keys) trực tiếp trong mã nguồn
// là một rủi ro bảo mật. Bất kỳ ai xem mã nguồn trang web của bạn đều có thể thấy các khóa này.
// Phương pháp tốt nhất là sử dụng biến môi trường (Environment Variables) để lưu trữ
// các thông tin nhạy cảm này và tải chúng vào ứng dụng một cách an toàn.
// Ví dụ: process.env.NEXT_PUBLIC_API_KEY

// Đối tượng cấu hình chứa thông tin để kết nối đến dự án Firebase của bạn.
const firebaseConfig = {
  apiKey: "AIzaSyD3HwdAc5qInzq9vEq5PnaepeJiqsUEdP0", // Khóa API để xác thực yêu cầu.
  authDomain: "apple-disease-20b0b.firebaseapp.com", // Domain cho Firebase Authentication.
  databaseURL: "https://apple-disease-20b0b-default-rtdb.asia-southeast1.firebasedatabase.app", // URL của Realtime Database.
  projectId: "apple-disease-20b0b", // ID của dự án Firebase.
  storageBucket: "apple-disease-20b0b.firebasestorage.app", // "Thùng chứa" cho Firebase Storage.
  messagingSenderId: "1017696428184", // ID cho dịch vụ Firebase Cloud Messaging.
  appId: "1:1017696428184:web:1265dc2323786b003ef0ed", // ID của ứng dụng web Firebase.
};

// Khởi tạo ứng dụng Firebase với cấu hình đã cung cấp.
// Đây là bước đầu tiên và bắt buộc để sử dụng bất kỳ dịch vụ Firebase nào.
const app = initializeApp(firebaseConfig);

// Khởi tạo và lấy các đối tượng dịch vụ từ ứng dụng Firebase đã được khởi tạo.
const auth = getAuth(app); // Đối tượng để quản lý đăng nhập, đăng ký, người dùng...
const db = getFirestore(app); // Đối tượng để thực hiện các thao tác CRUD (Create, Read, Update, Delete) với Firestore.
const storage = getStorage(app); // Đối tượng để tải lên, tải xuống và quản lý tệp trên Storage.

// Xuất (export) các đối tượng dịch vụ để có thể import và sử dụng chúng
// ở các tệp khác trong ứng dụng.
export { auth, db, storage }; 