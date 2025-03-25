import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export interface Book {
  author: string;
  pages: string;
  id: string;
  status: "read" | "reading" | "unread";
  pagesRead: number;
  title: string;
  userId: string;
}
const addBook = async ({
  title,
  author,
  pages,
  pagesRead,
}: {
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
}) => {
  const user = auth.currentUser; // Obtener usuario actual
  if (!user) return;
  try {
    await addDoc(collection(db, "books"), {
      title,
      author,
      pages,
      pagesRead,
      status: "Por Leer", // Estado inicial
      userId: user.uid, // Asignar el libro al usuario autenticado
    });
  } catch (error) {
    console.error("Error al agregar libro: ", error);
  }
};

const useBooksByUser = () => {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (loading || !user?.uid) return;

    const q = query(collection(db, "books"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksList);
    });

    return () => unsubscribe();
  }, [user?.uid, loading]);

  return { books, loading }; // Devolvemos loading también
};
export { addBook, useBooksByUser };
