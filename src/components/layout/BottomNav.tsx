'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ListVideo, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full h-20 bg-surface/80 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around px-2 pb-2">
      <Link href="/" className={`flex flex-col items-center p-2 transition-all ${pathname === '/' ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}>
        <Home size={24} className="mb-1" />
        <span className="text-[10px] font-label font-medium">Home</span>
      </Link>
      
      <Link href="/search" className={`flex flex-col items-center p-2 transition-all ${pathname === '/search' ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}>
        <Search size={24} className="mb-1" />
        <span className="text-[10px] font-label font-medium">Search</span>
      </Link>
      
      <Link href="/watchlist" className={`flex flex-col items-center p-2 transition-all ${pathname === '/watchlist' ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}>
        <ListVideo size={24} className="mb-1" />
        <span className="text-[10px] font-label font-medium">Watchlist</span>
      </Link>

      <Link href="/login" className={`flex flex-col items-center p-2 transition-all ${pathname.startsWith('/login') ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}>
        <User size={24} className="mb-1" />
        <span className="text-[10px] font-label font-medium">Profile</span>
      </Link>
    </nav>
  );
}
