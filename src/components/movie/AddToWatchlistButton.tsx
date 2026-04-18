'use client';

import { useState } from 'react';
import { addToWatchlist } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Plus, Hourglass } from 'lucide-react';

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
  const router = useRouter();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // prevent triggering parent Links
    
    setLoading(true);
    const result = await addToWatchlist(movieId, title, posterPath);
    setLoading(false);

    if (result.error) {
      if (result.error.includes('harus login')) {
        router.push('/login');
      } else {
        alert(result.error); // Fallback error display
      }
    } else {
      // Success feedback (can be a toast in the future)
      console.log('Added to watchlist');
    }
  };

  if (iconOnly) {
    return (
      <button 
        onClick={handleAdd}
        disabled={loading}
        className={`w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/50 bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm disabled:opacity-50 ${className}`}
        title="Add to Watchlist"
      >
        {loading ? <Hourglass size={14} className="animate-spin" /> : <Plus size={14} />}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      disabled={loading}
      className={`bg-surface-variant text-primary font-label font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-surface-bright transition-all shadow-lg border border-primary/20 disabled:opacity-50 ${className}`}
    >
      {loading ? <Hourglass size={20} className="animate-spin" /> : <Plus size={20} />}
      Add to Watchlist
    </button>
  );
}
