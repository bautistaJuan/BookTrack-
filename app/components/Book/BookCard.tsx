import { useRouter } from "next/navigation";
import { BookCardProps } from "../../types/types";
import BookActions from "./BooksActions";
import { motion } from "framer-motion";
import { getPorcentajeBook } from "@/app/utils/utils";

export default function BookCard({
    book,
    handleEditBook,
    deleteBookFromFirestore,
}: BookCardProps) {
    const router = useRouter();
    const handleRouter = (id: string) => {
        return router.push(`/mislibros/${id}`);
    };
    const getPorcentaje = getPorcentajeBook(book);

    return (
        <div
            key={book.id}
            onClick={() => handleRouter(book.id!)}
            className="relative h-fit bg-white rounded-xl border shadow-sm p-6 w-full max-w-md hover:shadow-md active:scale-[0.99] transition-transform cursor-pointer flex flex-col gap-4 "
        >
            {/* Book Actions */}
            <BookActions onEdit={() => handleEditBook(book)} onDelete={() => deleteBookFromFirestore(book.id!)} />
            {/* Título y autor */}
            <div>
                <h2 className="text-lg font-semibold text-textPrimary tracking-tight">
                    {book.title}
                </h2>
                <p className="text-sm text-textSecondary mt-1">{book.author}</p>
            </div>
            {/* Barra Progreso */}
            <div className="w-fqull h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-green-500 rounded-full"
                    animate={{ width: `${getPorcentaje}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            </div>
            {/* Status */}
            <div className="flex items-center justify-between text-xs text-textSecondary">
                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    {book.status === "to read"
                        ? "Pendiente"
                        : book.status === "reading"
                            ? "Leyendo"
                            : "Finalizado"}
                </span>
                <span>
                    {book.pagesRead} / {book.pages} páginas
                </span>
            </div>
        </div>
    );
}