import { discoverMovies, discoverTV, getGenres } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import Link from 'next/link';

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
  const { genres } = await getGenres(); // Ideally we should get TV genres for TV

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24 min-h-screen relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-2">
            Explore {type === 'tv' ? 'TV Shows' : 'Movies'}
          </h1>
          <p className="text-on-surface-variant font-label">Jelajahi perpustakaan tayangan lengkap kami.</p>
        </div>
        
        <div className="flex bg-surface-container rounded-lg p-1 border border-white/5">
          <Link href="/discover?type=movie" className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${type === 'movie' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
            Movies
          </Link>
          <Link href="/discover?type=tv" className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${type === 'tv' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
            TV Shows
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {discoverData.results.map((movie, idx) => (
          <MovieCard key={movie.id} movie={movie} index={idx} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        {page > 1 && (
          <Link href={`/discover?type=${type}&page=${page - 1}`} className="px-6 py-3 rounded-lg bg-surface-container font-label font-bold text-white hover:bg-white/10 transition-colors">
            Previous
          </Link>
        )}
        <span className="font-label text-on-surface-variant">Page {page} of {Math.min(discoverData.total_pages, 500)}</span>
        {page < discoverData.total_pages && page < 500 && (
          <Link href={`/discover?type=${type}&page=${page + 1}`} className="px-6 py-3 rounded-lg bg-surface-container font-label font-bold text-white hover:bg-white/10 transition-colors">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
