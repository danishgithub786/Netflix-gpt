// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJsk5vFTVx5gJ_SQSINnCQAEvjDV_6fFU",
  authDomain: "netflix-gpt-381e7.firebaseapp.com",
  projectId: "netflix-gpt-381e7",
  storageBucket: "netflix-gpt-381e7.appspot.com",
  messagingSenderId: "539651381585",
  appId: "1:539651381585:web:6db1bdc06412246df15b70",
  measurementId: "G-YS7PLQ6NDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    

export const auth=getAuth();