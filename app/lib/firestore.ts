import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Book, FilterBooks } from "../types/types";
const addBook = async ({ title, author, pages, pagesRead, status }: Book) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await addDoc(collection(db, "users", user.uid, "books"), {
      title,
      author,
      pages,
      pagesRead,
      status,
      userId: user.uid, // Asignar el libro al usuario autenticado
    });
  } catch (error) {
    console.error("Error al agregar libro: ", error);
  }
};

const useBooksByUser = (filter: FilterBooks = "all") => {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (loading || !user?.uid) return;
    const userBooksRef = query(collection(db, "users", user.uid, "books"));
    const q =
      filter === "all"
        ? userBooksRef
        : query(userBooksRef, where("status", "==", filter));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksList);
    });

    return () => unsubscribe();
  }, [user?.uid, loading, filter]);

  return { books, loading };
};

export { addBook, useBooksByUser };
