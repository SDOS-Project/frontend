// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC9eOhosb9NWhcUtA00qvXhOMoby9Km714',
  authDomain: 'sdos-530a1.firebaseapp.com',
  projectId: 'sdos-530a1',
  storageBucket: 'sdos-530a1.appspot.com',
  messagingSenderId: '643426719200',
  appId: '1:643426719200:web:cddb78653d11a108e04785',
  measurementId: 'G-SQ74S30P6K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
