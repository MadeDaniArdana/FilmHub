import { Movie, MovieDetail, PaginatedResponse, CreditsResponse, VideosResponse, Genre } from '@/types/tmdb';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  console.warn("TMDB_API_KEY is not defined in environment variables!");
}

async function fetchTMDB<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);

  // If there are searchParams in options (passed via a custom property, let's handle them)
  const fetchOptions: any = { ...options };
  if (fetchOptions.searchParams) {
    Object.entries(fetchOptions.searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    delete fetchOptions.searchParams;
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...fetchOptions,
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return res.json();
}

export const getTrending = async (timeWindow: 'day' | 'week' = 'week'): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB(`trending/movie/${timeWindow}`, { next: { revalidate: 3600 } });
};

export const getPopular = async (): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('movie/popular', { next: { revalidate: 21600 } });
};

export const getNowPlaying = async (): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('movie/now_playing', { next: { revalidate: 21600 } });
};

export const getTopRated = async (): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('movie/top_rated', { next: { revalidate: 86400 } });
};

export const getMovieDetail = async (id: number | string): Promise<MovieDetail> => {
  return fetchTMDB(`movie/${id}`, { next: { revalidate: 86400 } });
};

export const getMovieCredits = async (id: number | string): Promise<CreditsResponse> => {
  return fetchTMDB(`movie/${id}/credits`, { next: { revalidate: 86400 } });
};

export const getMovieVideos = async (id: number | string): Promise<VideosResponse> => {
  return fetchTMDB(`movie/${id}/videos`, { next: { revalidate: 86400 } });
};

export const getMovieRecommendations = async (id: number | string): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB(`movie/${id}/recommendations`, { next: { revalidate: 86400 } });
};

export const searchMovies = async (query: string, page: number = 1): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('search/movie', {
    searchParams: { query, page },
    cache: 'no-store'
  } as any);
};

export const discoverMovies = async (filters: Record<string, any>): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('discover/movie', {
    searchParams: { ...filters },
    next: { revalidate: 3600 }
  } as any);
};

export const discoverTV = async (filters: Record<string, any>): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('discover/tv', {
    searchParams: { ...filters },
    next: { revalidate: 3600 }
  } as any);
};

export const getTrendingTV = async (timeWindow: 'day' | 'week' = 'week'): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB(`trending/tv/${timeWindow}`, { next: { revalidate: 3600 } });
};

export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  return fetchTMDB('genre/movie/list', { next: { revalidate: 604800 } });
};

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<PaginatedResponse<Movie>> => {
  return fetchTMDB('discover/movie', {
    searchParams: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      'vote_count.gte': 100,
      page,
    },
    next: { revalidate: 3600 }
  } as any);
};

export const getImageUrl = (path: string | null, size: 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500') => {
  if (!path) return '/placeholder.webp'; // Provide a local placeholder if empty
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
