// const firebaseConfig = {
//     // Your Firebase project configuration
//     apiKey: '<API_KEY>',
//     authDomain: '<AUTH_DOMAIN>',
//     projectId: '<PROJECT_ID>',
//   };
  
//   export default firebaseConfig;


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
  authDomain: "blogapp-fce07.firebaseapp.com",
  projectId: "blogapp-fce07",
  storageBucket: "blogapp-fce07.appspot.com",
  messagingSenderId: "868819087586",
  appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
  measurementId: "G-QLC817XKEM"



  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
