import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="hidden md:flex justify-between items-center px-8 h-20 w-full fixed top-0 z-[100] bg-[#111125]/60 backdrop-blur-xl shadow-[0px_20px_40px_rgba(0,0,0,0.4)] transition-colors duration-500 font-headline tracking-tight">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
          FilmHub
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-primary font-bold border-b-2 border-primary pb-1 hover:bg-white/10 transition-all duration-300 scale-95 active:scale-90">
            Browse
          </Link>
          <Link href="/discover?type=movie" className="text-on-surface-variant hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 active:scale-90 px-3 pb-1 rounded">
            Movies
          </Link>
          <Link href="/discover?type=tv" className="text-on-surface-variant hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 active:scale-90 px-3 pb-1 rounded">
            TV Shows
          </Link>
          {user && (
            <Link href="/watchlist" className="text-on-surface-variant hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 active:scale-90 px-3 pb-1 rounded">
              My List
            </Link>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link href="/search" className="p-2 text-on-surface-variant hover:text-white transition-colors scale-95 active:scale-90 hover:bg-white/10 rounded-full flex items-center justify-center">
          <Search size={20} />
        </Link>
        <button className="p-2 text-on-surface-variant hover:text-white transition-colors scale-95 active:scale-90 hover:bg-white/10 rounded-full flex items-center justify-center">
          <Bell size={20} />
        </button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/watchlist" className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden cursor-pointer hover:bg-white/10 transition-all shadow-md focus:ring-2 focus:ring-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white uppercase">{user.email?.charAt(0) || 'U'}</span>
            </Link>
            
            <form action={async () => {
              'use server';
              const sb = await createClient();
              await sb.auth.signOut();
            }}>
              <button title="Keluar" className="p-2 text-on-surface-variant hover:text-error transition-colors scale-95 active:scale-90 flex items-center justify-center">
                <LogOut size={20} />
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login" className="bg-primary text-white font-label font-bold px-5 py-2 rounded-lg hover:brightness-110 transition-all scale-95 active:scale-90">
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}
