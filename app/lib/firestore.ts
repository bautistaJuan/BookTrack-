import { Timestamp } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Book, FilterBooks, IFormTypes } from "../types/types";

// Funciones de utilidad para Firestore
const addBook = async ({
  title,
  author,
  pages,
  pagesRead,
  status,
}: Book | IFormTypes) => {
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

const deleteBookFromFirestore = async (bookId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in");
  }
  try {
    const ref = doc(db, "users", user.uid, "books", bookId);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const updateBookInFirestore = async (
  bookId: string,
  updatedData: Partial<Book>
) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in");
  }

  try {
    const ref = doc(db, "users", user.uid, "books", bookId);
    // Si se está marcando como finalizado, actualizar también las páginas leídas
    if (updatedData.status === "finished") {
      const bookDoc = await getDoc(ref);
      if (!bookDoc.exists()) {
        throw new Error("El libro no existe");
      }

      const totalPages = bookDoc.data()?.pages;
      updatedData.pagesRead = totalPages;
      updatedData.finishedAt = Timestamp.now();
    }
    await updateDoc(ref, updatedData);
    console.log("Libro actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
  }
};
const incrementPagesRead = async (bookId: string, increment: number) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in");
  }

  try {
    const ref = doc(db, "users", user.uid, "books", bookId);
    // Obtener el documento actual
    const bookDoc = await getDoc(ref);

    if (!bookDoc.exists()) {
      throw new Error("El libro no existe");
    }

    // Obtener las páginas leídas actuales
    const currentPagesRead = bookDoc.data()?.pagesRead || 0;

    // Actualizar el valor de 'pagesRead'
    await updateDoc(ref, {
      pagesRead: currentPagesRead + increment,
    });

    console.log("Páginas leídas actualizadas correctamente");
  } catch (error) {
    console.error("Error al actualizar las páginas leídas:", error);
  }
};

// Hooks relacionados con Firestore
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

const useBookById = (id: string) => {
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) {
      setLoading(false);
      return;
    }
    const ref = doc(db, "users", user.uid, "books", id);
    const getBookDetailFromFirestore = async () => {
      try {
        const docSnapshot = await getDoc(ref);
        if (!docSnapshot.exists()) {
          throw new Error("El libro no existe");
        }
        setBook({ id: docSnapshot.id, ...docSnapshot.data() } as Book);
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Error desconocido";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    getBookDetailFromFirestore();
  }, [id, user]);

  return { loading, book, error };
};
export {
  addBook,
  useBooksByUser,
  useBookById,
  deleteBookFromFirestore,
  updateBookInFirestore,
  incrementPagesRead,
};
