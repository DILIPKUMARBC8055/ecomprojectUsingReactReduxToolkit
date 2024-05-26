// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYVFZBeTr_yVd7TcG6CscL8QiTxUWJV6A",
  authDomain: "blogapp-765ff.firebaseapp.com",
  projectId: "blogapp-765ff",
  storageBucket: "blogapp-765ff.appspot.com",
  messagingSenderId: "1012273681325",
  appId: "1:1012273681325:web:205e4f131fb18337e6c724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
export { db };
