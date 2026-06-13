// lib/hooks/useBooks.ts
"use client";
import { useEffect, useState } from "react";
import { 
    collection, 
    query, 
    where, 
    onSnapshot,
    doc,
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
    const queryKey = user?.uid ? `${user.uid}:${filter}` : "";
    const [result, setResult] = useState<{
        key: string;
        books: Book[];
        error: string | null;
    }>({ key: "", books: [], error: null });

    useEffect(() => {
        if (authLoading || !user?.uid) return;

        const userBooksRef = collection(db, "users", user.uid, "books");
        const baseQuery = filter === "all"
            ? query(userBooksRef)
            : query(userBooksRef, where("status", "==", filter));

        const unsubscribe = onSnapshot(
            baseQuery,
            (snapshot) => {
                const booksList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Book[];

                booksList.sort((a, b) => {
                    const aCreatedAt = a.createdAt?.toMillis() ?? 0;
                    const bCreatedAt = b.createdAt?.toMillis() ?? 0;
                    return bCreatedAt - aCreatedAt;
                });

                setResult({ key: queryKey, books: booksList, error: null });
            },
            (err) => {
                console.error("Error fetching books:", err);
                setResult({ key: queryKey, books: [], error: "Error al cargar los libros" });
            }
        );

        return unsubscribe;
    }, [user?.uid, authLoading, filter, queryKey]);

    if (authLoading) return { books: [], loading: true, error: null };
    if (!user?.uid) return { books: [], loading: false, error: null };
    if (result.key !== queryKey) return { books: [], loading: true, error: null };

    return { books: result.books, loading: false, error: result.error };
}

/**
 * Hook to fetch a single book by ID
 * @param id - The book document ID
 * @returns Object containing book data, loading state, and error
 */
export function useBookById(id: string) {
    const { user, loading: authLoading } = useAuth();
    const queryKey = user?.uid && id ? `${user.uid}:${id}` : "";
    const [result, setResult] = useState<{
        key: string;
        book: Book | null;
        error: string | null;
    }>({ key: "", book: null, error: null });

    useEffect(() => {
        if (authLoading || !id || !user?.uid) return;

        const bookRef = doc(db, "users", user.uid, "books", id);
        const unsubscribe = onSnapshot(
            bookRef,
            (snapshot) => {
                if (!snapshot.exists()) {
                    setResult({ key: queryKey, book: null, error: "El libro no existe" });
                } else {
                    setResult({
                        key: queryKey,
                        book: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        } as Book,
                        error: null,
                    });
                }
            },
            (err) => {
                console.error("Error fetching book:", err);
                setResult({ key: queryKey, book: null, error: "No se pudo cargar el libro" });
            }
        );

        return unsubscribe;
    }, [id, user?.uid, authLoading, queryKey]);

    if (authLoading) return { book: null, loading: true, error: null };
    if (!id || !user?.uid) return { book: null, loading: false, error: null };
    if (result.key !== queryKey) return { book: null, loading: true, error: null };

    return { book: result.book, loading: false, error: result.error };
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
