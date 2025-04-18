import { useRouter } from "next/navigation";
import { BookCardProps } from "../types/types";
import { EllipsisVertical } from "lucide-react";



export default function BookCard({
    book,
    openDropdownId,
    setOpenDropdownId,
    handleEditBook,
    deleteBookFromFirestore,
}: BookCardProps) {
    const router = useRouter();
    const handleRouter = (id: string) => { return router.push(`/mislibros/${id}`) }
    return (
        <div
            key={book.id}
            onClick={() => handleRouter(book.id!)}
            className="relative bg-white rounded-xl border shadow-sm p-6 w-full max-w-md hover:shadow-md active:scale-[0.99] transition-transform cursor-pointer flex flex-col gap-4"
        >
            {/* Botón de menú */}
            <div className="absolute top-3 right-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === book.id ? null : book.id!);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <EllipsisVertical size={20} />
                </button>

                {openDropdownId === book.id && (
                    <div className="absolute right-0 top-10 w-36 bg-white rounded-lg shadow-lg z-10 border">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditBook(book);
                                setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Editar
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteBookFromFirestore(book.id!);
                                setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>

            {/* Título y autor */}
            <div>
                <h2 className="text-lg font-semibold text-textPrimary tracking-tight">{book.title}</h2>
                <p className="text-sm text-textSecondary mt-1">{book.author}</p>
            </div>

            {/* Estado y progreso */}
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
