import Loader from "@components/Loader";
import BookCard from "@components/Book/BookCard";
import { BookListProps } from "@app/types/types";
import { motion } from "framer-motion";
import BookListEmpty from "./BookListEmpty";

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
            <BookListEmpty />
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
