import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5UHv1-RU6DAdYYwXoHWrtb0BI8lzNtUA",
  authDomain: "react-firebase-1cf78.firebaseapp.com",
  projectId: "react-firebase-1cf78",
  storageBucket: "react-firebase-1cf78.appspot.com",
  messagingSenderId: "625540679810",
  appId: "1:625540679810:web:4f3f7c826851e06d2acc9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);