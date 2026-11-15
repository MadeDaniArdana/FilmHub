'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ListVideo, User } from 'lucide-react';
import { useMovieTheme } from '@/context/MovieThemeContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { theme } = useMovieTheme();

  return (
    <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#050505]/95 backdrop-blur-2xl border-t border-zinc-800/80 z-50 flex items-center justify-around px-2">
      <Link
        href="/"
        className={`flex flex-col items-center p-2 transition-all duration-300 ${
          pathname === '/' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
        }`}
        style={pathname === '/' ? { color: theme.primary } : {}}
      >
        <Home size={20} className="mb-0.5" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>

      <Link
        href="/search"
        className={`flex flex-col items-center p-2 transition-all duration-300 ${
          pathname === '/search' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
        }`}
        style={pathname === '/search' ? { color: theme.primary } : {}}
      >
        <Search size={20} className="mb-0.5" />
        <span className="text-[10px] font-medium">Search</span>
      </Link>

      <Link
        href="/watchlist"
        className={`flex flex-col items-center p-2 transition-all duration-300 ${
          pathname === '/watchlist' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
        }`}
        style={pathname === '/watchlist' ? { color: theme.primary } : {}}
      >
        <ListVideo size={20} className="mb-0.5" />
        <span className="text-[10px] font-medium">Watchlist</span>
      </Link>

      <Link
        href="/login"
        className={`flex flex-col items-center p-2 transition-all duration-300 ${
          pathname.startsWith('/login') ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
        }`}
        style={pathname.startsWith('/login') ? { color: theme.primary } : {}}
      >
        <User size={20} className="mb-0.5" />
        <span className="text-[10px] font-medium">Profile</span>
      </Link>
    </nav>
  );
}
