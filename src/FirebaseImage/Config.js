// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmnZy4NT3v6uinvKlKW8Ch95G6riIAB_k",
  authDomain: "tripbyday-id.firebaseapp.com",
  projectId: "tripbyday-id",
  storageBucket: "tripbyday-id.appspot.com",
  messagingSenderId: "791103921698",
  appId: "1:791103921698:web:19c94c17865a826467f47b",
  measurementId: "G-N9VCZR582D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app);
