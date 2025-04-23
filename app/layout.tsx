import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reader Tracker",
  description: "Hecho con 🖤 por Juan ",
  icons: {
    icon: "/welcome-hero.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
