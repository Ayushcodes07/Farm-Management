// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBofEl4PIqYebwXkfM-QxRZDjWj7lguvsw",
  authDomain: "farmmanagement-d0d53.firebaseapp.com",
  projectId: "farmmanagement-d0d53",
  storageBucket: "farmmanagement-d0d53.appspot.com",
  messagingSenderId: "474479731445",
  appId: "1:474479731445:web:989b5761f4ddd286c6dbbc",
  measurementId: "G-S5FQ72NHT3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// ✅ Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("✅ User signed in:", user);
    return user;
  } catch (error) {
    console.error("❌ Error during sign-in:", error);
    alert(`Sign-in failed: ${error.message}`);
  }
};
