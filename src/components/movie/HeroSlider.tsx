'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Info } from 'lucide-react';
import AddToWatchlistButton from '@/components/movie/AddToWatchlistButton';

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000); // 5 seconds autoplay
    
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden pt-20">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={getImageUrl(movies[currentIndex].backdrop_path, 'original')}
            alt={movies[currentIndex].title}
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-3 text-tertiary">
              <Star size={20} fill="currentColor" />
              <span className="font-headline font-bold text-lg">{movies[currentIndex].vote_average?.toFixed(1) || 'NR'}</span>
              <span className="text-sm font-label uppercase tracking-[0.05em] text-on-surface-variant ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                 {new Date(movies[currentIndex].release_date).getFullYear()} • {movies[currentIndex].adult ? '18+' : 'PG'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-white drop-shadow-2xl line-clamp-2">
              {movies[currentIndex].title || movies[currentIndex].original_title}
            </h1>
            
            <p className="text-lg md:text-xl text-on-surface/90 font-body leading-relaxed max-w-xl line-clamp-3">
              {movies[currentIndex].overview}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                href={`/movie/${movies[currentIndex].id}`}
                className="bg-gradient-to-br from-primary to-primary-container text-white font-label font-bold text-base px-8 py-4 rounded-lg flex items-center gap-2 hover:brightness-110 shadow-[0_0_15px_rgba(255,178,183,0.3)] transition-all duration-300"
              >
                <Info size={20} />
                View Details
              </Link>
              <AddToWatchlistButton 
                movieId={movies[currentIndex].id}
                title={movies[currentIndex].title || movies[currentIndex].original_title}
                posterPath={movies[currentIndex].poster_path}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? 'w-8 h-2 bg-primary' 
                : 'w-2 h-2 bg-on-surface-variant/50 hover:bg-on-surface-variant'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
