"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { deleteBook, updateBook } from "../../lib/services/bookService";
import { useBookById } from "../../lib/hooks/useBooks";
import bookPort from "@public/book.jpeg";
import Image from "next/image";
import PomodoroTimer from "@components/PomodoroTimer";
import Loader from "@components/Loader";
import { formatDate } from "@utils/utils";
import { ArrowLeft, BookOpen, CheckCircle, Clock, FileText, Pencil, Trash2 } from "lucide-react";
import { Book } from "@app/types/types";
import AddBookForm from "@components/Form/Form";
import ErrorPage from "@components/ErrorPage";
import { useRouter } from "next/navigation";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { book, error, loading } = useBookById(id);
    const [isEditing, setIsEditing] = useState(false);
    const [pagesRead, setPagesRead] = useState<number>(0);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);
    const audioAlarm = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioAlarm.current = new Audio("/mp3/alarma.mp3");
    }, []);

    useEffect(() => {
        if (book) {
            setPagesRead(book.pagesRead);
        }
    }, [book]);

    if (loading) return <Loader />;
    if (error || !book) return <ErrorPage message={error || "Libro no encontrado"} />;

    const handleUpdatePagesRead = async () => {
        try {
            await updateBook(id, { pagesRead });
            setUpdateMessage("¡Páginas actualizadas!");
            setTimeout(() => setUpdateMessage(null), 2500);
        } catch (err) {
            console.error("Error actualizando páginas leídas:", err);
            setUpdateMessage("Ocurrió un error");
        }
    };

    const progressPercent = Math.min(100, Math.round((book.pagesRead / book.pages) * 100));

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: "#f8fafc" }}>
            {/* Header / Nav */}
            <div className="bg-white border-b border-primary-100 px-4 py-4 sticky top-0 z-30 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-primary-500 hover:text-primary-900 transition-colors font-medium"
                    >
                        <ArrowLeft size={20} />
                        <span>Volver</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-primary-500 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                            <Pencil size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={async () => {
                                if (confirm("¿Estás seguro de que quieres eliminar este libro?")) {
                                    await deleteBook(id);
                                    router.push("/");
                                }
                            }}
                            className="p-2 text-danger hover:bg-danger-light/50 rounded-xl transition-colors"
                        >
                            <Trash2 size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 pt-8">
                {/* Hero Section */}
                <div className="relative bg-white rounded-3xl shadow-soft-xl overflow-hidden border border-primary-100 mb-8">
                    {/* Banner Background */}
                    <div className="h-40" style={{ background: "linear-gradient(135deg, #235347 0%, #8EB69B 100%)" }} />

                    {/* Book Info Header */}
                    <div className="relative px-8 -mt-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative inline-block"
                        >
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/30 to-primary-300/30 rounded-xl blur-lg" />
                            <Image
                                src={bookPort}
                                alt="Portada del libro"
                                width={140}
                                height={200}
                                className="relative rounded-xl shadow-soft-lg border-4 border-white"
                            />
                        </motion.div>

                        <div className="mt-6 pb-8">
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "#051F20" }}>
                                {book.title}
                            </h1>
                            <p className="text-lg font-medium mt-2" style={{ color: "#235347" }}>
                                por <span className="text-primary-500">{book.author}</span>
                            </p>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-2xl border border-primary-100">
                                    <Clock size={18} className="text-primary-500" />
                                    <span className="text-sm font-semibold capitalize" style={{ color: "#051F20" }}>
                                        {book.status === "to read" ? "Pendiente" : book.status === "reading" ? "Leyendo" : "Finalizado"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-2xl border border-primary-100">
                                    <FileText size={18} className="text-primary-300" />
                                    <span className="text-sm font-semibold" style={{ color: "#051F20" }}>{book.pages} páginas totales</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Progress & Stats */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Progress Section */}
                        <section className="bg-white rounded-3xl p-8 border border-primary-100 shadow-soft-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold" style={{ color: "#051F20" }}>Tu Progreso</h3>
                                <span className="text-2xl font-black text-primary-500">{progressPercent}%</span>
                            </div>

                            <div className="w-full h-4 bg-primary-50 rounded-full overflow-hidden mb-8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full gradient-primary rounded-full"
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold ml-1" style={{ color: "#235347" }}>
                                        ¿Cuántas páginas leíste hoy?
                                    </label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                value={pagesRead}
                                                max={book.pages}
                                                onChange={(e) => setPagesRead(Number(e.target.value))}
                                                className="w-full px-5 py-4 rounded-2xl bg-primary-50/30 border border-primary-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-lg"
                                                style={{ color: "#051F20" }}
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-300 font-medium">
                                                / {book.pages}
                                            </span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleUpdatePagesRead}
                                            className="px-8 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-colors shadow-soft"
                                        >
                                            Actualizar
                                        </motion.button>
                                    </div>
                                    <AnimatePresence>
                                        {updateMessage && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-primary-500 text-sm font-bold ml-1 flex items-center gap-1 mt-2"
                                            >
                                                <CheckCircle size={14} /> {updateMessage}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </section>

                        {/* Additional Info / Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-3xl border border-primary-100 shadow-soft">
                                <p className="text-primary-300 text-xs font-bold uppercase tracking-wider mb-2">Agregado el</p>
                                <p className="font-bold" style={{ color: "#051F20" }}>{formatDate(book.createdAt)}</p>
                            </div>
                            {book.finishedAt && (
                                <div className="bg-primary-50 p-6 rounded-3xl border border-primary-200 shadow-soft">
                                    <p className="text-primary-500 text-xs font-bold uppercase tracking-wider mb-2">Finalizado el</p>
                                    <p className="text-primary-900 font-bold">{formatDate(book.finishedAt)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Pomodoro */}
                    <div className="space-y-8">
                        <section className="bg-white rounded-3xl p-6 border border-primary-100 shadow-soft-lg">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "#051F20" }}>
                                <Clock size={20} className="text-primary-500" />
                                Sesión de Lectura
                            </h3>
                            <PomodoroTimer onComplete={() => audioAlarm.current?.play()} />
                        </section>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {isEditing && (
                    <AddBookForm
                        handleCloseModal={setIsEditing}
                        bookToEdit={book}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookDetail;
