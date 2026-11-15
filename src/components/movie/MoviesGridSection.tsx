'use client';

import React, { useState, useMemo } from 'react';
import { Film, Tv, Check, Search, ChevronRight, ChevronLeft, ChevronDown, Star } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import MovieCard from './MovieCard';
import { useMovieTheme } from '@/context/MovieThemeContext';
import Link from 'next/link';

interface MoviesGridSectionProps {
  movies: Movie[];
  seriesList?: Movie[];
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

export default function MoviesGridSection({ movies, seriesList = [] }: MoviesGridSectionProps) {
  const { theme, activeMovie } = useMovieTheme();
  const [activeTab, setActiveTab] = useState<'Movies' | 'Series' | 'Original Series' | 'Search'>('Movies');
  const [activeGenres, setActiveGenres] = useState<string[]>(['Action', 'Crime', 'Drama']);
  const [sortBy, setSortBy] = useState<'Latest' | 'Year' | 'A-z'>('Latest');
  const [pageIndex, setPageIndex] = useState(0);

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Base list depending on tab
  const baseList = activeTab === 'Series' || activeTab === 'Original Series'
    ? (seriesList.length > 0 ? seriesList : movies)
    : movies;

  // Sorting
  const sortedMovies = useMemo(() => {
    const list = [...baseList];
    if (sortBy === 'Year') {
      return list.sort((a, b) => {
        const yearA = new Date(a.release_date || '2000').getFullYear();
        const yearB = new Date(b.release_date || '2000').getFullYear();
        return yearB - yearA;
      });
    }
    if (sortBy === 'A-z') {
      return list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    // Latest / Popular default
    return list;
  }, [baseList, sortBy]);

  // Pagination (5 items per view on desktop)
  const pageSize = 5;
  const totalPages = Math.ceil(sortedMovies.length / pageSize) || 1;
  const currentChunk = sortedMovies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  // Current active rating score for the progress bar
  const currentRating = activeMovie?.rating ? parseFloat(activeMovie.rating) : 6.3;

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-8 pt-12">
      {/* Category Header Tabs with 1px border and 5px circular active indicator dot */}
      <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3.5 relative">
        <button
          onClick={() => setActiveTab('Movies')}
          className={`relative flex items-center space-x-3 font-bold text-base transition-colors cursor-pointer ${
            activeTab === 'Movies' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Film className="w-5 h-5" />
          <span>Movies</span>
          {activeTab === 'Movies' && (
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
          onClick={() => setActiveTab('Series')}
          className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'Series' ? 'text-white font-bold' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Series</span>
          {activeTab === 'Series' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('Original Series')}
          className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'Original Series' ? 'text-white font-bold' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Original Series</span>
          {activeTab === 'Original Series' && (
            <span
              className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
          )}
        </button>

        <Link
          href="/search"
          className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-400 text-xs sm:text-sm font-medium transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </Link>
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

      {/* Sub-Filters & Rating Slider Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-7">
        <div className="flex items-center space-x-3 text-xs">
          <span className="text-zinc-300 font-medium pr-1">Sort by:</span>
          <button
            onClick={() => setSortBy('Latest')}
            className={`font-semibold px-4 py-1 rounded-full text-[11px] transition-all duration-500 cursor-pointer shadow-sm ${
              sortBy === 'Latest' ? 'text-white' : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700'
            }`}
            style={sortBy === 'Latest' ? { backgroundColor: theme.primary } : {}}
          >
            Latest
          </button>
          <button
            onClick={() => setSortBy('Year')}
            className={`px-3.5 py-1 rounded-full text-[11px] flex items-center space-x-1.5 transition cursor-pointer ${
              sortBy === 'Year' ? 'text-white font-semibold' : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700'
            }`}
            style={sortBy === 'Year' ? { backgroundColor: theme.primary } : {}}
          >
            <span>Year</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
          <button
            onClick={() => setSortBy('A-z')}
            className={`px-3.5 py-1 rounded-full text-[11px] flex items-center space-x-1.5 transition cursor-pointer ${
              sortBy === 'A-z' ? 'text-white font-semibold' : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700'
            }`}
            style={sortBy === 'A-z' ? { backgroundColor: theme.primary } : {}}
          >
            <span>A-z</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

        {/* Rating Progress Bar */}
        <div className="flex items-center space-x-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <div className="w-36 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(10, (currentRating / 10) * 100))}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>
          <span className="text-xs font-bold text-white">{currentRating.toFixed(1)}</span>
        </div>
      </div>

      {/* 5-Column Movie Grid flanked by Circular White Pagination Buttons */}
      <div className="relative flex items-center">
        {/* Left Circular Arrow */}
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute -left-7 top-[38%] -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer hover:scale-110 active:scale-95"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* 5-Column Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
          {currentChunk.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} index={idx} />
          ))}
        </div>

        {/* Right Circular Arrow */}
        <button
          aria-label="Next"
          onClick={handleNext}
          className="absolute -right-7 top-[38%] -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer hover:scale-110 active:scale-95"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
