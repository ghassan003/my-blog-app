// // public/firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
//   authDomain: "blogapp-fce07.firebaseapp.com",
//   projectId: "blogapp-fce07",
//   storageBucket: "blogapp-fce07.appspot.com",
//   messagingSenderId: "868819087586",
//   appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
//   measurementId: "G-QLC817XKEM"
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   });
// });


importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
import { firebaseConfig } from '../src/firebaseConfig.js'

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(function (payload) {
	console.log("Received background message: ", payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		// icon: "/info.png" // Optional: add a notification icon
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
