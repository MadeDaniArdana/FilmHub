import HeroSlider from '@/components/movie/HeroSlider';
import MovieRow from '@/components/movie/MovieRow';
import GenreFilterRow from '@/components/movie/GenreFilterRow';
import {
  getTrending,
  getNowPlaying,
  getPopular,
  getTopRated,
  getGenres,
  getMoviesByGenre,
} from '@/lib/tmdb';

export default async function Home() {
  // Fetch all data in parallel
  const [
    trendingWeek,
    trendingDay,
    nowPlaying,
    popular,
    topRated,
    genreList,
    action,
    horror,
    sciFi,
    romance,
    animation,
  ] = await Promise.all([
    getTrending('week'),
    getTrending('day'),
    getNowPlaying(),
    getPopular(),
    getTopRated(),
    getGenres(),
    getMoviesByGenre(28),   // Action
    getMoviesByGenre(27),   // Horror
    getMoviesByGenre(878),  // Science Fiction
    getMoviesByGenre(10749),// Romance
    getMoviesByGenre(16),   // Animation
  ]);

  const heroMovies = trendingWeek.results.slice(0, 6);

  // Featured genre IDs to show as tabs (ordered by popularity preference)
  const featuredGenreIds = [28, 35, 18, 27, 878, 10749, 16, 53, 12, 80, 14, 36];
  const filteredGenres = genreList.genres.filter((g) =>
    featuredGenreIds.includes(g.id)
  );
  // Sort genres in the preferred order
  const sortedGenres = filteredGenres.sort(
    (a, b) => featuredGenreIds.indexOf(a.id) - featuredGenreIds.indexOf(b.id)
  );

  return (
    <div className="w-full bg-[#111125] min-h-screen">
      {/* Hero Section */}
      <HeroSlider movies={heroMovies} />

      {/* Netflix Style Rows Container */}
      <div className="pb-24 -mt-10 md:-mt-24 relative z-20 bg-gradient-to-t from-[#111125] via-[#111125] via-80% to-transparent pt-10">

        {/* Row 1: Trending Today */}
        <MovieRow
          title="Trending Today"
          movies={trendingDay.results}
          viewAllLink="/trending?time=day"
        />

        {/* Row 2: In Theaters */}
        <MovieRow
          title="In Theaters Now"
          movies={nowPlaying.results}
          viewAllLink="/discover?type=movie&now_playing=true"
        />

        {/* Row 3: Genre Filter (Interactive) */}
        <GenreFilterRow
          genres={sortedGenres}
          initialGenreId={28}
          initialMovies={action.results}
        />

        {/* Row 4: Popular on FilmHub */}
        <MovieRow
          title="Popular on FilmHub"
          movies={popular.results}
          viewAllLink="/discover?type=movie&sort=popular"
        />

        {/* Row 5: Critically Acclaimed */}
        <MovieRow
          title="Critically Acclaimed"
          movies={topRated.results}
          viewAllLink="/discover?type=movie&sort=top_rated"
        />

        {/* Row 6: Action Blockbusters */}
        <MovieRow
          title="Action Blockbusters"
          movies={action.results}
          viewAllLink="/discover?type=movie&genre=28"
        />

        {/* Row 7: Spine-Chilling Horror */}
        <MovieRow
          title="Spine-Chilling Horror"
          movies={horror.results}
          viewAllLink="/discover?type=movie&genre=27"
        />

        {/* Row 8: Science Fiction */}
        <MovieRow
          title="Sci-Fi Universe"
          movies={sciFi.results}
          viewAllLink="/discover?type=movie&genre=878"
        />

        {/* Row 9: Romantic Films */}
        <MovieRow
          title="Love Stories"
          movies={romance.results}
          viewAllLink="/discover?type=movie&genre=10749"
        />

        {/* Row 10: Animation */}
        <MovieRow
          title="Animated Worlds"
          movies={animation.results}
          viewAllLink="/discover?type=movie&genre=16"
        />

        {/* Row 11: Trending This Week */}
        <MovieRow
          title="Trending This Week"
          movies={trendingWeek.results.slice(6)}
          viewAllLink="/trending?time=week"
        />
      </div>
    </div>
  );
}
