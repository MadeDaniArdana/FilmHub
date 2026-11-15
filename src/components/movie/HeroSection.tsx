'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Plus, Star, Check } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { useMovieTheme, MoviePayload } from '@/context/MovieThemeContext';
import TrailerModal from './TrailerModal';

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const router = useRouter();
  const { theme, activeMovie, selectMovie, likedMovies, toggleLike } = useMovieTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeTrailerId, setActiveTrailerId] = useState<string | null>(null);

  // Initialize with the first movie if no activeMovie
  useEffect(() => {
    if (movies && movies.length > 0 && !activeMovie) {
      const first = movies[0];
      selectMovie({
        id: first.id,
        title: first.title || first.original_title,
        year: new Date(first.release_date).getFullYear().toString(),
        rating: first.vote_average ? first.vote_average.toFixed(1) : '8.8',
        poster: getImageUrl(first.poster_path, 'w500'),
        backdrop: getImageUrl(first.backdrop_path, 'original'),
        overview: first.overview,
        genreIds: first.genre_ids,
      });
    }
  }, [movies, activeMovie, selectMovie]);

  // Current display movie
  const currentMovie: MoviePayload | null = activeMovie || (movies && movies.length > 0 ? {
    id: movies[currentIndex].id,
    title: movies[currentIndex].title,
    year: new Date(movies[currentIndex].release_date).getFullYear().toString(),
    rating: movies[currentIndex].vote_average?.toFixed(1) || '8.8',
    poster: getImageUrl(movies[currentIndex].poster_path, 'w500'),
    backdrop: getImageUrl(movies[currentIndex].backdrop_path, 'original'),
    overview: movies[currentIndex].overview,
  } : null);

  if (!currentMovie) return null;

  const isLiked = likedMovies.has(currentMovie.id);

  const handleWatch = () => {
    if (currentMovie.trailerId) {
      setActiveTrailerId(currentMovie.trailerId);
      setTrailerOpen(true);
    } else {
      router.push(`/movie/${currentMovie.id}?trailer=true`);
    }
  };

  const handlePaginationClick = (idx: number) => {
    if (movies && movies[idx]) {
      const target = movies[idx];
      setCurrentIndex(idx);
      selectMovie({
        id: target.id,
        title: target.title || target.original_title,
        year: new Date(target.release_date).getFullYear().toString(),
        rating: target.vote_average ? target.vote_average.toFixed(1) : '8.8',
        poster: getImageUrl(target.poster_path, 'w500'),
        backdrop: getImageUrl(target.backdrop_path, 'original'),
        overview: target.overview,
        genreIds: target.genre_ids,
      });
    }
  };

  return (
    <>
      <section className="relative w-full h-[640px] overflow-hidden">
        {/* Background Hero Image - Right Biased with Smooth Crossfade */}
        <div
          key={String(currentMovie.id)}
          className="absolute inset-0 bg-cover bg-right-top bg-no-repeat scale-105 transition-all duration-700 ease-out animate-fadeIn"
          style={{
            backgroundImage: `url('${currentMovie.backdrop || currentMovie.poster}')`,
            filter: 'contrast(1.1) brightness(0.75) saturate(0.85)',
          }}
        />

        {/* Three Overlapping Vignette Gradients from Spec */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent w-[75%] transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-transparent h-32" />

        {/* Dynamic Subtle Color Aura behind hero */}
        <div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[130px] opacity-40 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Hero Left Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 h-full flex flex-col justify-center">
          <div className="max-w-md space-y-2.5 pt-12 md:pt-6">
            {/* Season / Metadata Badge */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300">
              {currentMovie.seasonInfo || 'SEASON 1 • 16 EPISODE'}
            </p>

            {/* Rating Cluster */}
            <div className="flex items-center space-x-2 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">{currentMovie.rating}</span>
              <span className="text-zinc-400 font-medium">
                {currentMovie.metaInfo || `${currentMovie.year} · Exciting story · 2 season`}
              </span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold tracking-wide text-white leading-tight drop-shadow-md line-clamp-2">
              {currentMovie.title}
            </h1>

            {/* Synopsis */}
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed pt-1 max-w-[340px] line-clamp-3">
              {currentMovie.overview ||
                'Series adapted from the webcomic entitled Out of the World by writer Jo Geum-san.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 pt-3">
              <button
                onClick={handleWatch}
                className="flex items-center space-x-2 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-500 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 24px -4px ${theme.glow}`,
                }}
              >
                <Play className="w-3 h-3 fill-white text-white" />
                <span>WATCH</span>
              </button>

              <button
                onClick={() => toggleLike(currentMovie.id)}
                className="flex items-center space-x-1.5 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-500 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 24px -4px ${theme.glow}`,
                }}
              >
                {isLiked ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>IN LIST</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ADD LIST</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero Pagination Indicators (Dashes) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            {[0, 1, 2].map((idx) => {
              const isActive = (currentIndex % 3) === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handlePaginationClick(idx)}
                  className={`cursor-pointer transition-all duration-500 ${
                    isActive
                      ? 'w-6 h-[3px] rounded-full shadow-sm'
                      : 'w-5 h-[2px] bg-zinc-600 rounded-full hover:bg-zinc-400'
                  }`}
                  style={isActive ? { backgroundColor: theme.primary } : {}}
                  aria-label={`Slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Trailer Modal if active */}
      {trailerOpen && activeTrailerId && (
        <TrailerModal
          videoId={activeTrailerId}
          isOpen={trailerOpen}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
}
