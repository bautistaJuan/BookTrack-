"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({ message = "Ha ocurrido un error inesperado." }) {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/");
        }, 4000); // redirige después de 4 segundos

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold text-neutral-800">¡Ups! Algo salió mal.</h1>
            <p className="text-neutral-500 mt-2">{message}</p>
            <p className="text-sm text-neutral-400 mt-4">Redirigiendo al inicio...</p>
        </div>
    );
}
