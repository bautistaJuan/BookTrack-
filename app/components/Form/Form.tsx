"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { addBook, updateBookInFirestore } from "../../lib/firestore";
import { FormProps } from "../../types/types";
import { BookHeart, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { IFormTypes } from "../../types/types";

const statuses: IFormTypes["status"][] = ["finished", "reading", "to read"];

export default function AddBookForm({
    handleCloseModal,
    bookToEdit,
}: FormProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue
    } = useForm<IFormTypes>({
        defaultValues: {
            title: "",
            author: "",
            pages: 0,
            pagesRead: 0,
            status: "to read"
        }
    });
    const selectedStatus = watch("status");
    const status = useWatch({ control, name: "status" });
    const pages = useWatch({ control, name: "pages" });

    useEffect(() => {
        if (status === "to read") {
            setValue("pagesRead", 0);
        } else if (status === "finished") {
            setValue("pagesRead", pages || 0);
        }
    }, [status, pages, setValue]);
    useEffect(() => {

        if (bookToEdit) {
            // SI SELECCIONAS LA OPCION "EDITAR LIBRO"
            // EL FORM SE RESETEA CON LOS VALORES DE ESE BOOK ACTUAL
            reset({
                title: bookToEdit.title,
                author: bookToEdit.author,
                pages: bookToEdit.pages,
                pagesRead: bookToEdit.pagesRead,
                status: bookToEdit.status
            });
        } else {
            reset();
        }
    }, [bookToEdit, reset]);

    const onSubmit = async (data: IFormTypes) => {
        const { title, author, pages, pagesRead, status } = data;

        // VALIDACIONES EXTRA
        if (status === "reading" && pagesRead > pages) {
            alert("Las páginas leídas no pueden ser mayores que el total.");
            return;
        }

        try {
            if (bookToEdit) {
                const updatedData: Partial<IFormTypes> = {};

                if (title !== bookToEdit.title) updatedData.title = title;
                if (author !== bookToEdit.author) updatedData.author = author;
                if (pages !== bookToEdit.pages) updatedData.pages = pages;
                if (pagesRead !== bookToEdit.pagesRead) updatedData.pagesRead = pagesRead;
                if (status !== bookToEdit.status) updatedData.status = status;

                if (Object.keys(updatedData).length === 0) return;
                await updateBookInFirestore(bookToEdit.id!, updatedData);
            } else {
                await addBook(data);
            }
        } catch (error) {
            console.error("Error al guardar el libro:", error);
            alert("Hubo un error al guardar el libro.");
        } finally {
            reset();
            handleCloseModal(false);
        }
    };


    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md space-y-4 relative">
            <button onClick={() => handleCloseModal(false)} className="absolute right-4 top-4 ">

                <X color="gray" />
            </button>
            <h2 className="text-xl font-semibold text-textPrimary">
                {bookToEdit ? "Editar libro" : "Agregar un nuevo libro"}
            </h2>

            <div>
                <label className="block text-sm font-medium mb-1">Título:</label>
                <input
                    {...register("title", { required: "Este campo es obligatorio" })}
                    placeholder="Ej: El principito"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Autor:</label>
                <input
                    type="text"
                    {...register("author", { required: "Este campo es obligatorio" })}
                    placeholder="Ej: Antoine de Saint-Exupéry"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Páginas:</label>
                <input
                    type="number"
                    min="1"
                    {...register("pages", { valueAsNumber: true })}
                    placeholder="Ej: 150"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
            </div>

            <div className="flex gap-3 mt-2">

                {statuses.map((s) => (
                    <label
                        key={s}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm cursor-pointer border 
      ${selectedStatus === s ? "bg-accent/10 border-accent text-accent" : "text-gray-600 border-gray-300"}`}
                    >
                        <input
                            type="radio"
                            value={s}
                            {...register("status")}
                            className="hidden"
                        />
                        {s === "to read" ? "Sin Leer" : s === "reading" ? "Leyendo" : "Finalizado"}
                    </label>
                ))}
            </div>

            {selectedStatus === "reading" && (
                <div>
                    <label className="block text-sm font-medium mb-1">Páginas leídas:</label>
                    <input
                        type="number"
                        min="1"
                        {...register("pagesRead", { valueAsNumber: true })}
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
        </motion.form>

    );
}