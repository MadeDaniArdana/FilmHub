'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import TrailerModal from './TrailerModal';
import { useSearchParams } from 'next/navigation';

interface TrailerButtonProps {
  videoId: string | null;
  className?: string;
}

export default function TrailerButton({ videoId, className }: TrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Automatically open trailer if URL has ?trailer=true
    if (searchParams.get('trailer') === 'true' && videoId) {
      setIsOpen(true);
    }
  }, [searchParams, videoId]);

  if (!videoId) {
    return (
      <button disabled className={`bg-gradient-to-br from-gray-600 to-gray-800 text-white/50 font-label font-bold px-8 py-3 rounded-lg flex items-center gap-2 cursor-not-allowed ${className || ''}`}>
        <Play size={20} fill="currentColor" />
        No Trailer
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`bg-gradient-to-br from-primary to-primary-container text-white font-label font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:brightness-110 shadow-[0_0_15px_rgba(255,178,183,0.3)] transition-all ${className || ''}`}
      >
        <Play size={20} fill="currentColor" />
        Watch Trailer
      </button>

      <TrailerModal 
        videoId={videoId} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
