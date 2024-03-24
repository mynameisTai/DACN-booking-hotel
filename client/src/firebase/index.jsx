// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHYk3MwDzQw8IPSsgacwoplJatcBKrTLg",
  authDomain: "bookinghotel-3e9f0.firebaseapp.com",
  projectId: "bookinghotel-3e9f0",
  storageBucket: "bookinghotel-3e9f0.appspot.com",
  messagingSenderId: "835080562233",
  appId: "1:835080562233:web:350d05aac56e9b15ec8fe8",
  measurementId: "G-3W3MCG87P3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
