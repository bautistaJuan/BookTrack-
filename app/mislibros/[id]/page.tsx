"use client";
import { useBookById } from "@/app/lib/firestore";
import Image from "next/image";
import React from "react";
import bookPort from "../../../public/book.jpeg"; // Imagen genérica
import Link from "next/link";
import PomodoroTimer from "@/app/components/PomodoroTimer";
import Loader from "@/app/components/Loader";
import { formatDate } from "@/app/utils/date";
import { CircleChevronLeft } from "lucide-react";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { book, error, loading } = useBookById(id);
    // const [increment, setIncrement] = useState(0);
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="text-red-500">
                <h1 className="text-2xl">Error al cargar el libro</h1>
                <p>{error}</p>
                <Link href="/" className="text-blue-500 underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    if (!book) {
        return (
            <div>
                <h1 className="text-2xl text-red-500">Libro no encontrado</h1>
                <Link href="/" className="text-blue-500 underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-neutral-50">
            <Link
                href="/"
                className="flex items-center absolute top-1 left-2 text-sm text-neutral-500 hover:text-blue-500 transition"
            >
                <CircleChevronLeft size={30} color="green" />
            </Link>

            <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-xl p-8 space-y-6 mt-6">
                <Image
                    src={bookPort}
                    alt="Portada del libro"
                    width={160}
                    height={240}
                    className="rounded-md mx-auto"
                />

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
                            {book.status === "finished"
                                ? "Leído"
                                : book.status === "reading"
                                    ? "Leyendo"
                                    : "Pendiente"}
                        </span>
                    </div>
                    <div className="col-span-2 pt-2">
                        {book.status === "finished" && book.finishedAt && (
                            <p className="text-sm text-neutral-500 italic">
                                Finalizado el{" "}
                                <span className="text-neutral-700 font-medium">
                                    {formatDate(book.finishedAt.toDate())}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {book.status !== "finished" && (
                <div className="w-full max-w-2xl mt-10">
                    <PomodoroTimer onComplete={() => console.log("Pomodoro Complete!")} />
                </div>
            )}
        </div>

    );
};

export default BookDetail;