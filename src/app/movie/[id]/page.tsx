import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetail, getMovieCredits, getMovieRecommendations, getImageUrl, getMovieVideos } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import AddToWatchlistButton from '@/components/movie/AddToWatchlistButton';
import TrailerButton from '@/components/movie/TrailerButton';
import Footer from '@/components/layout/Footer';
import { Star, Sparkles } from 'lucide-react';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Fetch details, credits, recommendations, and videos in parallel
  const [movie, credits, recommendations, videosData] = await Promise.all([
    getMovieDetail(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
    getMovieVideos(id)
  ]);

  const trailer = videosData.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
  const videoId = trailer ? trailer.key : (videosData.results.length > 0 && videosData.results[0].site === 'YouTube' ? videosData.results[0].key : null);

  const releaseYear = new Date(movie.release_date).getFullYear();
  const formatRuntime = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  const topCast = credits.cast.slice(0, 10);

  return (
    <div className="w-full bg-[#050505] text-white min-h-screen relative overflow-x-hidden selection:bg-[#E50914] selection:text-white pb-16">
      {/* Ambient Red Glows */}
      <div className="pointer-events-none fixed top-[40%] -left-32 w-96 h-96 rounded-full bg-red-900/20 blur-[130px] z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[420px] h-[320px] rounded-full bg-red-900/20 blur-[140px] z-0" />

      {/* Backdrop Section with 3-Directional Vignette Mask */}
      <section className="relative w-full h-[620px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            priority
            className="w-full h-full object-cover object-right-top scale-105"
          />
          {/* Overlapping Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent w-[75%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-transparent h-32" />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 -mt-64 md:-mt-80 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Poster Card (2:3 aspect ratio, rounded-xl) */}
        <div className="shrink-0 w-52 md:w-72 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 relative z-20 aspect-[2/3] bg-zinc-900">
          <Image 
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info Column */}
        <div className="flex-grow pt-2 md:pt-14 text-center md:text-left space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            {movie.status || 'RELEASED'} • {formatRuntime(movie.runtime)}
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-zinc-400 italic text-base">"{movie.tagline}"</p>
          )}

          {/* Rating & Metadata Cluster */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-zinc-300">
            <span className="flex items-center space-x-1.5 font-bold text-white bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-full">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{movie.vote_average?.toFixed(1) || 'NR'}</span>
            </span>
            <span className="text-zinc-500">•</span>
            <span>{releaseYear}</span>
            <span className="text-zinc-500">•</span>
            <div className="flex flex-wrap gap-1.5">
              {movie.genres.map(g => (
                <span key={g.id} className="bg-zinc-800/90 text-zinc-300 px-3 py-0.5 rounded-full text-[11px] font-medium">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-3">
            <TrailerButton videoId={videoId} />
            <AddToWatchlistButton 
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          </div>

          {/* Overview */}
          <div className="pt-4 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Overview</h3>
            <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {topCast.length > 0 && (
        <section className="relative z-10 max-w-6xl mx-auto px-8 pt-16">
          <div className="flex items-center space-x-3 border-b border-zinc-800/90 pb-3 mb-6">
            <h2 className="text-lg font-bold text-white">Top Cast</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {topCast.map(actor => (
              <div key={actor.id} className="w-28 md:w-32 shrink-0 flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-zinc-900 shadow-lg border border-zinc-800/80 mb-2">
                  <Image 
                    src={getImageUrl(actor.profile_path, 'w300')}
                    alt={actor.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-semibold text-white text-xs line-clamp-1">{actor.name}</h4>
                <p className="text-zinc-400 text-[10px] line-clamp-1 mt-0.5">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations.results.length > 0 && (
        <section className="relative z-10 max-w-6xl mx-auto px-8 pt-12">
          <div className="flex items-center space-x-3 border-b border-zinc-800/90 pb-3 mb-6">
            <h2 className="text-lg font-bold text-white">More Like This</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
            {recommendations.results.slice(0, 5).map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
