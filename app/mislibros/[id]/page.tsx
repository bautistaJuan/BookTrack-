"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { deleteBookFromFirestore, updateBookInFirestore, useBookById } from "@/app/lib/firestore";
import bookPort from "../../../public/book.jpeg"; // Imagen genérica
import PomodoroTimer from "@/app/components/PomodoroTimer";
import Loader from "@/app/components/Loader";
import { formatDate } from "@/app/utils/utils";
import { CircleChevronLeft } from "lucide-react";
import BookActions from "@/app/components/Book/BooksActions";
import { Book } from "@/app/types/types";
import AddBookForm from "@/app/components/Form/Form";
import ErrorPage from "@/app/components/ErrorPage";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
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

    const status = (book: Book) => {
        return book.status === "finished"
            ? "Leído"
            : book.status === "reading"
                ? "Leyendo"
                : "Pendiente";
    };

    const dateOfFinished = (book: Book) => {
        return formatDate(book.finishedAt!.toDate());
    };

    const handleCompleted = () => {
        console.log("Pomodoro Complete!");
        audioAlarm.current?.play();
    };

    const handleUpdatePagesRead = async () => {
        try {
            await updateBookInFirestore(id, { pagesRead });
            setUpdateMessage("¡Páginas actualizadas!");
            setTimeout(() => setUpdateMessage(null), 2000);
        } catch (err) {
            console.error("Error actualizando páginas leídas:", err);
            setUpdateMessage("Ocurrió un error");
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorPage message={error!} />;
    if (!book) return <ErrorPage />;

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-background relative">
            {isEditing && (
                <div
                    onClick={() => setIsEditing(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <AddBookForm handleCloseModal={setIsEditing} bookToEdit={book} />
                    </div>
                </div>
            )}

            <Link
                href="/"
                className="flex items-center absolute top-1 left-2 text-sm text-neutral-500 hover:text-blue-500 transition"
            >
                <CircleChevronLeft size={35} />
            </Link>

            <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-xl p-8 space-y-6 mt-6">
                <Image
                    src={bookPort}
                    alt="Portada del libro"
                    width={160}
                    height={240}
                    className="rounded-md mx-auto"
                />

                {!isEditing && (
                    <BookActions
                        onDelete={() => deleteBookFromFirestore(id)}
                        onEdit={() => setIsEditing(true)}
                    />
                )}

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-semibold text-neutral-900">{book.title}</h2>
                    <p className="text-sm text-neutral-500">por {book.author}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-neutral-800 pt-4">
                    <div className="flex gap-2">
                        <span className="text-neutral-500">Páginas:</span>
                        <span>{book.pages}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-neutral-500">Leídas:</span>
                        <span>{book.pagesRead}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-neutral-500">Estado:</span>
                        <span>{status(book)}</span>
                    </div>

                    {book.status !== "finished" && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2 col-span-2 pt-2 w-full">
                            <label className="text-sm text-neutral-700 flex flex-col sm:flex-row sm:items-center gap-1">
                                Páginas leídas:
                                <input
                                    type="number"
                                    min={0}
                                    max={book.pages}
                                    value={pagesRead}
                                    onChange={(e) => setPagesRead(Number(e.target.value))}
                                    className="w-full sm:w-28 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </label>

                            <button
                                onClick={handleUpdatePagesRead}
                                className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                            >
                                Actualizar
                            </button>

                            {updateMessage && (
                                <span className="text-xs text-green-600 sm:ml-2 text-center sm:text-left">
                                    {updateMessage}
                                </span>
                            )}
                        </div>

                    )}

                    <div className="col-span-2 pt-2">
                        {book.status === "finished" && book.finishedAt && (
                            <p className="text-sm text-neutral-500 italic">
                                Finalizado el{" "}
                                <span className="text-neutral-700 font-medium">
                                    {dateOfFinished(book)}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <hr />

                {book.status !== "finished" && (
                    <div className="w-full max-w-2xl mt-10">
                        <PomodoroTimer onComplete={handleCompleted} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
