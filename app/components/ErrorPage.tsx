"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorPage({ message = "Ha ocurrido un error inesperado." }) {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
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
                    className="text-2xl font-bold text-text-primary mb-3"
                >
                    ¡Ups! Algo salió mal
                </motion.h1>

                {/* Message */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-text-secondary mb-6"
                >
                    {message}
                </motion.p>

                {/* Redirect notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 text-sm text-text-muted mb-6"
                >
                    <motion.div
                        className="w-2 h-2 bg-primary-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    Redirigiendo al inicio en 5 segundos...
                </motion.div>

                {/* Manual redirect button */}
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
                    Ir al inicio ahora
                </motion.button>
            </motion.div>
        </div>
    );
}
