"use client";
import { logOut } from "./lib/auth";
import { useState, useEffect } from "react";
import { useBooksByUser } from "./lib/firestore";
import { useAuth } from "./context/AuthContext";
import { Book, FilterBooks } from "./types/types";
import Welcome from "./components/Welcome/Welcome";
import Loader from "./components/Loader";
import Image from "next/image";
import FiltersCard from "./components/Book/FiltersCard";
import AddBookForm from "./components/Form/Form";
import { CircleFadingPlus, LogOut } from "lucide-react";
import BookList from "./components/Book/BookList";

export default function Home() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterBooks>("all");
  const { books, loading } = useBooksByUser(filter);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<string>("/default-avatar.jpeg");
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoProfile(user.photoURL);
    }
  }, [user]);


  if (loading) return <Loader />;
  if (!user) return <Welcome />;

  const handlePhotoClick = () => {
    setShowGreeting(true);
    setTimeout(() => setShowGreeting(false), 2000);
  };

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setBookToEdit(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between border-b bg-white shadow-sm p-3">
        <div className="relative flex flex-col items-center">
          <Image
            alt="Foto de perfil"
            src={photoProfile}
            width={50}
            height={50}
            className="rounded-full object-cover cursor-pointer"
            onClick={handlePhotoClick}
          />
          {showGreeting &&
            <div className="absolute top-full mt-2 left-5 bg-secondary px-3 py-2 rounded-md shadow-md text-sm text-white min-w-[200px]">
              Hola, <span className="font-bold">{user.displayName}</span>
            </div>
          }
        </div>
        <button
          onClick={logOut}
          className="flex items-center gap-1 text-sm text-red-400 hover:bg-red-100 px-3 py-1.5 rounded-md transition border border-transparent hover:border-red-300"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </header>

      {/* Main */}
      <main className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        {/* Sidebar responsive */}
        <aside className="w-full sm:w-fit sm:flex-shrink-0 bg-white p-4 sm:border-r">
          <FiltersCard selectFilter={setFilter} currentFilter={filter} />
        </aside>

        {/* Contenedor de libros scrollable */}
        <section className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="md:grid flex flex-col justify-center items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <BookList
              books={books}
              loading={loading}
              handleEditBook={handleEditBook}
            />
          </div>
        </section>
      </main>


      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddBookForm
              handleCloseModal={handleCloseModal}
              bookToEdit={bookToEdit}
            />
          </div>
        </div>
      )}

      {/* Floating button */}
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
