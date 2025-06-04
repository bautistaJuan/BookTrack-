"use client";
import { logOut } from "./lib/auth";
import { useState, useEffect } from "react";
import { deleteBookFromFirestore, useBooksByUser } from "./lib/firestore";
import { useAuth } from "./context/AuthContext";
import { Book, FilterBooks } from "./types/types";
import Welcome from "./components/Welcome";
import BookCard from "./components/Book/BookCard";
import Loader from "./components/Loader";
import Image from "next/image";
import FiltersCard from "./components/Book/FiltersCard";
import AddBookForm from "./components/Form/Form";
import { CircleFadingPlus, LogOut } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterBooks>("all");
  const { books, loading } = useBooksByUser(filter);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<string>("");
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoProfile(user.photoURL);
    } else {
      setPhotoProfile("/default-avatar.jpeg"); // Asegúrate de tener esta imagen en /public
    }
  }, [user]);

  const handlePhotoClick = () => {
    setShowGreeting(true);
    setTimeout(() => {
      setShowGreeting(false);
    }, 2000); // el saludo desaparece después de 2 segundos
  };

  if (loading) {
    return <Loader />;
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
    <div className="w-full p-3 h-dvh ">
      <header className="w-full flex items-center justify-between border-b bg-white shadow-sm mb-4">
        <div className="relative flex flex-col items-center">
          <Image
            alt="Foto de perfil"
            src={photoProfile || "/default-avatar.jpeg"}
            width={36}
            height={36}
            className="rounded-full object-cover cursor-pointer"
            onClick={handlePhotoClick}
          />

          {showGreeting && (
            <div className="absolute top-full mt-2 left-5 bg-secondary  px-3 py-2 rounded-md shadow-md text-sm text-white min-w-[200px]">
              Hola, <span className="text-bold">{user.displayName}</span>
            </div>
          )}
        </div>
        <button
          onClick={logOut}
          className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md transition border border-transparent hover:border-red-300"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </header>

      <main className="sm:flex sm:gap-2 w-full">
        <FiltersCard
          selectFilter={setFilter}
          currentFilter={filter}
        >
        </FiltersCard>
        {/* Lista de libros */}
        <div className="flex flex-col flex-grow gap-4 sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                handleEditBook={handleEditBook}
                deleteBookFromFirestore={deleteBookFromFirestore}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 text-center text-textSecondary animate-fade-in col-span-full">
              <p className="text-lg font-medium">No hay libros para mostrar 📚</p>
              <p className="text-sm mt-2">Agrega un nuevo libro o cambia el filtro seleccionado.</p>
            </div>
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
          >
            <AddBookForm handleCloseModal={handleCloseModal} bookToEdit={bookToEdit} />
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