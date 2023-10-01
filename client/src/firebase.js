// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-8b0b5.firebaseapp.com",
  projectId: "real-estate-8b0b5",
  storageBucket: "real-estate-8b0b5.appspot.com",
  messagingSenderId: "201812888533",
  appId: "1:201812888533:web:0d3f7081e329d66cc34b5c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
