"use client";
import { useState } from "react";
import { signInWithGoogle, signInAnonymously } from "@lib/firebase";
import { motion, Variants } from "framer-motion";

const title = "Lectio";
const subtitle = "Organizá tus lecturas en un solo lugar";

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            delay: 0.3 + i * 0.1,
            duration: 0.6,
            ease: "easeInOut",
        },
    }),
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.7, ease: "easeInOut" },
    }),
};

export const HeroSection = () => {
    const [pendingAction, setPendingAction] = useState<"google" | "anonymous" | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    const handleSignIn = async (method: "google" | "anonymous") => {
        setPendingAction(method);
        setAuthError(null);

        try {
            if (method === "google") {
                await signInWithGoogle();
            } else {
                await signInAnonymously();
            }
        } catch {
            setAuthError("No se pudo iniciar sesión. Intentá nuevamente.");
        } finally {
            setPendingAction(null);
        }
    };

    return (
        <section
            className="relative flex flex-col items-center justify-center min-h-dvh w-full overflow-hidden"
            style={{ backgroundColor: "#051F20" }}
        >
            {/* Subtle radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(35,83,71,0.35) 0%, transparent 70%)",
                }}
            />

            {/* Minimal decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[1px]"
                style={{ backgroundColor: "rgba(142,182,155,0.12)" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6 max-w-2xl mx-auto">
                {/* Title — letter by letter */}
                <h1 className="font-playfair font-bold text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none select-none">
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={letterVariants}
                            className="inline-block"
                            style={{ color: "#DAF1DE" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>

                {/* Subtle divider */}
                <motion.div
                    custom={1.2}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="w-12 h-[1px]"
                    style={{ backgroundColor: "#8EB69B" }}
                />

                {/* Subtitle */}
                <motion.p
                    custom={1.4}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="font-jakarta text-lg sm:text-xl tracking-wide leading-relaxed"
                    style={{ color: "#8EB69B" }}
                >
                    {subtitle}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    custom={1.7}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-col items-center gap-3 mt-6 w-full max-w-xs"
                >
                    {/* Google Sign-in */}
                    <button
                        type="button"
                        onClick={() => handleSignIn("google")}
                        disabled={pendingAction !== null}
                        className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                        style={{
                            backgroundColor: "rgba(218,241,222,0.08)",
                            border: "1px solid rgba(142,182,155,0.25)",
                            color: "#DAF1DE",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(218,241,222,0.15)";
                            e.currentTarget.style.borderColor = "rgba(142,182,155,0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(218,241,222,0.08)";
                            e.currentTarget.style.borderColor = "rgba(142,182,155,0.25)";
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44.5 20H24v8.5h11.7C34.2 33.6 29.6 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.9 0 20-7.9 20-21 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
                            <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00" />
                            <path d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 36.1 26.9 37 24 37c-5.6 0-10.3-3.4-11.8-8.3l-7 5.4C8.6 41.4 15.7 45 24 45z" fill="#4CAF50" />
                            <path d="M44.5 20H24v8.5h11.7c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.4C41.8 36.3 45 30.6 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
                        </svg>
                        <span>{pendingAction === "google" ? "Iniciando..." : "Iniciar con Google"}</span>
                    </button>

                    {/* Anonymous Sign-in */}
                    <button
                        type="button"
                        onClick={() => handleSignIn("anonymous")}
                        disabled={pendingAction !== null}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                        style={{
                            color: "#8EB69B",
                            border: "1px solid rgba(142,182,155,0.15)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(218,241,222,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                    >
                        <span>{pendingAction === "anonymous" ? "Iniciando..." : "Iniciar sesión de prueba"}</span>
                    </button>
                </motion.div>

                {authError && (
                    <p role="alert" className="text-sm text-red-300">
                        {authError}
                    </p>
                )}

                {/* Footer note */}
                <motion.span
                    custom={2.0}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-xs mt-2 tracking-wide"
                    style={{ color: "rgba(142,182,155,0.4)" }}
                >
                    Inicio rápido · No publicamos nada sin tu permiso
                </motion.span>
            </div>
        </section>
    );
};
