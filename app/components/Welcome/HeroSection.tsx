"use client";
import Image from "next/image";
import google from "@public/Logo.jpeg";
import { signInWithGoogle, signInAnonymously } from "@lib/auth";
import { motion } from "framer-motion";
import welcomeImg from "@public/welcome-hero.png";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative flex flex-col sm:flex-row items-center justify-center gap-12 min-h-dvh w-full px-6 py-4 sm:px-12 overflow-hidden">
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

                    {/* <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="italic text-sm text-text-muted bg-surface-secondary px-4 py-3 rounded-xl border border-border-light"
                    >
                        "La lectura es un viaje que nos transforma." — Gabriel Rolón
                    </motion.p> */}
                    {/* Button Google */}

                    {/* Sign up with Google */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={signInWithGoogle}
                        className="mt-4 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-lg text-text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                        <Image src={google} alt="Google Logo" width={20} height={20} />
                        <span>Iniciar con Google</span>
                    </motion.button>
                    {/* Sign up anonymously */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={signInAnonymously}
                        className="mt-2 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium border-green-900 border-double border-4 text-text-secondary  hover:bg-surface transition-colors duration-200"
                    >
                        <span>Iniciar sesión de prueba</span>
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
