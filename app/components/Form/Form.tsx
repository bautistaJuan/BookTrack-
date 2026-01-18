"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { addBook, updateBook } from "../../lib/services/bookService";
import { FormProps, IFormTypes } from "../../types/types";

const AddBookForm = ({ handleCloseModal, bookToEdit }: FormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IFormTypes>();

    useEffect(() => {
        if (bookToEdit) {
            setValue("title", bookToEdit.title);
            setValue("author", bookToEdit.author);
            setValue("pages", bookToEdit.pages);
            setValue("pagesRead", bookToEdit.pagesRead);
            setValue("status", bookToEdit.status);
        }
    }, [bookToEdit, setValue]);

    const onSubmit = async (data: IFormTypes) => {
        try {
            const { title, author, pages, pagesRead, status } = data;

            const bookData = {
                title,
                author,
                pages: Number(pages),
                pagesRead: Number(pagesRead),
                status
            };

            if (bookToEdit) {
                await updateBook(bookToEdit.id!, bookData);
            } else {
                await addBook(bookData);
            }

            reset();
            handleCloseModal(false);
        } catch (error) {
            console.error("Error al guardar el libro:", error);
            alert(error instanceof Error ? error.message : "Hubo un error al guardar el libro.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-surface w-full max-w-lg rounded-3xl shadow-soft-xl overflow-hidden border border-border-light"
            >
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                                {bookToEdit ? "Editar Libro" : "Nuevo Libro"}
                            </h2>
                            <p className="text-text-secondary text-sm mt-1">
                                {bookToEdit ? "Modifica los detalles de tu lectura" : "Agregá un nuevo título a tu colección"}
                            </p>
                        </div>
                        <button
                            onClick={() => handleCloseModal(false)}
                            className="p-2 hover:bg-surface-secondary rounded-full transition-colors duration-200"
                        >
                            <X size={20} className="text-text-muted" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-text-secondary ml-1">Título del Libro</label>
                                <input
                                    {...register("title", { required: "El título es obligatorio" })}
                                    className="w-full px-5 py-3 rounded-2xl bg-surface-secondary border border-border-light focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 outline-none transition-all duration-200 text-text-primary placeholder:text-text-muted"
                                    placeholder="Ej: El Alquimista"
                                />
                                {errors.title && <p className="text-danger text-xs ml-1 font-medium">{errors.title.message}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-text-secondary ml-1">Nombre del Autor</label>
                                <input
                                    {...register("author", { required: "El autor es obligatorio" })}
                                    className="w-full px-5 py-3 rounded-2xl bg-surface-secondary border border-border-light focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 outline-none transition-all duration-200 text-text-primary placeholder:text-text-muted"
                                    placeholder="Ej: Paulo Coelho"
                                />
                                {errors.author && <p className="text-danger text-xs ml-1 font-medium">{errors.author.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary ml-1">Páginas Totales</label>
                                <input
                                    type="number"
                                    {...register("pages", { required: "Obligatorio", min: 1 })}
                                    className="w-full px-5 py-3 rounded-2xl bg-surface-secondary border border-border-light focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 outline-none transition-all duration-200 text-text-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary ml-1">Páginas Leídas</label>
                                <input
                                    type="number"
                                    {...register("pagesRead", { required: "Obligatorio", min: 0 })}
                                    className="w-full px-5 py-3 rounded-2xl bg-surface-secondary border border-border-light focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 outline-none transition-all duration-200 text-text-primary"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-text-secondary ml-1">Estado de Lectura</label>
                                <select
                                    {...register("status")}
                                    className="w-full px-5 py-3 rounded-2xl bg-surface-secondary border border-border-light focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 outline-none transition-all duration-200 text-text-primary appearance-none cursor-pointer"
                                >
                                    <option value="to read">📚 Pendiente</option>
                                    <option value="reading">📖 Leyendo</option>
                                    <option value="finished">✅ Finalizado</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => handleCloseModal(false)}
                                className="flex-1 px-6 py-4 rounded-2xl border border-border-light font-bold text-text-secondary hover:bg-surface-secondary transition-all duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-[2] px-6 py-4 rounded-2xl gradient-primary font-bold text-white shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Check size={20} />
                                        {bookToEdit ? "Guardar Cambios" : "Agregar Libro"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AddBookForm;