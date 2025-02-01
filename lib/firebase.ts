import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB-farmmFzPzbsImqsIfOaoP0XM6doVDoI',
  authDomain: '',
  projectId: 'kotatsumur',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
