import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import { MovieThemeProvider } from "@/context/MovieThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FilmHub — Cinematic Streaming Experience",
  description: "Platform web modern untuk eksplorasi film dengan adaptive color themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-white font-sans antialiased selection:bg-[#E50914] selection:text-white min-h-screen overflow-x-hidden relative flex flex-col">
        <MovieThemeProvider>
          <Navbar />
          <main className="w-full flex-grow">
            {children}
          </main>
          <BottomNav />
        </MovieThemeProvider>
      </body>
    </html>
  );
}
