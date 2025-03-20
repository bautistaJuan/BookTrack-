// lib/auth.ts
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error en la autenticación:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
