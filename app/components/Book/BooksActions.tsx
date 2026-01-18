"use client";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookActionsProps {
    onEdit: () => void;
    onDelete: () => void;
}

const BookActions = ({ onEdit, onDelete }: BookActionsProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        <div ref={dropdownRef} className="absolute top-4 right-4 z-10">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDropdown}
                className="p-2 hover:bg-surface-secondary rounded-xl transition-colors duration-200"
            >
                <EllipsisVertical size={18} className="text-text-muted" />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 w-40 bg-surface rounded-xl shadow-soft-lg z-20 border border-border-light overflow-hidden"
                    >
                        <motion.button
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            onClick={handleEdit}
                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <Pencil size={16} />
                            Editar
                        </motion.button>
                        <div className="h-px bg-border-light" />
                        <motion.button
                            whileHover={{ backgroundColor: "rgba(239,68,68,0.05)" }}
                            onClick={handleDelete}
                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-danger hover:text-danger transition-colors"
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookActions;
