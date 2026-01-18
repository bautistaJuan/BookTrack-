// lib/firestore.ts
/**
 * @deprecated This file is kept for backward compatibility.
 * Import from the new modular structure instead:
 * - Services: @lib/services/bookService
 * - Hooks: @lib/hooks/useBooks
 */

// Re-export from new locations for backward compatibility
export { addBook, updateBookInFirestore, deleteBookFromFirestore } from "./services/bookService";
export { useBooksByUser, useBookById } from "./hooks/useBooks";
