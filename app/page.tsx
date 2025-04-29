"use client";
import AddBookForm from "./components/Form";
import { logOut } from "./lib/auth";
import { useState, useEffect } from "react";
import { deleteBookFromFirestore, useBooksByUser } from "./lib/firestore";
import { useAuth } from "./context/AuthContext";
import { Book, Filter, FilterBooks } from "./types/types";
import Welcome from "./components/Welcome";
import { BookOpen, CheckCircle, CircleFadingPlus, Eye, LogOut, SquareLibrary } from "lucide-react";
import BookCard from "./components/BookCard";
import Loader from "./components/Loader";
import Image from "next/image";

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
  const [showGreeting, setShowGreeting] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<string>("");
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoProfile(user.photoURL);
    } else {
      // En caso de que no tenga foto, podrías poner una imagen por defecto
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
    <div className="w-full max-w-3xl px-4 mx-auto h-dvh">
      <header className="w-full py-3 flex items-center justify-between border-b bg-white shadow-sm">
        <div className="relative flex flex-col items-center">
          <Image
            alt="Foto de perfil"
            src={photoProfile}
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

      <main className="grow w-full">
        {books.length > 0 ? (
          <>
            {/* Filtros solo si hay libros */}
            <nav className="flex flex-wrap justify-around items-center border rounded-lg p-2 mt-4 bg-white shadow-sm">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
              ${filter === f.value
                      ? "bg-secondary/10 text-secondary font-medium"
                      : "text-textSecondary hover:bg-gray-100"} w-full sm:w-auto`}
                >
                  <f.icon className={`w-4 h-4 ${filter === f.value ? "text-secondary" : "text-primary"}`} />
                  {f.label}
                </button>
              ))}
            </nav>

            {/* Lista de libros */}
            <div className="w-full flex flex-col gap-4 items-start mt-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  handleEditBook={handleEditBook}
                  deleteBookFromFirestore={deleteBookFromFirestore}
                />
              ))}
            </div>
          </>
        ) : (
          // Mensaje cuando no hay libros
          <div className="flex flex-col items-center justify-center mt-20 text-center text-textSecondary">
            <p className="text-lg font-medium">Aún no tienes libros guardados 📚</p>
            <p className="text-sm mt-2">Haz clic en el botón &quot;+&quot; para agregar tu primer libro</p>
          </div>
        )}
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