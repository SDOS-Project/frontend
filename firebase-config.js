import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9eOhosb9NWhcUtA00qvXhOMoby9Km714',
  authDomain: 'sdos-530a1.firebaseapp.com',
  projectId: 'sdos-530a1',
  storageBucket: 'sdos-530a1.appspot.com',
  messagingSenderId: '643426719200',
  appId: '1:643426719200:web:cddb78653d11a108e04785',
  measurementId: 'G-SQ74S30P6K',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();

export { auth, storage };
