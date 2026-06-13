// lib/firebase/auth.ts
import { linkWithPopup, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider, anonymousSignIn } from "./config";
import { AuthenticationError } from "../errors";

/**
 * Sign in with Google OAuth
 * @returns The authenticated user or undefined if failed
 * @throws AuthenticationError if sign-in fails
 *
 */
export const signInWithGoogle = async (): Promise<User | undefined> => {
  try {
    if (auth.currentUser?.isAnonymous) {
      const result = await linkWithPopup(auth.currentUser, googleProvider);
      return result.user;
    }

    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al iniciar sesión";
    console.error("Error en la autenticación:", error);
    throw new AuthenticationError(message);
  }
};

/**
 * Sign in anonymously
 * @returns The authenticated user or undefined if failed
 * @throws AuthenticationError if sign-in fails
 */
export const signInAnonymously = async (): Promise<User | undefined> => {
  try {
    const result = await anonymousSignIn();
    return result.user;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al iniciar sesión anónimamente";
    console.error("Error al iniciar sesión anónimamente:", error);
    throw new AuthenticationError(message);
  }
};

/**
 * Sign out the current user
 * @throws AuthenticationError if sign-out fails
 */
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al cerrar sesión";
    console.error("Error al cerrar sesión:", error);
    throw new AuthenticationError(message);
  }
};

/**
 * Get the currently authenticated user
 * @returns The current user or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
