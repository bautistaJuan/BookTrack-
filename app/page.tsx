"use client";
import { useAuth } from "./context/AuthContext";
import { signInWithGoogle, logOut } from "./lib/auth"

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-5xl text-blue-700">Cargando...</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <>
          <h1>Bienvenido, {user.displayName}</h1>
          <button onClick={logOut} className="bg-red-500 text-white p-2 rounded cursor-pointer">
            Cerrar sesión
          </button>
        </>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 rounded ">
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
}
