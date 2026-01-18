import { Timestamp } from "firebase/firestore";
import { LucideIcon } from "lucide-react";

/**
 * Valid reading statuses for a book
 */
export type BookStatus = "to read" | "reading" | "finished";

/**
 * Filter options for the book list
 */
export type FilterBooks = BookStatus | "all";

/**
 * Core Book interface as stored in Firestore
 */
export interface Book {
    /** Document ID from Firestore */
    id: string;
    /** Book title */
    title: string;
    /** Book author */
    author: string;
    /** Total number of pages */
    pages: number;
    /** Number of pages read so far */
    pagesRead: number;
    /** Current reading status */
    status: BookStatus;
    /** Owner user ID */
    userId?: string;
    /** Timestamp when book was marked as finished */
    finishedAt?: Timestamp;
    /** Timestamp when document was created */
    createdAt?: Timestamp;
    /** Timestamp when document was last updated */
    updatedAt?: Timestamp;
}

/**
 * Input for creating a new book (omits system-generated fields)
 */
export interface CreateBookInput {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: BookStatus;
}

/**
 * Input for updating an existing book (allows partial updates)
 */
export type UpdateBookInput = Partial<CreateBookInput>;

/**
 * Legacy interface for form data (keeping for backward compatibility during migration)
 */
export interface IFormTypes {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: BookStatus;
}

// UI Component Props
export interface FormProps {
    handleCloseModal: (status: boolean) => void;
    bookToEdit?: Book | null;
}

export interface BookCardProps {
    book: Book;
    handleEditBook: (book: Book) => void;
}

export interface BookListProps {
    books: Book[];
    handleEditBook: (book: Book) => void;
    loading?: boolean;
}

export interface Filter {
    label: string;
    value: FilterBooks;
    icon: LucideIcon;
}

export interface FilterCardProps {
    selectFilter: (filter: FilterBooks) => void;
    currentFilter: FilterBooks;
}


