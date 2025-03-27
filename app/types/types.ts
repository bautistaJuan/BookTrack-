export type FilterBooks = "to read" | "reading" | "finished" | "all";

export interface Book {
  id?: string;
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: FilterBooks;
  userId?: string;
}

export interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "userId">) => Promise<void>;
  selectedBook: Book | null;
  selectBook: (book: Book | null) => void;
}
