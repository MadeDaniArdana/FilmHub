import HomePageClient from '@/components/movie/HomePageClient';
import {
  getTrending,
  getNowPlaying,
  getPopular,
  getTopRated,
  getMoviesByGenre,
} from '@/lib/tmdb';

export default async function Home() {
  // Fetch data in parallel
  const [
    trendingWeek,
    trendingDay,
    nowPlaying,
    popular,
    topRated,
    action,
    horror,
    sciFi,
  ] = await Promise.all([
    getTrending('week').catch(() => ({ results: [] })),
    getTrending('day').catch(() => ({ results: [] })),
    getNowPlaying().catch(() => ({ results: [] })),
    getPopular().catch(() => ({ results: [] })),
    getTopRated().catch(() => ({ results: [] })),
    getMoviesByGenre(28).catch(() => ({ results: [] })),
    getMoviesByGenre(27).catch(() => ({ results: [] })),
    getMoviesByGenre(878).catch(() => ({ results: [] })),
  ]);

  const heroMovies = trendingWeek.results.slice(0, 6);

  return (
    <HomePageClient
      heroMovies={heroMovies}
      trendingDay={trendingDay.results}
      popular={popular.results}
      topRated={topRated.results}
      nowPlaying={nowPlaying.results}
      action={action.results}
      horror={horror.results}
      sciFi={sciFi.results}
    />
  );
}
