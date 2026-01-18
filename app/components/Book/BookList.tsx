import Loader from "@components/Loader";
import BookCard from "@components/Book/BookCard";
import { Book } from "@app/types/types";
import { BookListProps } from "@app/types/types";
import { motion } from "framer-motion";
import { BookX } from "lucide-react";

export default function BookList({
    books,
    handleEditBook,
    loading = false
}: BookListProps) {

    if (loading) {
        return <Loader />;
    }

    if (books.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-50 rounded-2xl mb-6">
                    <BookX className="w-10 h-10 text-primary-400" />
                </div>
                <p className="text-xl font-semibold text-text-primary mb-2">
                    No hay libros para mostrar
                </p>
                <p className="text-sm text-text-secondary max-w-xs">
                    Agregá un nuevo libro usando el botón + o cambiá el filtro seleccionado.
                </p>
            </motion.div>
        );
    }

    return (
        <>
            {books.map((book, index) => {
                return (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <BookCard
                            book={book}
                            handleEditBook={handleEditBook}
                        />
                    </motion.div>
                );
            })}
        </>
    );
}
