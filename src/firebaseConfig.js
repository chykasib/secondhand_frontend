// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSAaxRcdTmNz6QSKOjDvR25_kc42OdEkE",
  authDomain: "secondhand-book-marketplace.firebaseapp.com",
  projectId: "secondhand-book-marketplace",
  storageBucket: "secondhand-book-marketplace.firebasestorage.app",
  messagingSenderId: "906832289326",
  appId: "1:906832289326:web:af3978b78302b0ff9a09bf",
  measurementId: "G-QP665Z0VC9",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
