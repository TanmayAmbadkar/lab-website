// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- ADD THIS
import { getStorage } from "firebase/storage";     // <-- ADD THIS
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8UToDCNyfjuLbML3vWxYmcmQTmUA6BN4",
  authDomain: "lab-website-backend.firebaseapp.com",
  projectId: "lab-website-backend",
  storageBucket: "lab-website-backend.firebasestorage.app",
  messagingSenderId: "20280621107",
  appId: "1:20280621107:web:8bfce5e6d7dbe797bf0b46",
  measurementId: "G-DY6LEYRXW3"
};


// 1. Initialize Firebase first
const app = initializeApp(firebaseConfig);

// 2. Then, initialize the other services using the 'app' instance
const db = getFirestore(app);
const storage = getStorage(app);

// 3. Finally, export all the initialized services
export { app, db, storage };