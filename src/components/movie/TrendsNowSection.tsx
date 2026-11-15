'use client';

import React, { useState } from 'react';
import { TrendingUp, Flame, Star, Plus, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import MovieCard from './MovieCard';
import { useMovieTheme } from '@/context/MovieThemeContext';

interface TrendsNowSectionProps {
  movies: Movie[];
  popularMovies?: Movie[];
  topRatedMovies?: Movie[];
  recentMovies?: Movie[];
}

const DEFAULT_GENRES = [
  'Action',
  'Adventure',
  'Biography',
  'Crime',
  'Comedy',
  'Documentary',
  'Drama',
];

export default function TrendsNowSection({
  movies,
  popularMovies = [],
  topRatedMovies = [],
  recentMovies = [],
}: TrendsNowSectionProps) {
  const { theme } = useMovieTheme();
  const [activeTab, setActiveTab] = useState<'Trends Now' | 'Popular' | 'Premium' | 'Recently Added'>('Trends Now');
  const [activeGenres, setActiveGenres] = useState<string[]>(['Action', 'Crime', 'Drama']);

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Select which movie list to display based on active tab
  const getDisplayMovies = () => {
    switch (activeTab) {
      case 'Popular':
        return popularMovies.length > 0 ? popularMovies : movies;
      case 'Premium':
        return topRatedMovies.length > 0 ? topRatedMovies : movies;
      case 'Recently Added':
        return recentMovies.length > 0 ? recentMovies : movies;
      case 'Trends Now':
      default:
        return movies;
    }
  };

  const displayMovies = getDisplayMovies().slice(0, 7);

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-8 pt-4">
      {/* Category Header Tabs with 1px border and 5px circular active indicator dot */}
      <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3.5 relative">
        <button
          onClick={() => setActiveTab('Trends Now')}
          className={`relative flex items-center space-x-3 font-bold text-base transition-colors cursor-pointer ${
            activeTab === 'Trends Now' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <TrendingUp className="w-5 h-5 stroke-[2.2]" />
          <span>Trends Now</span>
          {activeTab === 'Trends Now' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-sm"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 10px ${theme.primary}`,
              }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('Popular')}
          className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'Popular' ? 'text-white font-bold' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Flame className="w-4 h-4 fill-current" />
          <span>Popular</span>
          {activeTab === 'Popular' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('Premium')}
          className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'Premium' ? 'text-white font-bold' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Star className="w-4 h-4 fill-current" />
          <span>Premium</span>
          {activeTab === 'Premium' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('Recently Added')}
          className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'Recently Added'
              ? 'text-white font-bold'
              : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Recently Added</span>
          {activeTab === 'Recently Added' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
          )}
        </button>
      </div>

      {/* Genre Pills Row */}
      <div className="flex items-center justify-between py-6 overflow-x-auto no-scrollbar gap-3">
        {DEFAULT_GENRES.map((genre) => {
          const isActive = activeGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`text-sm font-medium px-5 py-1 rounded-full transition-all duration-500 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-white font-semibold shadow-md'
                  : 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: theme.primary,
                      boxShadow: `0 4px 14px -2px ${theme.glow}`,
                    }
                  : {}
              }
            >
              {genre}
            </button>
          );
        })}
        <button
          aria-label="More genres"
          className="text-zinc-500 hover:text-white pl-2 cursor-pointer transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Edge-Bleeding Poster Row: Full-bleed horizontal overflow (-mx-24 px-4) */}
      <div className="relative -mx-8 md:-mx-24 px-4 overflow-x-auto no-scrollbar">
        <div className="grid grid-cols-7 gap-5 items-start min-w-[900px] md:min-w-0">
          {displayMovies.map((movie, idx) => {
            const isEdge = idx === 0 || idx === displayMovies.length - 1;
            return (
              <div
                key={movie.id}
                className={`transition-opacity duration-300 ${
                  isEdge ? 'opacity-85 hover:opacity-100' : ''
                }`}
              >
                <MovieCard movie={movie} index={idx} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
