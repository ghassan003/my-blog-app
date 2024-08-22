// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDpkbiDEIXqPSOu9_CUj_mRdxTYMAAdlSU",
    authDomain: "blogapp-fce07.firebaseapp.com",
    projectId: "blogapp-fce07",
    storageBucket: "blogapp-fce07.appspot.com",
    messagingSenderId: "868819087586",
    appId: "1:868819087586:web:2ebc5625ae62b225e0eebb",
    measurementId: "G-QLC817XKEM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgro10
PndMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
