import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Thay thế bằng cấu hình Firebase của bạn
  apiKey: "AIzaSyD3HwdAc5qInzq9vEq5PnaepeJiqsUEdP0",
  authDomain: "apple-disease-20b0b.firebaseapp.com",
  databaseURL: "https://apple-disease-20b0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "apple-disease-20b0b",
  storageBucket: "apple-disease-20b0b.firebasestorage.app",
  messagingSenderId: "1017696428184",
  appId: "1:1017696428184:web:1265dc2323786b003ef0ed",
  measurementId: "G-HYZXXPCMHZ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Kiểm tra xem app đã được khởi tạo chưa
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 