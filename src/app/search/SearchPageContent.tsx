'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/components/movie/MovieCard';
import { searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types/tmdb';
import { Search, Popcorn } from 'lucide-react';

export default function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query !== initialQuery) {
        // Update URL without full navigation
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
          params.set('q', query);
        } else {
          params.delete('q');
        }
        router.push(`/search?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router, searchParams, initialQuery]);

  // Fetch logic
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const data = await searchMovies(debouncedQuery);
        setResults(data.results);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-6">Search Movies</h1>
        <div className="relative max-w-2xl mx-auto flex items-center">
          <Search className="absolute left-4 text-on-surface-variant" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, character, or genre..."
            className="w-full bg-surface-container-high border border-outline-variant rounded-full py-4 pl-12 pr-6 text-white placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg font-body"
            autoFocus
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : debouncedQuery ? (
        <div className="text-center text-on-surface-variant py-20 flex flex-col items-center">
          <Popcorn size={64} className="mb-4 text-on-surface-variant/50" />
          <h3 className="text-xl font-headline text-white mb-2">No results found</h3>
          <p>We couldn't find any movies matching "{debouncedQuery}"</p>
        </div>
      ) : (
        <div className="text-center text-on-surface-variant py-20 flex flex-col items-center">
          <Search size={64} className="mb-4 text-on-surface-variant/50" />
          <h3 className="text-xl font-headline text-white mb-2">Type something to explore</h3>
          <p className="max-w-md">Discover your next favorite movie from our database of over a million titles.</p>
        </div>
      )}
    </div>
  );
}
