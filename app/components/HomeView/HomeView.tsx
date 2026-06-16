"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Components
import Welcome from "@components/Welcome/Welcome";
import Loader from "@components/Loader";
import FiltersCard from "@components/Book/FiltersCard";
import BookForm from "@components/Book/BookForm";
import BookList from "@components/Book/BookList";
// Libs and hooks
import { logOut } from "@lib/firebase";
import { useBooksByUser } from "@lib/hooks/useBooks";
import { useAuth } from "@context/AuthContext";
import { Book, FilterBooks } from "@app/types/types";
import { CircleFadingPlus, LogOut, Sparkles } from "lucide-react";
import AnonymousBadge from "@components/AnonymousBadge";

export default function HomeView() {

    const { user, loading: authLoading } = useAuth();
    const [filter, setFilter] = useState<FilterBooks>("all");
    const { books, loading, error } = useBooksByUser(filter);
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

    if (authLoading) return <Loader />;
    if (!user) return <Welcome />;


    const handlePhotoClick = () => {
        setShowGreeting(true);
        setTimeout(() => setShowGreeting(false), 2500);
    };

    const handleEditBook = (book: Book) => {
        setBookToEdit(book);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setBookToEdit(null);
    };

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch {
            alert("No se pudo cerrar la sesión. Intentá nuevamente.");
        }
    };

    const displayName = user.displayName || "Usuario anónimo";
    const photoProfile = user.photoURL || "/default-avatar.jpeg";

    return (
        <div className="flex min-h-dvh w-full flex-col bg-background">
            {/* Header */}
            <header className="w-full flex items-center justify-between glass-strong border-b border-border px-4 sm:px-6 py-4 shadow-soft z-20">
                <div className="relative flex items-center gap-3">
                    {/* Profile Photo */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative rounded-full"
                        onClick={handlePhotoClick}
                        aria-label={`Saludar a ${displayName}`}
                        aria-expanded={showGreeting}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full opacity-75 blur-sm" />
                        <Image
                            alt="Foto de perfil"
                            src={photoProfile}
                            width={48}
                            height={48}
                            className="relative rounded-full object-cover border-2 border-zinc-700"
                        />
                    </motion.button>

                    {/* App name */}
                    <span className="font-playfair text-xl font-bold tracking-tight hidden sm:inline text-text-primary">
                        Lectio
                    </span>

                    {/* Greeting Tooltip */}
                    <AnimatePresence>
                        {showGreeting && (
                            <motion.div
                                role="status"
                                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-full ml-3 glass px-4 py-2.5 rounded-xl shadow-soft-md border border-border min-w-[200px]"
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-text-secondary">
                                        Hola, <span className="font-semibold text-text-primary">{displayName}</span>
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Anonymous badge - visible only in anonymous mode */}
                <div className="flex items-center gap-3">
                    {user.isAnonymous && <AnonymousBadge />}

                    {/* Logout Button */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogOut}
                        className="flex items-center gap-2 text-sm text-danger font-medium hover:bg-danger-light/50 px-4 py-2.5 rounded-xl transition-colors duration-200"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Cerrar sesión</span>
                    </motion.button>
                </div>
            </header>

            {/* Main */}
            <main className="flex flex-1 flex-col sm:flex-row">
                <h1 className="sr-only">Mi biblioteca</h1>
                {/* Sidebar responsive */}
                <aside className="w-full sm:w-auto sm:flex-shrink-0 glass-strong p-4 sm:p-5 sm:border-r border-border">
                    <FiltersCard selectFilter={setFilter} currentFilter={filter} />
                </aside>

                {/* Book Container - scrollable */}
                <section aria-label="Libros" className="flex-1 p-4 sm:p-6">
                    {error && (
                        <div role="alert" className="mb-4 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                            {error}. Revisá tu conexión e intentá nuevamente.
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <BookList
                            books={books}
                            loading={loading}
                            handleEditBook={handleEditBook}
                        />
                    </div>
                </section>
            </main>


            <AnimatePresence>
                {isModalOpen && (
                    <BookForm onClose={handleCloseModal} bookToEdit={bookToEdit} />
                )}
            </AnimatePresence>

            {/* Floating button */}
            <AnimatePresence>
                {!isModalOpen && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalIsOpen(true)}
                        className="group fixed bottom-6 right-6 z-40 rounded-2xl"
                        aria-label="Agregar nuevo libro"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                        {/* Button */}
                        <div className="relative bg-blue-500 hover:bg-blue-600 p-4 rounded-2xl shadow-soft-lg flex items-center justify-center">                            <CircleFadingPlus className="w-7 h-7 text-white" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
