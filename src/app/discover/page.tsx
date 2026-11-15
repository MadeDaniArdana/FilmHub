import { discoverMovies, discoverTV, getGenres } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

interface DiscoverPageProps {
  searchParams: Promise<{ type?: string, genre?: string, page?: string }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const resolvedParams = await searchParams;
  const type = resolvedParams.type === 'tv' ? 'tv' : 'movie';
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  
  // Base filters
  const filters: Record<string, any> = {
    page,
    sort_by: 'popularity.desc',
  };

  // Fetch Discover data based on type
  const discoverData = type === 'tv' ? await discoverTV(filters) : await discoverMovies(filters);

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white relative z-10 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-800/90 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Explore {type === 'tv' ? 'Drama & Series' : 'Movies'}
            </h1>
            <p className="text-zinc-400 text-xs">Jelajahi perpustakaan tayangan lengkap kami.</p>
          </div>
          
          <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
            <Link
              href="/discover?type=movie"
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors ${
                type === 'movie' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Movies
            </Link>
            <Link
              href="/discover?type=tv"
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors ${
                type === 'tv' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Drama / TV
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
          {discoverData.results.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} index={idx} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          {page > 1 && (
            <Link
              href={`/discover?type=${type}&page=${page - 1}`}
              className="px-5 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="text-xs text-zinc-400">
            Page {page} of {Math.min(discoverData.total_pages, 500)}
          </span>
          {page < discoverData.total_pages && page < 500 && (
            <Link
              href={`/discover?type=${type}&page=${page + 1}`}
              className="px-5 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
