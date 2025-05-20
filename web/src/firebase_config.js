// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3HwdAc5qInzq9vEq5PnaepeJiqsUEdP0",
  authDomain: "apple-disease-20b0b.firebaseapp.com",
  databaseURL: "https://apple-disease-20b0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "apple-disease-20b0b",
  storageBucket: "apple-disease-20b0b.firebasestorage.app",
  messagingSenderId: "1017696428184",
  appId: "1:1017696428184:web:1265dc2323786b003ef0ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }; 