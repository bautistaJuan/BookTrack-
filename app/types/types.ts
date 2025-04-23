import { LucideProps } from "lucide-react";
import { ComponentType } from "react";
import { Timestamp } from "firebase/firestore";

export type FilterBooks = "to read" | "reading" | "finished" | "all";

export interface Book {
  id?: string;
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: FilterBooks;
  userId?: string;
  finishedAt?: Timestamp;
}
export interface Filter {
  label: string;
  value: FilterBooks;
  icon: ComponentType<LucideProps>;
}
export interface FormProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookToEdit?: Book | null;
}
export interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "userId">) => Promise<void>;
  selectedBook: Book | null;
  selectBook: (book: Book | null) => void;
}

export type BookCardProps = {
  book: Book;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  handleEditBook: (book: Book) => void;
  deleteBookFromFirestore: (id: string) => void;
};
