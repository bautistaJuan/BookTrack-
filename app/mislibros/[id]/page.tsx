"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { deleteBookFromFirestore, useBookById } from "@/app/lib/firestore";
import bookPort from "../../../public/book.jpeg"; // Imagen genérica
import PomodoroTimer from "@/app/components/PomodoroTimer";
import Loader from "@/app/components/Loader";
import { formatDate } from "@/app/utils/date";
import { CircleChevronLeft } from "lucide-react";
import BookActions from "@/app/components/BooksActions";
import { Book } from "@/app/types/types";
import AddBookForm from "@/app/components/Form";
import ErrorPage from "@/app/components/ErrorPage";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { book, error, loading } = useBookById(id);
    const [isEditing, setIsEditing] = useState(false);
    const audioAlarm = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioAlarm.current = new Audio("/mp3/alarma.mp3");
    }, [])

    const status = (book: Book) => {
        return book.status === "finished"
            ? "Leído"
            : book.status === "reading"
                ? "Leyendo"
                : "Pendiente"
    }
    const dateOfFinished = (book: Book) => {
        return formatDate(book.finishedAt!.toDate());
    }

    const hanldeCompleted = () => {
        console.log("Pomodoro Complete!");
        audioAlarm.current?.play();
    }

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorPage message={error!} />
    }
    if (!book) { return <ErrorPage /> }

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-background relative">
            {/* Modal para editar */}
            {isEditing && (
                <div
                    onClick={() => setIsEditing(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AddBookForm
                            handleCloseModal={setIsEditing}
                            bookToEdit={book}
                        />
                    </div>
                </div>
            )}

            {/* Contenido principal */}
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
                {!isEditing &&
                    <BookActions
                        onDelete={() => deleteBookFromFirestore(id)}
                        onEdit={() => setIsEditing(true)} // Abre el modal al hacer clic en "Editar"
                    />
                }
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
                        <span>
                            {status(book)}
                        </span>
                    </div>
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
                        <PomodoroTimer onComplete={hanldeCompleted} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetail;