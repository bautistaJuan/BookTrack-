"use client";

import { useEffect, useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { addBook, updateBook } from "@lib/services/bookService";
import { BOOK_CONSTRAINTS } from "@lib/validation/bookValidation";
import { FormProps, IFormTypes } from "@app/types/types";

export default function BookForm({ onClose, bookToEdit }: FormProps) {
    const titleId = useId();
    const authorId = useId();
    const pagesId = useId();
    const pagesReadId = useId();
    const statusId = useId();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<IFormTypes>({
        defaultValues: {
            title: bookToEdit?.title ?? "",
            author: bookToEdit?.author ?? "",
            pages: bookToEdit?.pages ?? 1,
            pagesRead: bookToEdit?.pagesRead ?? 0,
            status: bookToEdit?.status ?? "to read",
        },
    });

    const totalPages = useWatch({ control, name: "pages" });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isSubmitting) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSubmitting, onClose]);

    const onSubmit = async (data: IFormTypes) => {
        const bookData = {
            ...data,
            title: data.title.trim(),
            author: data.author.trim(),
            pages: Number(data.pages),
            pagesRead: Number(data.pagesRead),
        };

        try {
            if (bookToEdit) {
                await updateBook(bookToEdit.id, bookData);
            } else {
                await addBook(bookData);
            }

            reset();
            onClose();
        } catch (error) {
            console.error("Error al guardar el libro:", error);
            alert(error instanceof Error ? error.message : "Hubo un error al guardar el libro.");
        }
    };

    const fieldClassName = "w-full px-4 py-3 rounded-xl bg-primary-50/30 border border-primary-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-colors";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isSubmitting) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="book-form-title"
                className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-primary-100 bg-white shadow-soft-xl"
            >
                <div className="p-5 sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h2 id="book-form-title" className="text-2xl font-bold tracking-tight text-primary-900">
                                {bookToEdit ? "Editar libro" : "Nuevo libro"}
                            </h2>
                            <p className="mt-1 text-sm text-primary-500">
                                {bookToEdit ? "Modificá los detalles de tu lectura." : "Agregá un título a tu biblioteca."}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-full p-2 text-primary-500 transition-colors hover:bg-primary-50 disabled:opacity-50"
                            aria-label="Cerrar formulario"
                        >
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                        <div>
                            <label htmlFor={titleId} className="mb-2 block text-sm font-semibold text-primary-500">
                                Título
                            </label>
                            <input
                                id={titleId}
                                autoFocus
                                maxLength={BOOK_CONSTRAINTS.TITLE_MAX_LENGTH}
                                aria-invalid={Boolean(errors.title)}
                                aria-describedby={errors.title ? `${titleId}-error` : undefined}
                                {...register("title", {
                                    required: "El título es obligatorio.",
                                    maxLength: {
                                        value: BOOK_CONSTRAINTS.TITLE_MAX_LENGTH,
                                        message: `Máximo ${BOOK_CONSTRAINTS.TITLE_MAX_LENGTH} caracteres.`,
                                    },
                                })}
                                className={fieldClassName}
                                placeholder="Ej.: El Aleph"
                            />
                            {errors.title && <p id={`${titleId}-error`} role="alert" className="mt-1 text-xs font-medium text-danger">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor={authorId} className="mb-2 block text-sm font-semibold text-primary-500">
                                Autor
                            </label>
                            <input
                                id={authorId}
                                maxLength={BOOK_CONSTRAINTS.AUTHOR_MAX_LENGTH}
                                aria-invalid={Boolean(errors.author)}
                                aria-describedby={errors.author ? `${authorId}-error` : undefined}
                                {...register("author", {
                                    required: "El autor es obligatorio.",
                                    maxLength: {
                                        value: BOOK_CONSTRAINTS.AUTHOR_MAX_LENGTH,
                                        message: `Máximo ${BOOK_CONSTRAINTS.AUTHOR_MAX_LENGTH} caracteres.`,
                                    },
                                })}
                                className={fieldClassName}
                                placeholder="Ej.: Jorge Luis Borges"
                            />
                            {errors.author && <p id={`${authorId}-error`} role="alert" className="mt-1 text-xs font-medium text-danger">{errors.author.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor={pagesId} className="mb-2 block text-sm font-semibold text-primary-500">
                                    Páginas totales
                                </label>
                                <input
                                    id={pagesId}
                                    type="number"
                                    min={1}
                                    max={BOOK_CONSTRAINTS.MAX_PAGES}
                                    aria-invalid={Boolean(errors.pages)}
                                    aria-describedby={errors.pages ? `${pagesId}-error` : undefined}
                                    {...register("pages", {
                                        valueAsNumber: true,
                                        required: "Ingresá el total.",
                                        min: { value: 1, message: "Debe ser mayor que cero." },
                                        max: {
                                            value: BOOK_CONSTRAINTS.MAX_PAGES,
                                            message: `Máximo ${BOOK_CONSTRAINTS.MAX_PAGES}.`,
                                        },
                                    })}
                                    className={fieldClassName}
                                />
                                {errors.pages && <p id={`${pagesId}-error`} role="alert" className="mt-1 text-xs font-medium text-danger">{errors.pages.message}</p>}
                            </div>

                            <div>
                                <label htmlFor={pagesReadId} className="mb-2 block text-sm font-semibold text-primary-500">
                                    Páginas leídas
                                </label>
                                <input
                                    id={pagesReadId}
                                    type="number"
                                    min={0}
                                    max={Number(totalPages) || BOOK_CONSTRAINTS.MAX_PAGES}
                                    aria-invalid={Boolean(errors.pagesRead)}
                                    aria-describedby={errors.pagesRead ? `${pagesReadId}-error` : undefined}
                                    {...register("pagesRead", {
                                        valueAsNumber: true,
                                        required: "Ingresá el avance.",
                                        min: { value: 0, message: "No puede ser negativo." },
                                        validate: (value) => value <= Number(totalPages) || "No puede superar el total.",
                                    })}
                                    className={fieldClassName}
                                />
                                {errors.pagesRead && <p id={`${pagesReadId}-error`} role="alert" className="mt-1 text-xs font-medium text-danger">{errors.pagesRead.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor={statusId} className="mb-2 block text-sm font-semibold text-primary-500">
                                Estado de lectura
                            </label>
                            <select id={statusId} {...register("status")} className={fieldClassName}>
                                <option value="to read">Pendiente</option>
                                <option value="reading">Leyendo</option>
                                <option value="finished">Finalizado</option>
                            </select>
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 rounded-xl border border-primary-100 px-5 py-3 font-semibold text-primary-500 transition-colors hover:bg-primary-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-primary-600 disabled:cursor-wait disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-label="Guardando" />
                                ) : (
                                    <>
                                        <Check size={20} aria-hidden="true" />
                                        {bookToEdit ? "Guardar cambios" : "Agregar libro"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
