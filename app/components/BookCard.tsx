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
            className="flex bg-white rounded-2xl shadow-md p-2 w-full max-w-sm relative justify-between cursor-pointer hover:shadow-2xl active:scale-95"
            onClick={() => handleRouter(book.id!)}
        >
            <div className="w-full">
                <h2 className="text-xl text-textPrimary font-semibold mb-1">
                    {book.title}
                </h2>
                <p className="text-sm text-textSecondary mb-2">{book.author}</p>
                <div className="flex flex-col gap-2">
                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 w-fit">
                        {book.status === "to read"
                            ? "Pendiente"
                            : book.status === "reading"
                                ? "Leyendo"
                                : "Finalizado"}
                    </span>
                    <span className="text-xs text-textSecondary">
                        {book.pagesRead} / {book.pages} páginas
                    </span>
                </div>
            </div>

            {/* Botón de menú */}
            <div className="relative ml-2" >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === book.id ? null : book.id!)
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <EllipsisVertical size={24} />
                </button>

                {/* Dropdown */}
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
        </div>
    );
}
