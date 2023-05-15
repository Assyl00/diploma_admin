// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/database';


  const firebaseConfig = {
    apiKey: "AIzaSyDqVkZcJRAuHT3801yiCU75HKE8z9T3g-Q",
    authDomain: "face-atendance.firebaseapp.com",
    databaseURL: "https://face-atendance-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "face-atendance",
    storageBucket: "face-atendance.appspot.com",
    messagingSenderId: "246502818632",
    appId: "1:246502818632:web:5574f14a84c24180e7297d",
    measurementId: "G-RT33VLWW4G"
  };
// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

// export default firebaseConfig

