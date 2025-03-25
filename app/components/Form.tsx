"use client";
import { useState } from "react";
import { addBook } from "../lib/firestore";

type eventChangetype = React.ChangeEvent<HTMLInputElement>;

export default function AddBookForm({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !author.trim() || !pages.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        try {
            const pagesRead = 0;
            const pages = 10;
            addBook({
                title,
                author,
                pages,
                pagesRead,
            })
            setTitle("");
            setAuthor("");
            setPages("");
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
    const handlePagesChange = (e: eventChangetype) => {
        setPages(e.target.value);
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
                value={pages}
                onChange={handlePagesChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Ej: 150"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-2">
                Agregar libro
            </button>
        </form>
    );
}
