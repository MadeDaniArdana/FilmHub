import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "FilmHub - Premium Cinema",
  description: "Platform web modern untuk eksplorasi, pencarian, dan rekomendasi film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-on-surface font-body antialiased selection:bg-primary-container selection:text-white min-h-screen pb-20 md:pb-0 flex flex-col">
        <Navbar />
        <main className="w-full flex-grow mt-20 md:mt-0">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
