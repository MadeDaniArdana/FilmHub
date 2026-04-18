import { getTrending, getTrendingTV } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import Link from 'next/link';

interface TrendingPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  const resolvedParams = await searchParams;
  const type = resolvedParams.type === 'tv' ? 'tv' : 'movie';
  
  const trendingData = type === 'tv' ? await getTrendingTV('week') : await getTrending('week');

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24 min-h-screen relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-2">Trending This Week</h1>
          <p className="text-on-surface-variant font-label">Tontonan paling populer di seluruh dunia minggu ini.</p>
        </div>
        
        <div className="flex bg-surface-container rounded-lg p-1 border border-white/5">
          <Link href="/trending?type=movie" className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${type === 'movie' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
            Movies
          </Link>
          <Link href="/trending?type=tv" className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${type === 'tv' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
            TV Shows
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {trendingData.results.map((movie, idx) => (
          <MovieCard key={movie.id} movie={movie} index={idx} />
        ))}
      </div>
    </div>
  );
}
