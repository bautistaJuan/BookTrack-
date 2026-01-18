// lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration object
 * All values are loaded from environment variables for security
 */
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialize Firebase app (singleton pattern to prevent multiple instances)
 */
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Firestore database instance
 */
const db = getFirestore(app);

/**
 * Firebase Auth instance
 */
const auth = getAuth(app);

/**
 * Google Auth Provider for OAuth login
 */
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
