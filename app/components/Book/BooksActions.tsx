"use client";

import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface BookActionsProps {
    onEdit: () => void;
    onDelete: () => void;
}

const BookActions = ({ onEdit, onDelete }: BookActionsProps) => {
    const [open, setOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
        setOpen(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
        setOpen(false);
    };

    return (
        <div className="absolute top-3 right-3">
            <button
                onClick={toggleDropdown}
                className="p-1 hover:bg-gray-100 rounded-full"
            >
                <EllipsisVertical size={20} />
            </button>

            {open && (
                <div className="absolute right-0 top-10 w-36 bg-white rounded-lg shadow-lg z-10 border">
                    <button
                        onClick={handleEdit}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookActions;
