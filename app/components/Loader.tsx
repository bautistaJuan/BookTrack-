"use client";
import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-background gap-4">
            {/* Animated loader */}
            <div className="relative">
                {/* Outer ring */}
                <motion.div
                    className="w-16 h-16 rounded-full border-4 border-primary-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner gradient spinner */}
                <motion.div
                    className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Loading text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-text-muted font-medium"
            >
                Cargando...
            </motion.p>
        </div>
    );
};

export default Loader;