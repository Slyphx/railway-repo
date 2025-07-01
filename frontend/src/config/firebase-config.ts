import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3GyTT0N6JSdETT-NrYCk1AKxLFNbUjrk",
  authDomain: "crowdspark-ea9d0.firebaseapp.com",
  projectId: "crowdspark-ea9d0",
  storageBucket: "crowdspark-ea9d0.firebasestorage.app",
  messagingSenderId: "929691233339",
  appId: "1:929691233339:web:ef35a1530aaebcbfab401e",
  measurementId: "G-4W5E3T268H",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
