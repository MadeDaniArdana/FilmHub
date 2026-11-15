'use client';

import React, { useState } from 'react';
import HeroSection from './HeroSection';
import TrendsNowSection from './TrendsNowSection';
import MoviesGridSection from './MoviesGridSection';
import Footer from '@/components/layout/Footer';
import NetflixStreamingLanding from '@/components/NetflixStreamingLanding';
import { Movie } from '@/types/tmdb';
import { useMovieTheme } from '@/context/MovieThemeContext';
import { Sparkles, Clapperboard, Layers } from 'lucide-react';

interface HomePageClientProps {
  heroMovies: Movie[];
  trendingDay: Movie[];
  popular: Movie[];
  topRated: Movie[];
  nowPlaying: Movie[];
  action: Movie[];
  horror: Movie[];
  sciFi: Movie[];
}

export default function HomePageClient({
  heroMovies,
  trendingDay,
  popular,
  topRated,
  nowPlaying,
  action,
  horror,
  sciFi,
}: HomePageClientProps) {
  const { theme } = useMovieTheme();
  const [viewMode, setViewMode] = useState<'live' | 'mockup'>('live');

  return (
    <div
      className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden relative theme-transition"
      style={
        {
          '--accent-primary': theme.primary,
          '--accent-glow': theme.glow,
        } as React.CSSProperties
      }
    >
      {/* ================= DYNAMIC AMBIENT GLOW OVERLAYS ================= */}
      {/* Left middle glow */}
      <div
        className="pointer-events-none fixed top-[52%] -left-32 w-[440px] h-[440px] rounded-full blur-[140px] z-0 transition-all duration-700 opacity-90"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        }}
      />
      {/* Bottom right glow */}
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-[480px] h-[380px] rounded-full blur-[150px] z-0 transition-all duration-700 opacity-90"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Mode Switcher & Active Theme Indicator */}
      <div className="fixed top-24 right-6 z-40 hidden md:flex items-center space-x-3">
        {/* Active Theme Color Swatch */}
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800/80 shadow-2xl transition-all duration-500">
          <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
          <span className="text-[11px] font-medium text-zinc-300">Theme:</span>
          <span
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: theme.primary }}
          >
            {theme.name || 'Adaptive'}
          </span>
          <div
            className="w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-500"
            style={{ backgroundColor: theme.primary }}
          />
        </div>

        {/* View Switcher: Live TMDB vs Mockup Slice */}
        <div className="flex items-center bg-black/70 backdrop-blur-md p-1 rounded-full border border-zinc-800/80 shadow-2xl">
          <button
            onClick={() => setViewMode('live')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'live'
                ? 'text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
            style={viewMode === 'live' ? { backgroundColor: theme.primary } : {}}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Live TMDB</span>
          </button>
          <button
            onClick={() => setViewMode('mockup')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'mockup'
                ? 'text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
            style={viewMode === 'mockup' ? { backgroundColor: theme.primary } : {}}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mockup Slice</span>
          </button>
        </div>
      </div>

      {viewMode === 'mockup' ? (
        /* Standalone Mockup Slice as specified in Prompt */
        <NetflixStreamingLanding />
      ) : (
        /* Live TMDB Experience with Identical Layout & Adaptive Colors */
        <>
          {/* Hero Section */}
          <HeroSection movies={heroMovies} />

          {/* Section 1: Trends Now */}
          <TrendsNowSection
            movies={trendingDay}
            popularMovies={popular}
            topRatedMovies={topRated}
            recentMovies={nowPlaying}
          />

          {/* Section 2: Movies */}
          <MoviesGridSection
            movies={nowPlaying.length > 0 ? nowPlaying : popular}
            seriesList={popular}
          />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
