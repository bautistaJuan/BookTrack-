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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-textPrimary">
                {bookToEdit ? "Editar libro" : "Agregar un nuevo libro"}
            </h2>

            <div>
                <label className="block text-sm font-medium mb-1">Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Ej: El principito"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Autor:</label>
                <input
                    type="text"
                    value={author}
                    onChange={handleAuthorChange}
                    placeholder="Ej: Antoine de Saint-Exupéry"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Páginas:</label>
                <input
                    type="number"
                    min="0"
                    value={pages}
                    onChange={handlePagesChange}
                    placeholder="Ej: 150"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div className="flex gap-3 mt-2">
                {statuses.map((s) => (
                    <label
                        key={s}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm cursor-pointer border 
          ${status === s ? "bg-accent/10 border-accent text-accent" : "text-gray-600 border-gray-300"}`}
                    >
                        <input
                            type="radio"
                            name="status"
                            value={s}
                            checked={status === s}
                            onChange={() => setStatus(s)}
                            className="hidden"
                        />
                        {s === "to read" ? "Sin Leer" : s === "reading" ? "Leyendo" : "Finalizado"}
                    </label>
                ))}
            </div>

            {status === "reading" && (
                <div>
                    <label className="block text-sm font-medium mb-1">Páginas leídas:</label>
                    <input
                        type="number"
                        min="0"
                        value={pagesRead}
                        onChange={handlePagesRead}
                        placeholder="Ej: 50"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                </div>
            )}

            <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-accent text-white font-medium py-2 rounded-md w-full hover:bg-accent/90 transition"
            >
                <BookHeart size={18} />
                {bookToEdit ? "Actualizar libro" : "Agregar libro"}
            </button>
        </form>

    );
}