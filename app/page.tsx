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
    <div className="flex flex-col bg-red-400 items-center h-screen">
      <header className="bg-secondary p-4 flex justify-between w-full rounded-b-lg">
        <h1>Bienvenido, {user.displayName}</h1>
        <button onClick={logOut} className=" text-white p-2 rounded cursor-pointer">
          Cerrar sesión
        </button>
      </header>
      <main className="border grow w-full">
        <nav className="flex justify-evenly p-4">
          {filters.map((f) => (
            <li
              key={f.value}
              className={`
                list-none  cursor-pointer 
                ${filter === f.value ? "text-secondary" : "text-surface"} flex p-4 gap-2 `
              }
              onClick={() => setFilter(f.value)}
            >
              <f.icon className={`${filter === f.value ? "text-secondary" : "text-primary"} w-5 h-5`} />
              {f.label}
            </li>
          ))}
        </nav>
        <div className="w-full flex flex-col gap-4 items-start border-4 border-red-700  h-screen">
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