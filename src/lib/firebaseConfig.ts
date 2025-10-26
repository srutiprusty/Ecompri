// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the authentication module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOh7hHPkPIry9ASM4_Y3M90qCemC10lqI",
  authDomain: "ecompri-d81a4.firebaseapp.com",
  projectId: "ecompri-d81a4",
  storageBucket: "ecompri-d81a4.firebasestorage.app",
  messagingSenderId: "1058395564291",
  appId: "1:1058395564291:web:5034f26a61a333e8d82136",
  measurementId: "G-HHYMCFQRQ8",
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
let auth;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth }; // Export the auth object
