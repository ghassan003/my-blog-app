
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { getStorage } from "firebase/storage"; // Import Storage

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
//   authDomain: "blogapp-fce07.firebaseapp.com",
//   projectId: "blogapp-fce07",
//   storageBucket: "blogapp-fce07.appspot.com",
//   messagingSenderId: "868819087586",
//   appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
//   measurementId: "G-QLC817XKEM"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Firestore and Storage
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { db, storage };
////////////////////////////////////////////////////////////
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
//   authDomain: "blogapp-fce07.firebaseapp.com",
//   projectId: "blogapp-fce07",
//   storageBucket: "blogapp-fce07.appspot.com",
//   messagingSenderId: "868819087586",
//   appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
//   measurementId: "G-QLC817XKEM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// const db = getFirestore(app);
// const storage = getStorage(app);
// const messaging = getMessaging(app);

// // Request permission and get FCM token
// export const requestPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//       const token = await getToken(messaging, {
//         vapidKey: 'YOUR_PUBLIC_VAPID_KEY' // Replace with your VAPID key
//       });
//       if (token) {
//         console.log('FCM Token:', token);
//         // Send the token to your backend to store it
//       }
//     } else {
//       console.log('Notification permission denied');
//     }
//   } catch (error) {
//     console.error('Error getting notification permission:', error);
//   }
// };

// // Handle foreground messages
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // Show notification or handle the message here
// });

// export { db, storage, messaging };
//////////////////////////////////////////////////////////////
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase configuration
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

// Initialize Firestore, Storage, and Messaging
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { db, storage, messaging, getToken, onMessage };
