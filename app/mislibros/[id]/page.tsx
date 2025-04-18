"use client";
import { useBookById } from "@/app/lib/firestore";
import Image from "next/image";
import React from "react";
import bookPort from "../../../public/book.jpeg"; // Imagen genérica
import Link from "next/link";
import PomodoroTimer from "@/app/components/PomodoroTimer";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { book, error, loading } = useBookById(id);
    // const [increment, setIncrement] = useState(0);
    if (loading) {
        return <h1 className="text-2xl text-blue-700">Cargando...</h1>;
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
    // const handleIncrement = () => {
    //     if (increment > 0) {
    //       incrementPagesRead(id, increment); 
    //       setIncrement(0); 
    //     } else {
    //       alert("Por favor, ingresa un número válido.");
    //     }
    //   };
    return (
        <div className="flex flex-col items-center p-6 min-h-screen">
            <Link
                href="/"
                className="mb-6 text-sm text-textSecondary hover:text-accent underline transition"
            >
                ← Volver al inicio
            </Link>

            <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-md space-y-4 border">
                <Image
                    src={bookPort}
                    alt="Portada del libro"
                    width={160}
                    height={240}
                    className="rounded-lg mx-auto"
                />
                <div className="space-y-1 text-center">
                    <h2 className="text-xl font-semibold text-textPrimary">{book.title}</h2>
                    <p className="text-sm text-textSecondary">por {book.author}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-textPrimary pt-4">
                    <div>
                        <strong>Páginas:</strong>
                        <p>{book.pages}</p>
                    </div>
                    <div>
                        <strong>Leídas:</strong>
                        <p>{book.pagesRead}</p>
                    </div>
                    <div className="col-span-2">
                        <strong>Estado:</strong>
                        <p>
                            {book.status === "finished"
                                ? "Leído"
                                : book.status === "reading"
                                    ? "Leyendo"
                                    : "Pendiente"}
                        </p>
                    </div>
                </div>
            </div>

            <PomodoroTimer onComplete={() => console.log("Pomodoro Complete!")} />
        </div>

    );
};

export default BookDetail;