import { Book } from "../types/types";

export function formatDate(date?: Date | null): string {
  if (!date) return "";

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export const getPorcentajeBook = (book: Book) => {
  return book.pages ? Math.min((book.pagesRead / book.pages) * 100, 100) : 0;
};
