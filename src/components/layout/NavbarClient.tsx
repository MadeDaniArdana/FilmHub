'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, LogOut, X, Sparkles } from 'lucide-react';
import { useMovieTheme } from '@/context/MovieThemeContext';

interface NavbarClientProps {
  user: any;
  signOutAction: () => Promise<void>;
}

export default function NavbarClient({ user, signOutAction }: NavbarClientProps) {
  const pathname = usePathname();
  const { theme } = useMovieTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-zinc-800/80 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          {/* Logo with Bebas Neue typography */}
          <Link
            href="/"
            className="font-netflix text-3xl md:text-4xl font-black tracking-tighter uppercase select-none transition-colors duration-500 flex items-center space-x-1.5"
            style={{ color: theme.primary }}
          >
            <span>FILMHUB</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-[15px] font-medium text-zinc-200">
            <Link
              href="/"
              className={`transition-colors duration-300 font-semibold ${
                pathname === '/' ? 'text-white' : 'hover:text-white'
              }`}
              style={pathname === '/' ? { color: theme.primary } : {}}
            >
              Home
            </Link>
            <Link
              href="/discover?type=movie"
              className={`transition-colors duration-300 ${
                pathname.includes('/discover') ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Movie
            </Link>
            <Link
              href="/discover?type=tv"
              className="hover:text-white transition-colors duration-300"
            >
              Drama
            </Link>
            {user && (
              <Link
                href="/watchlist"
                className={`transition-colors duration-300 ${
                  pathname === '/watchlist' ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                Watchlist
              </Link>
            )}
            <Link
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Help
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              className="text-zinc-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="text-zinc-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer hidden sm:block"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* User Account / Login */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/watchlist"
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase text-white shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.primary }}
                  title="My Profile"
                >
                  {user.email?.charAt(0) || 'U'}
                </Link>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    title="Sign Out"
                    className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 4px 14px -2px ${theme.glow}`,
                }}
              >
                Sign In
              </Link>
            )}

            {/* Custom Staggered Hamburger Icon from Mockup Spec */}
            <button
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-end justify-center space-y-1.5 w-8 h-8 group cursor-pointer"
            >
              <span
                className="w-4 h-[3px] rounded-full mr-1 group-hover:w-7 transition-all duration-300"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="w-7 h-[3px] bg-white rounded-full" />
              <span className="w-3.5 h-[3px] bg-white rounded-full mr-1.5 group-hover:w-7 transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-2xl flex flex-col p-8 pt-24 animate-fadeIn">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-8 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-6 text-xl font-bold flex flex-col">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition"
              style={{ color: theme.primary }}
            >
              Home
            </Link>
            <Link
              href="/discover?type=movie"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition"
            >
              Movies
            </Link>
            <Link
              href="/discover?type=tv"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition"
            >
              Drama / TV Shows
            </Link>
            <Link
              href="/watchlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition"
            >
              My Watchlist
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition"
            >
              Search
            </Link>
          </div>

          <div className="mt-auto pt-8 border-t border-zinc-800 text-xs text-zinc-500 flex items-center justify-between">
            <span>Theme: {theme.name || 'Adaptive'}</span>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
          </div>
        </div>
      )}
    </>
  );
}
