'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { useMovieTheme } from '@/context/MovieThemeContext';
import { Heart, Eye, Star, Play } from 'lucide-react';

export interface ExtendedMovieCardProps {
  movie: Movie | any;
  className?: string;
  index?: number;
  isSelected?: boolean;
  onSelect?: (movie: any) => void;
  multilineTitle?: [string, string];
}

export default function MovieCard({
  movie,
  className = '',
  index = 0,
  isSelected: externalSelected,
  onSelect,
  multilineTitle,
}: ExtendedMovieCardProps) {
  const router = useRouter();
  const { theme, activeMovie, selectMovie, likedMovies, watchedMovies, toggleLike, toggleWatched } = useMovieTheme();

  const movieId = movie.id;
  const title = movie.title || movie.original_title || 'Untitled';
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear().toString()
    : movie.year || '2024';
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : movie.rating || '7.5';

  const posterUrl = movie.poster || (movie.poster_path ? getImageUrl(movie.poster_path, 'w500') : '/placeholder.webp');
  const backdropUrl = movie.backdrop || (movie.backdrop_path ? getImageUrl(movie.backdrop_path, 'original') : posterUrl);

  const isSelected = externalSelected ?? (activeMovie?.id === movieId);
  const isLiked = likedMovies.has(movieId) || movie.liked;
  const isWatched = watchedMovies.has(movieId) || movie.watched;

  const handleClick = (e: React.MouseEvent) => {
    // Select movie and trigger dynamic color adaptation
    const moviePayload = {
      id: movieId,
      title,
      year,
      rating,
      poster: posterUrl,
      backdrop: backdropUrl,
      overview: movie.overview,
      genreIds: movie.genre_ids,
      multilineTitle: multilineTitle || movie.multilineTitle,
      trailerId: movie.trailerId,
    };

    if (onSelect) {
      onSelect(moviePayload);
    } else {
      selectMovie(moviePayload);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/movie/${movieId}?trailer=true`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer transition-all duration-500 transform-origin-bottom select-none ${
        isSelected ? 'scale-[1.03]' : 'hover:scale-[1.02]'
      } ${className}`}
    >
      {/* Poster Image with 2:3 Aspect Ratio and 12px rounded-xl geometry */}
      <div
        className={`relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 shadow-md transition-all duration-500 ${
          isSelected
            ? 'ring-2 ring-offset-2 ring-offset-[#050505]'
            : 'hover:ring-1 hover:ring-white/30'
        }`}
        style={
          isSelected
            ? {
                borderColor: theme.primary,
                boxShadow: `0 10px 30px -5px ${theme.glow}`,
              }
            : {}
        }
      >
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Ambient bottom shadow gradient on poster */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

        {/* Active Badge */}
        {isSelected && (
          <div
            className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-md animate-pulse z-10"
            style={{ backgroundColor: theme.primary }}
          >
            Active
          </div>
        )}

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 z-10">
          <button
            onClick={handlePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 transform scale-75 group-hover:scale-100 hover:scale-110 active:scale-90"
            style={{ backgroundColor: theme.primary }}
            title="Watch Trailer"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* Card Metadata Footer: Row 1 Bold Title */}
      {multilineTitle ? (
        <h3
          className="font-bold text-[13px] leading-tight transition-colors duration-300 line-clamp-2"
          style={{
            color: isSelected ? theme.primary : '#ffffff',
          }}
        >
          {multilineTitle[0]}
          <br />
          {multilineTitle[1]}
        </h3>
      ) : (
        <h3
          className="font-bold text-[13px] truncate transition-colors duration-300"
          style={{
            color: isSelected ? theme.primary : '#ffffff',
          }}
          title={title}
        >
          {title}
        </h3>
      )}

      {/* Card Metadata Footer: Row 2 Year & 3-Icon Cluster */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5">
        <span>{year}</span>
        <div className="flex items-center space-x-2">
          {/* Heart (Like / Watchlist) */}
          <button
            aria-label="Favorite"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(movieId);
            }}
            className="cursor-pointer hover:scale-125 transition-transform"
            title={isLiked ? 'Favorited' : 'Add to Favorites'}
          >
            <Heart
              className={`w-3 h-3 transition-colors ${
                isLiked
                  ? 'fill-[#DC2626] text-[#DC2626]'
                  : 'fill-zinc-400 text-zinc-400 hover:text-white'
              }`}
            />
          </button>

          {/* Eye (Watched) */}
          <button
            aria-label="Watched"
            onClick={(e) => {
              e.stopPropagation();
              toggleWatched(movieId);
            }}
            className="cursor-pointer hover:scale-125 transition-transform"
            title={isWatched ? 'Watched' : 'Mark as Watched'}
          >
            <Eye
              className={`w-3 h-3 transition-colors ${
                isWatched
                  ? 'text-[#FBBF24]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            />
          </button>

          {/* Star + Score */}
          <div className="flex items-center space-x-1">
            <Star className="w-2.5 h-2.5 fill-[#FBBF24] text-[#FBBF24]" />
            <span className="text-zinc-300 font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
