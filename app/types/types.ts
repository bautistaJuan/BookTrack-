export interface Book {
  id?: string;
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: "to read" | "reading" | "finished";
  userId?: string;
}

export interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "userId">) => Promise<void>;
  selectedBook: Book | null;
  selectBook: (book: Book | null) => void;
}
