// lib/hooks/useBooks.ts
"use client";
import { useEffect, useState } from "react";
import { 
    collection, 
    query, 
    where, 
    onSnapshot,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "@context/AuthContext";
import { Book, FilterBooks } from "@app/types/types";

/**
 * Hook to fetch and subscribe to a user's books with optional filtering
 * @param filter - Filter by book status or "all" for no filter
 * @returns Object containing books array and loading state
 */
export function useBooksByUser(filter: FilterBooks = "all") {
    const { user, loading: authLoading } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Wait for auth to resolve
        if (authLoading) {
            return;
        }
        
        // No user, no books
        if (!user?.uid) {
            setBooks([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Build query (orderBy removed - requires composite index that may still be building)
            const userBooksRef = collection(db, "users", user.uid, "books");
            const baseQuery = filter === "all"
                ? query(userBooksRef)
                : query(userBooksRef, where("status", "==", filter));

            // Subscribe to real-time updates
            const unsubscribe = onSnapshot(
                baseQuery,
                (snapshot) => {
                    const booksList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Book[];
                    
                    setBooks(booksList);
                    setLoading(false);
                },
                (err) => {
                    console.error("Error fetching books:", err);
                    setError("Error al cargar los libros");
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error("Error setting up books listener:", err);
            setError("Error al configurar la suscripción");
            setLoading(false);
        }
    }, [user?.uid, authLoading, filter]);

    return { books, loading, error };
}

/**
 * Hook to fetch a single book by ID
 * @param id - The book document ID
 * @returns Object containing book data, loading state, and error
 */
export function useBookById(id: string) {
    const { user, loading: authLoading } = useAuth();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Wait for auth to resolve
        if (authLoading) {
            return;
        }
        
        // No ID or no user
        if (!id || !user?.uid) {
            setBook(null);
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            setLoading(true);
            setError(null);

            try {
                const bookRef = doc(db, "users", user.uid, "books", id);
                const docSnapshot = await getDoc(bookRef);

                if (!docSnapshot.exists()) {
                    setError("El libro no existe");
                    setBook(null);
                } else {
                    setBook({
                        id: docSnapshot.id,
                        ...docSnapshot.data(),
                    } as Book);
                }
            } catch (err) {
                console.error("Error fetching book:", err);
                const message = err instanceof Error ? err.message : "Error desconocido";
                setError(message);
                setBook(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, user?.uid, authLoading]);

    return { book, loading, error };
}

/**
 * Hook to get book count statistics
 * @returns Object containing counts for each status
 */
export function useBookStats() {
    const { books, loading } = useBooksByUser("all");
    
    const stats = {
        total: books.length,
        toRead: books.filter(b => b.status === "to read").length,
        reading: books.filter(b => b.status === "reading").length,
        finished: books.filter(b => b.status === "finished").length,
        totalPages: books.reduce((acc, b) => acc + b.pages, 0),
        pagesRead: books.reduce((acc, b) => acc + b.pagesRead, 0),
    };
    
    return { stats, loading };
}
