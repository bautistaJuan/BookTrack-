import Image from "next/image";
import google from "@public/Logo.jpeg";
import { signInWithGoogle } from "@/app/lib/auth";
import { motion } from "framer-motion";
import welcomeImg from "@public/welcome-hero.png";

export const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10 h-dvh bg-background w-full px-6 sm:px-12"
        >
            {/* Imagen */}
            <Image
                src={welcomeImg}
                alt="Ilustración de bienvenida"
                priority
                className="shadow-lg rounded-xl max-w-[300px]"
            />

            {/* Contenido */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-md gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary">
                    Organizá tus lecturas en un solo lugar
                </h1>

                <p className="text-md sm:text-lg text-textSecondary">
                    Registrá libros, seguí tu progreso y construí el hábito de leer sin esfuerzo.
                </p>

                <p className="italic text-sm text-textSecondary mt-2">
                    “La lectura es un viaje que nos transforma.” — Gabriel Rolón
                </p>

                <button
                    onClick={signInWithGoogle}
                    className="mt-6 border border-green-500 bg-white hover:scale-105 active:scale-100 transition-transform duration-200 flex items-center justify-center gap-3 py-3 px-6 text-lg rounded-full shadow-lg min-w-[280px]"
                >
                    <Image src={google} alt="Google Logo" width={24} height={24} />
                    Iniciar con Google
                </button>

                <span className="text-xs text-textSecondary mt-2">
                    Inicio rápido. No publicamos nada sin tu permiso.
                </span>
            </div>
        </motion.section>
    );
};
