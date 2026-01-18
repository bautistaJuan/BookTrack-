// lib/firebase/index.ts
/**
 * Firebase module exports
 * Centralized exports for all Firebase-related functionality
 */

// Config and instances
export { app, db, auth, googleProvider } from "./config";

// Authentication functions
export { signInWithGoogle, logOut, getCurrentUser } from "./auth";
