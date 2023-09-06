import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDnUUtJ5FlV486AXYnu2lfuIQpoq0Dshhg',
  authDomain: 'crud-firestore-2fcac.firebaseapp.com',
  projectId: 'crud-firestore-2fcac',
  storageBucket: 'crud-firestore-2fcac.appspot.com',
  messagingSenderId: '512704526673',
  appId: '1:512704526673:web:fa510f402ebebbcc0f3b70',
  measurementId: 'G-Q5HPZ3L83G',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
