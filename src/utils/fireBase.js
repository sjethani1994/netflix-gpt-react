// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeZtXJwvl8mAVenzvu5afYOQzDxdg0hhw",
  authDomain: "netflix-gpt-312d4.firebaseapp.com",
  projectId: "netflix-gpt-312d4",
  storageBucket: "netflix-gpt-312d4.firebasestorage.app",
  messagingSenderId: "852189565670",
  appId: "1:852189565670:web:0de9a98da627ed6931a127",
  measurementId: "G-F9P61VJP0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
