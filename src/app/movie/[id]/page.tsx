import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetail, getMovieCredits, getMovieRecommendations, getImageUrl, getMovieVideos } from '@/lib/tmdb';
import MovieCard from '@/components/movie/MovieCard';
import AddToWatchlistButton from '@/components/movie/AddToWatchlistButton';
import TrailerButton from '@/components/movie/TrailerButton';
import { Star } from 'lucide-react';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Fetch details, credits, and recommendations in parallel
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
    <div className="w-full pb-20">
      {/* Backdrop Section */}
      <section className="relative w-full h-[60vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
          <div className="absolute inset-0 bg-surface/30"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 -mt-32 md:-mt-48 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Poster */}
        <div className="shrink-0 w-48 md:w-72 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 relative z-20">
          <Image 
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex-grow pt-4 md:pt-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-primary italic mb-4 font-medium text-lg">"{movie.tagline}"</p>
          )}

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-label text-on-surface-variant mb-8">
            <span className="flex items-center gap-1 text-tertiary font-bold bg-surface/50 px-2 py-1 rounded backdrop-blur">
              <Star size={18} fill="currentColor" />
              {movie.vote_average?.toFixed(1) || 'NR'}
            </span>
            <span>{releaseYear}</span>
            <span>•</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(g => (
                <span key={g.id} className="bg-surface-container-highest px-2 py-1 rounded text-xs uppercase tracking-wider text-on-surface">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
            <TrailerButton videoId={videoId} />
            <AddToWatchlistButton 
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          </div>

          <div className="max-w-3xl">
            <h3 className="text-xl font-headline font-bold text-white mb-3">Overview</h3>
            <p className="text-on-surface/90 text-lg leading-relaxed mb-8">
              {movie.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {topCast.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight mb-8">Top Cast</h2>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {topCast.map(actor => (
              <div key={actor.id} className="w-32 md:w-40 shrink-0 snap-start flex flex-col gap-3">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-surface-container shadow-lg border border-white/5">
                  <Image 
                    src={getImageUrl(actor.profile_path, 'w300')}
                    alt={actor.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-white text-sm line-clamp-1">{actor.name}</h4>
                  <p className="text-on-surface-variant text-xs line-clamp-2 mt-1">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations.results.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendations.results.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
