import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { FIREBASE_API_KEY } from '@env';
const API_KEY = "AIzaSyB-farmmFzPzbsImqsIfOaoP0XM6doVDoI"; // Firebase の API Key
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: '',
  projectId: 'kotatsumur',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
