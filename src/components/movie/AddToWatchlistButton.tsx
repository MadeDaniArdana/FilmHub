'use client';

import { useState } from 'react';
import { addToWatchlist } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Plus, Hourglass, Check } from 'lucide-react';
import { useMovieTheme } from '@/context/MovieThemeContext';

interface AddToWatchlistButtonProps {
  movieId: number;
  title: string;
  posterPath: string | null;
  className?: string;
  iconOnly?: boolean;
}

export default function AddToWatchlistButton({ 
  movieId, 
  title, 
  posterPath, 
  className = '',
  iconOnly = false
}: AddToWatchlistButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { theme, toggleLike, likedMovies } = useMovieTheme();
  const router = useRouter();

  const isLiked = isAdded || likedMovies.has(movieId);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleLike(movieId);
    setLoading(true);
    const result = await addToWatchlist(movieId, title, posterPath);
    setLoading(false);

    if (result.error) {
      if (result.error.includes('harus login')) {
        router.push('/login');
      }
    } else {
      setIsAdded(true);
    }
  };

  if (iconOnly) {
    return (
      <button 
        onClick={handleAdd}
        disabled={loading}
        className={`w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all backdrop-blur-sm border border-white/20 disabled:opacity-50 cursor-pointer ${className}`}
        title={isLiked ? "In Watchlist" : "Add to Watchlist"}
        style={isLiked ? { backgroundColor: theme.primary, borderColor: theme.primary } : {}}
      >
        {loading ? (
          <Hourglass size={12} className="animate-spin" />
        ) : isLiked ? (
          <Check size={12} className="stroke-[3]" />
        ) : (
          <Plus size={12} className="stroke-[2.5]" />
        )}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      disabled={loading}
      className={`text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer ${className}`}
      style={{
        backgroundColor: theme.primary,
        boxShadow: `0 8px 24px -4px ${theme.glow}`,
      }}
    >
      {loading ? (
        <Hourglass size={14} className="animate-spin" />
      ) : isLiked ? (
        <Check size={14} className="stroke-[3]" />
      ) : (
        <Plus size={14} className="stroke-[2.5]" />
      )}
      <span>{isLiked ? 'IN WATCHLIST' : 'ADD LIST'}</span>
    </button>
  );
}
