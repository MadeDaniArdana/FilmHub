'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import AddToWatchlistButton from '@/components/movie/AddToWatchlistButton';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  index?: number;
}

export default function MovieCard({ movie, className = '', index = 0 }: MovieCardProps) {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, zIndex: 30 }}
      className={`group relative rounded-md md:rounded-lg overflow-hidden bg-surface-container shadow-md cursor-pointer aspect-[2/3] shrink-0 transform-origin-bottom transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${className}`}
    >
      <Link href={`/movie/${movie.id}`} className="block w-full h-full">
        <Image 
          src={getImageUrl(movie.poster_path, 'w500')} 
          alt={movie.title || "Movie Poster"} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
        />
        
        {/* Netflix style overlay: Darkens slightly on hover, shows title + play button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-headline font-bold text-white text-sm md:text-base leading-tight line-clamp-2 drop-shadow-md">
              {movie.title || movie.original_title}
            </h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-tertiary drop-shadow-md">
                <Star size={14} fill="currentColor" />
                <span className="font-label font-bold text-xs">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    router.push(`/movie/${movie.id}?trailer=true`);
                  }}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg relative z-20"
                  title="Play"
                >
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </button>
                <div className="relative z-20">
                  <AddToWatchlistButton 
                    movieId={movie.id} 
                    title={movie.title || movie.original_title} 
                    posterPath={movie.poster_path} 
                    iconOnly={true} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
