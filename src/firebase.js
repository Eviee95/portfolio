// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ← ADD THIS IMPORT

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmfgqysdxc8NSLonL63Qo3at_erweCJiA",
  authDomain: "portfolio-1c938.firebaseapp.com",
  projectId: "portfolio-1c938",
  storageBucket: "portfolio-1c938.firebasestorage.app",
  messagingSenderId: "655022878593",
  appId: "1:655022878593:web:d4144e449848b05532c280",
  measurementId: "G-RV46N8R1XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ← ADD THIS LINE

// Export the db variable
export { db }; // ← ADD THIS EXPORT
export default app;