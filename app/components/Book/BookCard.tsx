"use client";
import { useRouter } from "next/navigation";
import { BookCardProps } from "../../types/types";
import BookActions from "./BooksActions";
import { motion } from "framer-motion";
import { getPorcentajeBook, getTagColor } from "@utils/utils";
import { deleteBook } from "../../lib/services/bookService";
import { BookOpen } from "lucide-react";

export default function BookCard({
    book,
    handleEditBook,
}: BookCardProps) {
    const router = useRouter();
    const handleRouter = (id: string) => {
        return router.push(`/mislibros/${id}`);
    };
    const getPorcentaje = getPorcentajeBook(book);

    const handleDelete = async () => {
        if (confirm(`¿Estás seguro de que quieres eliminar "${book.title}"?`)) {
            try {
                await deleteBook(book.id!);
            } catch (error) {
                console.error("Error al eliminar libro:", error);
                alert("No se pudo eliminar el libro.");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            key={book.id}
            onClick={() => handleRouter(book.id!)}
            className="group relative bg-white rounded-2xl border border-primary-100 p-6 w-full max-w-md cursor-pointer flex flex-col gap-4 shadow-soft hover:shadow-soft-lg hover:border-primary-300 transition-all duration-300"
        >
            {/* Gradient accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Book Actions */}
            <BookActions
                onEdit={() => handleEditBook(book)}
                onDelete={handleDelete}
            />

            {/* Book Icon + Title */}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-soft">
                    <BookOpen size={24} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                    <h2 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-primary-500 transition-colors duration-200" style={{ color: "#051F20" }}>
                        {book.title}
                    </h2>
                    <p className="text-sm font-medium mt-0.5 line-clamp-1" style={{ color: "#235347" }}>
                        {book.author}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-300">Progreso</span>
                    <span className="font-medium" style={{ color: "#235347" }}>{Math.round(getPorcentaje)}%</span>
                </div>
                <div className="w-full h-2.5 bg-primary-50 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getPorcentaje}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Status + Pages */}
            <div className="flex items-center justify-between pt-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getTagColor(book.status)}`}>
                    {book.status === "to read"
                        ? "📚 Pendiente"
                        : book.status === "reading"
                            ? "📖 Leyendo"
                            : "✅ Finalizado"}
                </span>
                <span className="text-xs text-primary-300">
                    {book.pagesRead} / {book.pages} pág.
                </span>
            </div>
        </motion.div>
    );
}