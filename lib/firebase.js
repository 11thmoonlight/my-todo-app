// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE7pHcNEohCivisScj04oLACga7sFBG0g",
  authDomain: "to-do-371ff.firebaseapp.com",
  projectId: "to-do-371ff",
  storageBucket: "to-do-371ff.firebasestorage.app",
  messagingSenderId: "749716263231",
  appId: "1:749716263231:web:55768306e343303536038a",
  measurementId: "G-FVYKV0L3KG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
