"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Components
import Welcome from "@components/Welcome/Welcome";
import Loader from "@components/Loader";
import FiltersCard from "@components/Book/FiltersCard";
import AddBookForm from "@components/Form/Form";
import BookList from "@components/Book/BookList";
// Libs and hooks
import { logOut } from "@lib/auth";
import { useBooksByUser } from "@lib/firestore";
import { useAuth } from "@context/AuthContext";
import { Book, FilterBooks } from "@app/types/types";
import { CircleFadingPlus, LogOut, Sparkles } from "lucide-react";

export default function HomeView() {
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

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col bg-background">
            {/* Header */}
            <header className="w-full flex items-center justify-between glass-strong border-b border-border-light px-4 sm:px-6 py-4 shadow-soft z-20">
                <div className="relative flex items-center gap-3">
                    {/* Profile Photo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative cursor-pointer"
                        onClick={handlePhotoClick}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-75 blur-sm" />
                        <Image
                            alt="Foto de perfil"
                            src={photoProfile}
                            width={48}
                            height={48}
                            className="relative rounded-full object-cover border-2 border-surface"
                        />
                    </motion.div>

                    {/* Greeting Tooltip */}
                    <AnimatePresence>
                        {showGreeting && (
                            <motion.div
                                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-full ml-3 glass px-4 py-2.5 rounded-xl shadow-soft-md border border-border-light min-w-[200px]"
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-accent-500" />
                                    <span className="text-sm text-text-secondary">
                                        Hola, <span className="font-semibold text-text-primary">{user.displayName}</span>
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Logout Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logOut}
                    className="flex items-center gap-2 text-sm text-danger font-medium hover:bg-danger-light/50 px-4 py-2.5 rounded-xl transition-colors duration-200"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Cerrar sesión</span>
                </motion.button>
            </header>

            {/* Main */}
            <main className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                {/* Sidebar responsive */}
                <aside className="w-full sm:w-auto sm:flex-shrink-0 glass-strong p-4 sm:p-5 sm:border-r border-border-light">
                    <FiltersCard selectFilter={setFilter} currentFilter={filter} />
                </aside>

                {/* Book Container - scrollable */}
                <section className="flex-1 overflow-y-auto p-4 sm:p-6 ">
                    <div className="md:grid flex flex-col justify-center  md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <BookList
                            books={books}
                            loading={loading}
                            handleEditBook={handleEditBook}
                        />
                    </div>
                </section>
            </main>


            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AddBookForm
                                handleCloseModal={handleCloseModal}
                                bookToEdit={bookToEdit}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button */}
            <AnimatePresence>
                {!isModalOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 group"
                        aria-label="Agregar nuevo libro"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 gradient-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                        {/* Button */}
                        <div className="relative gradient-primary p-4 rounded-2xl shadow-soft-lg flex items-center justify-center">
                            <CircleFadingPlus className="w-7 h-7 text-white" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
