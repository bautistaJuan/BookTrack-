// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// [X] CONFIGURAR FIRESTORE PARA PODER USAR EN firestore.ts

const firebaseConfig = {
  apiKey: "AIzaSyC6tuaUYfbkmb8mFkkCpEHZKZN9fogE6i4",
  authDomain: "test-1-f0c5d.firebaseapp.com",
  projectId: "test-1-f0c5d",
  storageBucket: "test-1-f0c5d.firebasestorage.app",
  messagingSenderId: "301860587811",
  appId: "1:301860587811:web:fb886be6141379eb172496",
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };
