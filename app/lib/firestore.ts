import { db, auth } from "./firebaseConfig";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Book } from "../types/types";
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

const useBooksByUser = () => {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (loading || !user?.uid) return;

    const q = query(collection(db, "users", user.uid, "books"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksList);
    });

    return () => unsubscribe();
  }, [user?.uid, loading]);

  return { books, loading };
};

// const getBooksByFilter = async (filter: string)=>{
//   const q = query(collection(db, "books"), where("userId", "==", user.uid));
//   const unsubscribe = onSnapshot(q, querySnapshot => {
//     const booksList = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Book[];
//     setBooks(booksList);
//   });
// }
export { addBook, useBooksByUser };
