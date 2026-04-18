'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TrailerModalProps {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({ videoId, isOpen, onClose }: TrailerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!mounted || !isOpen || !videoId) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop — covers everything including navbar */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal — centered in remaining space below navbar */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 z-10 mt-16">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-white/10 animate-in fade-in zoom-in-95 duration-300">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md shadow-lg"
          >
            <X size={20} />
          </button>
          
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Movie Trailer"
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
