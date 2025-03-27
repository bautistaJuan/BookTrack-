"use client";
import { useState } from "react";
import { addBook } from "../lib/firestore";

type eventChangetype = React.ChangeEvent<HTMLInputElement>;

export default function AddBookForm({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState(0);
    const [pagesRead, setPagesRead] = useState(0);
    const statuses: Array<"finished" | "reading" | "to read"> = ["finished", "reading", "to read"];
    const [status, setStatus] = useState<"finished" | "reading" | "to read">("finished");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !author.trim() || pages <= 0) {
            alert("Verifica bien los datos antes de enviar el formulario");
            return;
        }
        if (status === "reading" && pagesRead > pages) {
            alert("Las páginas leídas no pueden ser mayores que el total de páginas.");
            return;
        }
        try {
            addBook({
                title,
                author,
                pages,
                pagesRead,
                status
            })
            setTitle("");
            setAuthor("");
            setPages(0);
            setPagesRead(0);
            closeModal(false);
        } catch (error) {
            console.error("Error al agregar el libro:", error);
            alert("Hubo un error al agregar el libro.");
        }
    };
    const handleTitleChange = (e: eventChangetype) => {
        setTitle(e.target.value);
    }
    const handleAuthorChange = (e: eventChangetype) => {
        setAuthor(e.target.value);
    }
    const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);

        if (value < 0) {
            alert("No se pueden ingresar valores negativos.");
            setPages(0);  // Restablecemos a 0 en caso de error
            return;
        }

        setPages(value);  // Si todo está bien, actualizamos el estado
    };
    const handlePagesRead = (e: eventChangetype) => {
        const value = parseInt(e.target.value, 10);
        if (value < 0) {
            alert("No se pueden ingresar valores negativos.");
            setPagesRead(0);  // Restablecemos a 0 en caso de error
            return;
        } if (pagesRead >= pages) {
            alert("¿Estas escribiendo la continuación del libro?");
            setPagesRead(0);  // Restablecemos a 0 en caso de error
            return;
        }
        setPagesRead(value)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md fixed ">
            <h2 className="text-lg font-semibold mb-3">Agregar un nuevo libro</h2>

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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-2">
                Agregar libro
            </button>
        </form>
    );
}
