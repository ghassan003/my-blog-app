// src/NotificationForm.js
import React, { useState } from 'react';
import { messaging } from './firebase'; // Import Firebase messaging
import { getToken } from 'firebase/messaging';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  // Request notification permission and get the device token
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: 'BHeVD-tRABzamRbFMPEmoXqgDkMtGzwNrStDf0ZcVQc3_xv0nCOy7jcIDhgrw4OF_caYFs6xOkcF5qXNweV-B0o' });

        
        if (token) {
          setToken(token);
        } else {
          setError('No registration token available. Request permission to generate one.');
        }
      } else {
        setError('Permission not granted for notifications.');
      }
    } catch (error) {
      setError(`Failed to get token: ${error.message}`);
    }
  };

  // Send the notification using Firebase Cloud Messaging (FCM)
  const sendNotification = async () => {
    if (!token) {
      setError('No token available to send notification.');
      return;
    }

    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'fUQ5YjobZhMN-fVxu3pbwSqZrNH6GaOpyOzCzlHvEu8', // Replace with your Firebase server key
        },
        body: JSON.stringify({
          to: token,
          notification: {
            title: title,
            body: description,
          },
        }),
      });

      if (response.ok) {
        console.log('Notification sent successfully');
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      setError(`Error sending notification: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Send Push Notification</h2>
      <button onClick={requestPermission}>Request Notification Permission</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={sendNotification}>Send Notification</button>
      </div>
    </div>
  );
};

export default NotificationForm;
