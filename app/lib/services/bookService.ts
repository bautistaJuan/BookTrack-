// lib/services/bookService.ts
import { Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { Book, CreateBookInput, UpdateBookInput } from "@app/types/types";
import { 
    AuthenticationError, 
    NotFoundError, 
    DatabaseError,
    getErrorMessage 
} from "../errors";
import { validateCreateBookInput, validateBookUpdate } from "../validation/bookValidation";

/**
 * Get the current authenticated user or throw
 * @throws AuthenticationError if not authenticated
 */
function requireAuth() {
    const user = auth.currentUser;
    if (!user) {
        throw new AuthenticationError("Debes iniciar sesión para realizar esta acción");
    }
    return user;
}

/**
 * Get the books collection reference for a user
 */
function getBooksCollection(userId: string) {
    return collection(db, "users", userId, "books");
}

/**
 * Get a book document reference
 */
function getBookRef(userId: string, bookId: string) {
    return doc(db, "users", userId, "books", bookId);
}

/**
 * Add a new book to the user's collection
 * @param input - Book data to create
 * @returns The created book ID
 * @throws AuthenticationError if not logged in
 * @throws ValidationError if input is invalid
 * @throws DatabaseError if write fails
 */
export async function addBook(input: CreateBookInput): Promise<string> {
    const user = requireAuth();
    
    // Validate input
    const validatedInput = validateCreateBookInput(input);
    
    try {
        const docRef = await addDoc(getBooksCollection(user.uid), {
            ...validatedInput,
            userId: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar libro:", error);
        throw new DatabaseError(`Error al agregar el libro: ${getErrorMessage(error)}`);
    }
}

/**
 * Get a single book by ID
 */
export async function getBookById(bookId: string): Promise<Book> {
    const user = requireAuth();
    
    try {
        const bookDoc = await getDoc(getBookRef(user.uid, bookId));
        
        if (!bookDoc.exists()) {
            throw new NotFoundError("Libro");
        }
        
        return {
            id: bookDoc.id,
            ...bookDoc.data(),
        } as Book;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        console.error("Error al obtener libro:", error);
        throw new DatabaseError(`Error al obtener el libro: ${getErrorMessage(error)}`);
    }
}

/**
 * Update an existing book
 */
export async function updateBook(bookId: string, update: UpdateBookInput): Promise<void> {
    const user = requireAuth();
    const bookRef = getBookRef(user.uid, bookId);
    
    try {
        const bookDoc = await getDoc(bookRef);
        if (!bookDoc.exists()) {
            throw new NotFoundError("Libro");
        }
        
        const currentBook = bookDoc.data() as Book;
        const validatedUpdate = validateBookUpdate(update, currentBook.pages);
        
        const updateData: Record<string, unknown> = {
            ...validatedUpdate,
            updatedAt: serverTimestamp(),
        };
        
        if (validatedUpdate.status === "finished") {
            const totalPages = validatedUpdate.pages ?? currentBook.pages;
            updateData.pagesRead = totalPages;
            updateData.finishedAt = Timestamp.now();
        }
        
        await updateDoc(bookRef, updateData);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        console.error("Error al actualizar libro:", error);
        throw new DatabaseError(`Error al actualizar el libro: ${getErrorMessage(error)}`);
    }
}

/**
 * Delete a book from the user's collection
 */
export async function deleteBook(bookId: string): Promise<void> {
    const user = requireAuth();
    
    try {
        await deleteDoc(getBookRef(user.uid, bookId));
    } catch (error) {
        console.error("Error al eliminar libro:", error);
        throw new DatabaseError(`Error al eliminar el libro: ${getErrorMessage(error)}`);
    }
}

// Re-exports
export { updateBook as updateBookInFirestore };
export { deleteBook as deleteBookFromFirestore };
