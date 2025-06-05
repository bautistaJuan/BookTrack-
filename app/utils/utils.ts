import { BookOpen, CheckCircle, Eye, SquareLibrary } from "lucide-react";
import { Book, Filter } from "../types/types";

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
// Filter icons
export const filters: Filter[] = [
  { label: "Todas", value: "all", icon: SquareLibrary },
  { label: "Pendiente", value: "to read", icon: Eye },
  { label: "Leídas", value: "finished", icon: CheckCircle },
  { label: "Leyendo", value: "reading", icon: BookOpen },
];
