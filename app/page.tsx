"use client";
import AddBookForm from "./components/Form";
import { logOut } from "./lib/auth";
import { useState } from "react";
import { deleteBookFromFirestore, useBooksByUser } from "./lib/firestore";
import { useAuth } from "./context/AuthContext";
import { Book, Filter, FilterBooks } from "./types/types";
import Welcome from "./components/Welcome";
import { BookOpen, CheckCircle, CircleFadingPlus, CircleX, Eye, SquareLibrary } from "lucide-react";
import BookCard from "./components/BookCard";

const filters: Filter[] = [
  { label: "Todas", value: "all", icon: SquareLibrary },
  { label: "Pendiente", value: "to read", icon: Eye },
  { label: "Leídas", value: "finished", icon: CheckCircle },
  { label: "Leyendo", value: "reading", icon: BookOpen },
];


export default function Home() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterBooks>("all");
  const { books, loading } = useBooksByUser(filter);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  if (loading) {
    return <p className="text-5xl text-blue-700">Cargando...</p>;
  }
  if (!user) return <Welcome />;

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setBookToEdit(null); // Esto asegura que el formulario se limpie al cerrar
  };

  return (
    <div className="w-full max-w-3xl px-4 mx-auto">
      <header className="w-full px-4 py-3 flex items-center justify-between border-b bg-white shadow-sm">
        <h1 className="text-lg font-medium text-textPrimary">
          Bienvenido, {user.displayName}
        </h1>
        <button
          onClick={logOut}
          className="text-sm text-red-500 hover:bg-red-100 px-3 py-1 rounded transition"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="grow w-full">
        <nav className="flex flex-wrap justify-around items-center border rounded-lg p-2 mt-4 bg-white shadow-sm">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
        ${filter === f.value
                  ? "bg-secondary/10 text-secondary font-medium"
                  : "text-textSecondary hover:bg-gray-100"} 
        w-full sm:w-auto`}
            >
              <f.icon className={`w-4 h-4 ${filter === f.value ? "text-secondary" : "text-primary"}`} />
              {f.label}
            </button>
          ))}
        </nav>


        <div className="w-full flex flex-col gap-4 items-start mt-4">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
                handleEditBook={handleEditBook}
                deleteBookFromFirestore={deleteBookFromFirestore}
              />

            ))
          ) : (
            <p className="text-white">No hay libros guardados.</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal} // Cierra el modal al hacer clic fuera
        >
          <div
            onClick={(e) => e.stopPropagation()}
          ><button
            onClick={handleCloseModal}
            className=" text-white p-2 absolute top-4 right-2"
          >
              <CircleX />
            </button>
            <AddBookForm closeModal={handleCloseModal} bookToEdit={bookToEdit} />
          </div>
        </div>
      )}

      {!isModalOpen && (
        <button
          onClick={() => setModalIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-blue-500 p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center"
          aria-label="Agregar nuevo libro"
        >
          <CircleFadingPlus className="w-8 h-8" />
        </button>

      )}
    </div>
  );
} 