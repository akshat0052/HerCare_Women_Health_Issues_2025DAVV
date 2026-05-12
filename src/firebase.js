import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5RFAT_3dW2TJhw8QV6cC2XG10xeN0ffI",
  authDomain: "hercare-9598f.firebaseapp.com",
  projectId: "hercare-9598f",
  storageBucket: "hercare-9598f.firebasestorage.app",
  messagingSenderId: "784506583901",
  appId: "1:784506583901:web:bcef841d3bddaf7dea06b4",
  measurementId: "G-5X2TQJ9S2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
