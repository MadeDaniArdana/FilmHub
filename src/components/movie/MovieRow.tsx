'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export default function MovieRow({ title, movies, viewAllLink }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-8 pb-4">
      <div className="flex justify-between items-end mb-4 px-6 md:px-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm md:text-base font-label font-medium text-primary hover:text-primary-foreground transition-colors group flex items-center">
            Explore All 
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="group/row relative">
        {/* Navigation Buttons */}
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
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x px-6 md:px-12 pb-8 pt-4"
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="snap-start w-[140px] md:w-[180px] lg:w-[220px] shrink-0">
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
