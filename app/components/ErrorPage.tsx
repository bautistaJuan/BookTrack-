"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorPage({ message = "Ha ocurrido un error inesperado." }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6" style={{ backgroundColor: "#f8fafc" }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-md"
            >
                {/* Icon */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-danger-light to-red-50 rounded-2xl"
                >
                    <AlertTriangle className="w-10 h-10 text-danger" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#051F20" }}
                >
                    ¡Ups! Algo salió mal
                </motion.h1>

                {/* Message */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                    style={{ color: "#235347" }}
                >
                    {message}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-2 btn-primary"
                >
                    <Home size={18} />
                    Volver al inicio
                </motion.button>
            </motion.div>
        </div>
    );
}
