'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/components/movie/MovieCard';
import { searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types/tmdb';
import { Search, Film } from 'lucide-react';
import { useMovieTheme } from '@/context/MovieThemeContext';

export default function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { theme } = useMovieTheme();
  
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query !== initialQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
          params.set('q', query);
        } else {
          params.delete('q');
        }
        router.push(`/search?${params.toString()}`);
      }
    }, 400);

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
        setResults(data.results || []);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto px-8 pt-32 pb-24 relative z-10 min-h-screen">
      {/* Ambient Glows */}
      <div
        className="pointer-events-none fixed top-[30%] -left-32 w-96 h-96 rounded-full blur-[140px] z-0 opacity-80"
        style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-96 h-96 rounded-full blur-[140px] z-0 opacity-80"
        style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
      />

      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Search Titles
        </h1>
        <p className="text-zinc-400 text-sm mb-8">
          Find your favorite movies, dramas, series, and genres in high definition.
        </p>

        <div className="relative flex items-center">
          <Search className="absolute left-5 text-zinc-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, keyword, or character..."
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full py-3.5 pl-12 pr-6 text-white placeholder-zinc-500 focus:outline-none transition-all text-sm shadow-xl"
            style={{
              borderColor: query ? theme.primary : undefined,
              boxShadow: query ? `0 0 20px -5px ${theme.glow}` : undefined,
            }}
            autoFocus
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: theme.primary, borderTopColor: 'transparent' }}
          />
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-xs text-zinc-400 mb-6 font-medium">
            Found <span className="text-white font-bold">{results.length}</span> titles for "{debouncedQuery}"
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : debouncedQuery ? (
        <div className="text-center text-zinc-400 py-20 flex flex-col items-center">
          <Film size={48} className="mb-4 text-zinc-600" />
          <h3 className="text-lg font-bold text-white mb-1">No titles found</h3>
          <p className="text-xs text-zinc-500">We couldn't find any results for "{debouncedQuery}". Try another keyword.</p>
        </div>
      ) : (
        <div className="text-center text-zinc-400 py-20 flex flex-col items-center">
          <Search size={48} className="mb-4 text-zinc-600" />
          <h3 className="text-lg font-bold text-white mb-1">Search FilmHub</h3>
          <p className="text-xs text-zinc-500 max-w-sm">Enter a title to discover trending blockbusters, classic cinema, and hit drama series.</p>
        </div>
      )}
    </div>
  );
}
