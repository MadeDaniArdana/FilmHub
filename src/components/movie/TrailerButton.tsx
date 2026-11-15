'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import TrailerModal from './TrailerModal';
import { useSearchParams } from 'next/navigation';
import { useMovieTheme } from '@/context/MovieThemeContext';

interface TrailerButtonProps {
  videoId: string | null;
  className?: string;
}

export default function TrailerButton({ videoId, className }: TrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const { theme } = useMovieTheme();

  useEffect(() => {
    if (searchParams.get('trailer') === 'true' && videoId) {
      setIsOpen(true);
    }
  }, [searchParams, videoId]);

  if (!videoId) {
    return (
      <button disabled className={`bg-zinc-800 text-zinc-500 text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 cursor-not-allowed ${className || ''}`}>
        <Play size={14} fill="currentColor" />
        <span>NO TRAILER</span>
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`text-white text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer ${className || ''}`}
        style={{
          backgroundColor: theme.primary,
          boxShadow: `0 8px 24px -4px ${theme.glow}`,
        }}
      >
        <Play size={14} fill="white" className="text-white" />
        <span>WATCH TRAILER</span>
      </button>

      <TrailerModal 
        videoId={videoId} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
