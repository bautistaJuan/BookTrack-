"use client";
import Link from "next/link";
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
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative flex h-full w-full flex-col gap-4 rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:border-primary-300 hover:shadow-soft-lg"
        >
            {/* Gradient accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Book Actions */}
            <BookActions
                onEdit={() => handleEditBook(book)}
                onDelete={handleDelete}
            />

            <Link
                href={`/mislibros/${book.id}`}
                className="rounded-xl focus-visible:outline-primary-300"
                aria-label={`Ver detalles de ${book.title}, de ${book.author}`}
            >
                <div className="flex items-start gap-4 pr-8">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 shadow-soft transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white">
                        <BookOpen size={24} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                        <h2 className="line-clamp-1 text-lg font-bold tracking-tight text-primary-900 transition-colors duration-200 group-hover:text-primary-500">
                            {book.title}
                        </h2>
                        <p className="mt-0.5 line-clamp-1 text-sm font-medium text-primary-500">
                            {book.author}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-300">Progreso</span>
                    <span className="font-medium" style={{ color: "#235347" }}>{Math.round(getPorcentaje)}%</span>
                </div>
                <div className="w-full h-2.5 bg-primary-50 rounded-full overflow-hidden">
                    <motion.div
                        role="progressbar"
                        aria-label={`Progreso de ${book.title}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(getPorcentaje)}
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
        </motion.article>
    );
}
