// Import the required functions from the Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY423F5ItBa1IydRxb60OuZ_7LOKn7qA4",
  authDomain: "travelx-9be81.firebaseapp.com",
  projectId: "travelx-9be81",
  storageBucket: "travelx-9be81.firebasestorage.app",
  messagingSenderId: "954010028248",
  appId: "1:954010028248:web:56f8d147fa928603dc6fad",
  measurementId: "G-LDQWQX76ER"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
