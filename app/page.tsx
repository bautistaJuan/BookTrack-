"use client";
import AddBookForm from "./components/Form";
import { signInWithGoogle, logOut } from "./lib/auth";
import { useState } from "react";
import { useBooksByUser } from "./lib/firestore"
import { useAuth } from "./context/AuthContext"
import Link from "next/link";
import { FilterBooks } from "./types/types";

const filters: { label: string; value: FilterBooks }[] = [
  { label: "Todas", value: "all" },
  { label: "Pendiente", value: "to read" },
  { label: "Leídas", value: "finished" },
  { label: "Leyendo", value: "reading" },
];

export default function Home() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterBooks>("all");
  const { books, loading } = useBooksByUser(filter);
  const [isModalOpen, setModalIsOpen] = useState(false);
  if (loading) {
    return <p className="text-5xl text-blue-700">Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      {user ? (
        <>
          <header className="border min-w-2xl  p-4 flex justify-between">
            <h1>Bienvenido, {user.displayName}</h1>
            <button onClick={logOut} className="bg-red-500 text-white p-2 rounded cursor-pointer">
              Cerrar sesión
            </button>
          </header>
          <main className="border grow w-full ">
            {/* Nav para filtros */}
            <nav className="flex w-full justify-evenly border p-4">
              {filters.map(({ label, value }) => (
                <li
                  key={value}
                  className={`border-2 list-none mt-4 p-2 text-2xl cursor-pointer ${filter === value ? "bg-blue-200" : ""}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </li>
              ))}
            </nav>;
            <div className="w-full flex justify-center flex-col bg-green-500">
              <h1>LISTA DE LIBROS AQUÍ ABAJO...</h1>
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book.id} className="bg-white p-4 m-2 rounded shadow w-96">
                    <Link href={`/mislibros/${book.id}`} className="text-xl">{book.title}</Link>
                  </div>
                ))
              ) : (
                <p className="text-white">No hay libros guardados.</p>
              )}
            </div>
          </main>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center"
              onClick={() => setModalIsOpen(false)} // Cierra el modal al hacer clic fuera
            >
              <div
                className=" p-6 rounded shadow-lg w-96 border"
                onClick={(e) => e.stopPropagation()} // Evita cerrar el modal si se hace clic dentro
              >
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="mt-4 bg-red-500 text-white p-2 rounded w-full"
                >
                  Cerrar
                </button>
                <AddBookForm closeModal={setModalIsOpen} />
              </div>
            </div>
          )}

          {/* Botón flotante */}
          {!isModalOpen && (
            <button
              onClick={() => setModalIsOpen(true)}
              className="text-6xl border flex items-center justify-center rounded-2xl text-blue-500 fixed bottom-5 right-5 cursor-pointer bg-white p-4 shadow-lg"
            >
              +
            </button>
          )}
        </>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 rounded">
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
}
