"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth } from "../lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

/**
 * Auth context value type
 */
interface AuthContextValue {
    /** Current authenticated user or null */
    user: User | null;
    /** Whether auth state is still being determined */
    loading: boolean;
    /** Whether user is authenticated */
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
    isAuthenticated: false,
});

/**
 * Auth Provider component that manages authentication state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo<AuthContextValue>(() => ({
        user,
        loading,
        isAuthenticated: !!user,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth context
 * @returns Auth context value with user, loading state, and isAuthenticated flag
 */
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
