import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getDatabase, ref, push } from "firebase/database";
import { firebaseConfig } from "../firebaseConfig.js";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

async function writeUserData(userToken,email) {
	// Add additional user data to Firestore (without storing the password)
	const docRef = await addDoc(collection(db, 'pushUsers'), {
        email,
        userToken	
      });

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
export const sendPushNotification = async (accessToken, userToken, title, body) => {
	const payload = {
		message: {
			token: userToken,
			notification: {
				body: body || "This is an FCM notification message!",
				title: title || "FCM Message"
			}
		}
	};

	await fetch("https://fcm.googleapis.com/v1/projects/blogapp-fce07/messages:send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify(payload)
	});
};

// Request permission and get the token
const requestNotificationPermission = async (email) => {
	try {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await getToken(messaging);
			console.log('token:' ,token)
			if (token) {
				writeUserData(token,email);
				// sendPushNotification(token);
			} else {
				alert("No registration token available. Request permission to generate one.");
			}
		} else {
			alert("Permission not granted for notifications.");
		}
	} catch (error) {
		alert("An error occurred, please refresh the app. ");
	}
};

// Function to handle foreground messages
onMessage(messaging, (payload) => {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/info.png"
	};

	new Notification(notificationTitle, notificationOptions);
});

// Call the request permission function
export default requestNotificationPermission;
