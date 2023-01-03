// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxcO2KkK_95LMM1PLtPfbNNJWK6V-qS_Q",
  authDomain: "sklepstolarski-42612.firebaseapp.com",
  projectId: "sklepstolarski-42612",
  storageBucket: "sklepstolarski-42612.appspot.com",
  messagingSenderId: "389107650842",
  appId: "1:389107650842:web:585bed5b40930016f79ca3",
  measurementId: "G-KRZ5MTX69F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;