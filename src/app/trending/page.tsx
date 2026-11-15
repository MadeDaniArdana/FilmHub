import { getTrending, getTrendingTV } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

interface TrendingPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  const resolvedParams = await searchParams;
  const type = resolvedParams.type === 'tv' ? 'tv' : 'movie';
  
  const trendingData = type === 'tv' ? await getTrendingTV('week') : await getTrending('week');

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white relative z-10 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-800/90 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Trending This Week
            </h1>
            <p className="text-zinc-400 text-xs">Tontonan paling populer di seluruh dunia minggu ini.</p>
          </div>
          
          <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
            <Link
              href="/trending?type=movie"
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors ${
                type === 'movie' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Movies
            </Link>
            <Link
              href="/trending?type=tv"
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors ${
                type === 'tv' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Drama / TV
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
          {trendingData.results.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} index={idx} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
