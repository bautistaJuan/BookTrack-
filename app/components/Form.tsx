"use client";
import { useEffect, useState } from "react";
import { addBook, updateBookInFirestore } from "../lib/firestore";
import { Book, FilterBooks, FormProps } from "../types/types";
import { BookHeart } from "lucide-react";

export default function AddBookForm({
    closeModal,
    bookToEdit,
}: FormProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState(0);
    const [pagesRead, setPagesRead] = useState(0);
    const statuses: Array<"finished" | "reading" | "to read"> = [
        "finished",
        "reading",
        "to read",
    ];
    const [status, setStatus] = useState<FilterBooks>("to read");

    // Cargar datos de bookToEdit cuando cambia
    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setPages(bookToEdit.pages);
            setPagesRead(bookToEdit.pagesRead);
            setStatus(bookToEdit.status);
        } else {
            resetForm();
        }
    }, [bookToEdit]);

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setPages(0);
        setPagesRead(0);
        setStatus("to read");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // VALIDACIONES ANTES DE HACER CUALQUIER COSA
        if (!title.trim() || !author.trim() || pages <= 0) {
            alert("Verifica bien los datos antes de enviar el formulario");
            return;
        }
        if (status === "reading" && pagesRead > pages) {
            alert("Las páginas leídas no pueden ser mayores que el total de páginas.");
            return;
        }
        if (isNaN(pages) || isNaN(pagesRead)) {
            alert("Los valores de las páginas deben ser números válidos.");
            return;
        }
        // MANEJO DE ACCIONES
        try {
            // CONDICIÓN PARA SABER SI DEBEMOS EDITAR O ACTUALIZAR
            if (bookToEdit) {
                // VAMOS A GUARDAR SOLAMENTE LOS CAMPOS EDITADOS EN ESTE OBJ
                const updatedData: Partial<Book> = {};

                if (title !== bookToEdit.title) updatedData.title = title;
                if (author !== bookToEdit.author) updatedData.author = author;
                if (pages !== bookToEdit.pages) updatedData.pages = pages;
                if (pagesRead !== bookToEdit.pagesRead) updatedData.pagesRead = pagesRead;
                if (status !== bookToEdit.status) updatedData.status = status;

                // SI EL USUARIO NO HIZO NINGUN CAMBIO, RETORNAMOS
                if (Object.keys(updatedData).length === 0) return;
                await updateBookInFirestore(bookToEdit.id!, updatedData);
                alert("Libro actualizado exitosamente");
            } else {
                await addBook({
                    title,
                    author,
                    pages,
                    pagesRead,
                    status,
                });
                alert("Libro agregado exitosamente");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Hubo un error al guardar el libro");
        } finally {
            resetForm();
            closeModal(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };
    const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value < 0) {
            alert("No se pueden ingresar valores negativos.");
            return;
        }
        setPages(value);
    };
    const handlePagesRead = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value < 0) {
            alert("No se pueden ingresar valores negativos.");
            return;
        }
        setPagesRead(value);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-sm">
            <h2 className="text-lg font-semibold mb-3">
                {bookToEdit ? "Editar libro" : "Agregar un nuevo libro"}
            </h2>

            <label className="block text-sm font-medium">Título:</label>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Ej: El principito"
            />

            <label className="block text-sm font-medium">Autor:</label>
            <input
                type="text"
                value={author}
                onChange={handleAuthorChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Ej: Antoine de Saint-Exupéry"
            />

            <label className="block text-sm font-medium">Páginas:</label>
            <input
                type="number"
                min="0"
                value={pages}
                onChange={handlePagesChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Ej: 150"
            />
            <div className="flex gap-2">
                {statuses.map((s) => (
                    <label key={s} className="p-2 rounded">
                        <input
                            type="radio"
                            name="status"
                            value={s}
                            checked={status === s}
                            onChange={() => setStatus(s)}
                            className="mr-2"
                        />
                        {s === "to read" ? "Sin Leer" : s === "reading" ? "Leyendo" : "Finalizado"}
                    </label>
                ))}
            </div>
            {status === "reading" && (
                <div className="mt-2">
                    <label className="block text-sm font-medium">Páginas leídas:</label>
                    <input
                        type="number"
                        min="0"
                        value={pagesRead}
                        onChange={handlePagesRead}
                        className="w-full p-2 border rounded"
                        placeholder="Ej: 50"
                    />
                </div>
            )}
            <button type="submit" className="flex  justify-center  gap-1 bg-accent text-white font-semibold p-2 rounded w-full mt-2">
                <BookHeart />
                {bookToEdit ? "Actualizar libro" : "Agregar libro"}
            </button>
        </form>
    );
}