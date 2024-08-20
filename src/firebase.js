
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
  authDomain: "blogapp-fce07.firebaseapp.com",
  projectId: "blogapp-fce07",
  storageBucket: "blogapp-fce07.appspot.com",
  messagingSenderId: "868819087586",
  appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
  measurementId: "G-QLC817XKEM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };



