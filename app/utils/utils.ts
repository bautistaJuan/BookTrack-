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
      return "bg-zinc-800 text-zinc-300 border border-zinc-700";

    case "reading":
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";

    case "finished":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";

    default:
      return "bg-zinc-800 text-zinc-400 border border-zinc-700";
  }
}
