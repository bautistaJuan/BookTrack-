import Loader from "@components/Loader";
import BookCard from "@components/Book/BookCard";
import { BookListProps } from "@app/types/types";
import BookListEmpty from "./BookListEmpty";

export default function BookList({
    books,
    handleEditBook,
    loading = false
}: BookListProps) {

    if (loading) {
        return <Loader fullScreen={false} />;
    }

    if (books.length === 0) {
        return (
            <BookListEmpty />
        );
    }

    return (
        <>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    handleEditBook={handleEditBook}
                />
            ))}
        </>
    );
}
