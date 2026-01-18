"use client";
import Image from "next/image";
import google from "@public/Logo.jpeg";
import { signInWithGoogle } from "@lib/auth";
import { motion } from "framer-motion";
import welcomeImg from "@public/welcome-hero.png";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative flex flex-col sm:flex-row items-center justify-center gap-12 min-h-dvh w-full px-6 sm:px-12 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 gradient-hero animate-gradient" />

            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-12 max-w-6xl mx-auto"
            >
                {/* Image with floating animation */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-3xl blur-2xl" />
                    <Image
                        src={welcomeImg}
                        alt="Ilustración de bienvenida"
                        priority
                        className="relative rounded-2xl shadow-soft-lg max-w-[280px] sm:max-w-[320px]"
                    />
                </motion.div>

                {/* Text Content */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-lg gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full"
                    >
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium text-primary-700">Tu compañero de lectura</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight"
                    >
                        Organizá tus lecturas{" "}
                        <span className="gradient-text">en un solo lugar</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-text-secondary leading-relaxed"
                    >
                        Registrá libros, seguí tu progreso y construí el hábito de leer sin esfuerzo.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="italic text-sm text-text-muted bg-surface-secondary px-4 py-3 rounded-xl border border-border-light"
                    >
                        "La lectura es un viaje que nos transforma." — Gabriel Rolón
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={signInWithGoogle}
                        className="mt-4 group relative flex items-center justify-center gap-3 py-4 px-8 text-base font-semibold rounded-2xl bg-surface shadow-soft-lg border border-border hover:shadow-soft-xl hover:border-primary-200 transition-all duration-300 min-w-[300px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Image src={google} alt="Google Logo" width={24} height={24} className="relative z-10" />
                        <span className="relative z-10 text-text-primary">Iniciar con Google</span>
                    </motion.button>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-xs text-text-muted mt-1"
                    >
                        Inicio rápido. No publicamos nada sin tu permiso.
                    </motion.span>
                </div>
            </motion.div>
        </section>
    );
};
