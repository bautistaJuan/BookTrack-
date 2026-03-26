import { BookOpen, CheckCircle, Eye, SquareLibrary } from "lucide-react";
import { Book, Filter } from "../types/types";
import { Timestamp } from "firebase/firestore";

export function formatDate(date?: Date | Timestamp | null): string {
  if (!date) return "";

  const dateObj = date instanceof Timestamp ? date.toDate() : date;

  return dateObj.toLocaleDateString("es-AR", {
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

// Tag colors — Lectio palette
export function getTagColor(status: string) {
  switch (status) {
    case "to read":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "reading":
      return "bg-primary-50 text-primary-800 border border-primary-200";
    case "finished":
      return "bg-primary-100 text-primary-900 border border-primary-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
}
