import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: " Buscador de Lugares",
  description:
    "Descubre restaurantes, museos, parques y más usando Google Places API",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-body antialiased bg-ink-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}
