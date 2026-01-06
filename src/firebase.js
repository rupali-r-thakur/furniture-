// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuMiZIZmw36OQ3iMAM-U76ObT4rLFz4n0",
  authDomain: "furniture-auth-dfe81.firebaseapp.com",
  projectId: "furniture-auth-dfe81",
  storageBucket: "furniture-auth-dfe81.firebasestorage.app",
  messagingSenderId: "746479654238",
  appId: "1:746479654238:web:45d9364aeefc4e8b086bcf",
  measurementId: "G-C16JQEEN70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);