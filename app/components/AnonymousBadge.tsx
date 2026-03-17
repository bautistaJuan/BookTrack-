"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, X, AlertTriangle } from "lucide-react";
import { signInWithGoogle } from "@lib/auth";

export default function AnonymousBadge() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <div className="relative">
            {/* Icon button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen((prev) => !prev)}
                className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-warning/15 border border-warning/40 text-warning hover:bg-warning/25 transition-colors duration-200"
                aria-label="Modo anónimo activo"
            >
                <UserX size={18} />
                {/* Pulse dot */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-warning rounded-full animate-pulse" />
            </motion.button>

            {/* Popover */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 top-12 z-50 w-72 glass-strong border border-border-light rounded-2xl shadow-soft-lg p-5 flex flex-col gap-4"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={16} />
                            </button>

                            {/* Header */}
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-warning/15 flex items-center justify-center">
                                    <AlertTriangle size={18} className="text-warning" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">
                                        Estás en modo anónimo
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                        Los libros que agregues <span className="text-warning font-medium">no se guardarán</span> de forma permanente. Registrate para conservar tu biblioteca.
                                    </p>
                                </div>
                            </div>

                            {/* Google Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-surface border border-border-light hover:bg-surface-hover rounded-xl px-4 py-2.5 text-sm font-medium text-text-primary transition-colors duration-200 disabled:opacity-60"
                            >
                                {/* Google logo SVG */}
                                <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44.5 20H24v8.5h11.7C34.2 33.6 29.6 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.9 0 20-7.9 20-21 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
                                    <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00" />
                                    <path d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 36.1 26.9 37 24 37c-5.6 0-10.3-3.4-11.8-8.3l-7 5.4C8.6 41.4 15.7 45 24 45z" fill="#4CAF50" />
                                    <path d="M44.5 20H24v8.5h11.7c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.4C41.8 36.3 45 30.6 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
                                </svg>
                                {loading ? "Iniciando..." : "Iniciar sesión con Google"}
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
