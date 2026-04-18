'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/tmdb';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterRowProps {
  genres: Genre[];
  initialGenreId: number;
  initialMovies: Movie[];
}

export default function GenreFilterRow({ genres, initialGenreId, initialMovies }: GenreFilterRowProps) {
  const [activeGenreId, setActiveGenreId] = useState(initialGenreId);
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const fetchGenreMovies = useCallback(async (genreId: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        with_genres: String(genreId),
        sort_by: 'popularity.desc',
        'vote_count.gte': '100',
        page: '1',
      });
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&${params.toString()}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Failed to fetch genre movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGenreClick = (genreId: number) => {
    if (genreId === activeGenreId) return;
    setActiveGenreId(genreId);
    fetchGenreMovies(genreId);
  };

  return (
    <section className="relative pt-8 pb-4">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-5 px-6 md:px-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight">
          Browse by Genre
        </h2>
        <span className="text-sm text-on-surface-variant font-label">
          {genres.find(g => g.id === activeGenreId)?.name}
        </span>
      </div>

      {/* Genre Tabs */}
      <div
        ref={tabsRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
      >
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            whileTap={{ scale: 0.95 }}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-label font-semibold transition-all duration-300 border ${
              activeGenreId === genre.id
                ? 'bg-primary text-white border-primary shadow-[0_0_12px_rgba(255,178,183,0.35)]'
                : 'bg-surface-container text-on-surface-variant border-white/10 hover:border-primary/50 hover:text-white'
            }`}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>

      {/* Movie Scroll Row */}
      <div className="group/row relative mt-2">
        {/* Nav Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 w-12 md:w-16 z-40 bg-black/40 text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/60 transition-all flex items-center justify-center backdrop-blur-[2px]"
          aria-label="Scroll left"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 w-12 md:w-16 z-40 bg-black/40 text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/60 transition-all flex items-center justify-center backdrop-blur-[2px]"
          aria-label="Scroll right"
        >
          <ChevronRight size={36} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x px-6 md:px-12 pb-8 pt-2 min-h-[260px]"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              // Skeleton placeholders
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 md:gap-4"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[140px] md:w-[180px] lg:w-[220px] shrink-0 aspect-[2/3] rounded-md md:rounded-lg bg-surface-container animate-pulse"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeGenreId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex gap-3 md:gap-4"
              >
                {movies.map((movie, index) => (
                  <div key={movie.id} className="snap-start w-[140px] md:w-[180px] lg:w-[220px] shrink-0">
                    <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
