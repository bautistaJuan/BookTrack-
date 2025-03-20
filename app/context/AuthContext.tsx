"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
    user: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Una vez que Firebase responde, marcamos como cargado
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

// Hook para acceder al usuario y al estado de carga en cualquier parte de la app
export function useAuth() {
    return useContext(AuthContext);
}
