import Loader from "../Loader";
import BookCard from "./BookCard";
import { Book } from "@/app/types/types";

interface BookListProps {
    books: Book[];
    handleEditBook: (book: Book) => void;
    loading?: boolean;
}

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
            <div className="col-span-full flex flex-col items-center justify-center mt-20 text-center text-textSecondary animate-fade-in">
                <p className="text-lg font-medium">No hay libros para mostrar 📚</p>
                <p className="text-sm mt-2">Agrega un nuevo libro o cambia el filtro seleccionado.</p>
            </div>
        );
    }
    return (
        <>
            {books.map((book) => {
                return (
                    <BookCard
                        key={book.id}
                        book={book}
                        handleEditBook={handleEditBook}
                    />
                );
            })}
        </>
    );
}
