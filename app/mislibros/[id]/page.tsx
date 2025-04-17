"use client";
import { useBookById } from "@/app/lib/firestore";
import Image from "next/image";
import React from "react";
import bookPort from "../../../public/book.jpeg"; // Imagen genérica
import Link from "next/link";

const BookDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { book, error, loading } = useBookById(id);

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

    return (
        <div className="flex flex-col items-center p-6 min-h-screen">
            <Link
                href="/"
                className="mt-4 inline-block bg-blue-500 text-white p-2 rounded"
            >
                Volver al inicio
            </Link>
            <h1 className="text-2xl text-green-700 mb-4">
                Detalles del libro
            </h1>
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <Image
                    src={bookPort}
                    alt="Portada del libro"
                    className="mb-4 mx-auto"
                />
                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                <p className="mb-2"><strong>Autor:</strong> {book.author}</p>
                <p className="mb-2"><strong>Páginas:</strong> {book.pages}</p>
                <p className="mb-2"><strong>Páginas leídas:</strong> {book.pagesRead}</p>
                <p className="mb-2"><strong>Estado:</strong> {book.status === "finished" ? "Leído" : book.status === "reading" ? "Leyendo" : "Pendiente"}</p>
            </div>
        </div>
    );
};

export default BookDetail;