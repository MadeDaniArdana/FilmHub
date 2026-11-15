'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MovieTheme, CINEMATIC_THEMES, getMovieThemeColor } from '@/lib/colorExtractor';

export interface MoviePayload {
  id: string | number;
  title: string;
  year?: string;
  rating?: string;
  poster?: string;
  backdrop?: string;
  overview?: string;
  genreIds?: number[];
  genres?: string[];
  multilineTitle?: [string, string];
  seasonInfo?: string;
  metaInfo?: string;
  trailerId?: string;
}

interface MovieThemeContextType {
  theme: MovieTheme;
  activeMovie: MoviePayload | null;
  selectMovie: (movie: MoviePayload) => void;
  likedMovies: Set<string | number>;
  watchedMovies: Set<string | number>;
  toggleLike: (id: string | number) => void;
  toggleWatched: (id: string | number) => void;
}

const MovieThemeContext = createContext<MovieThemeContextType | undefined>(undefined);

export function MovieThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<MovieTheme>(CINEMATIC_THEMES.default);
  const [activeMovie, setActiveMovie] = useState<MoviePayload | null>(null);
  const [likedMovies, setLikedMovies] = useState<Set<string | number>>(new Set(['t0', 't1', 't3', 't6', 'm1', 'm2', 'm3', 'm4', 'm5']));
  const [watchedMovies, setWatchedMovies] = useState<Set<string | number>>(new Set(['t0', 't1', 't3', 'm1', 'm2', 'm3', 'm4', 'm5']));

  // Update root CSS variables when theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--accent-primary', theme.primary);
      root.style.setProperty('--accent-primary-rgb', `${theme.rgb[0]}, ${theme.rgb[1]}, ${theme.rgb[2]}`);
      root.style.setProperty('--accent-glow', theme.glow);
      root.style.setProperty('--accent-glow-subtle', theme.glowSubtle);
      root.style.setProperty('--accent-border', theme.border);
    }
  }, [theme]);

  const selectMovie = useCallback(async (movie: MoviePayload) => {
    setActiveMovie(movie);
    const newTheme = await getMovieThemeColor(
      movie.title,
      movie.backdrop || movie.poster,
      movie.genreIds
    );
    setTheme(newTheme);
  }, []);

  const toggleLike = useCallback((id: string | number) => {
    setLikedMovies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleWatched = useCallback((id: string | number) => {
    setWatchedMovies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <MovieThemeContext.Provider
      value={{
        theme,
        activeMovie,
        selectMovie,
        likedMovies,
        watchedMovies,
        toggleLike,
        toggleWatched,
      }}
    >
      {children}
    </MovieThemeContext.Provider>
  );
}

export function useMovieTheme() {
  const context = useContext(MovieThemeContext);
  if (!context) {
    throw new Error('useMovieTheme must be used within a MovieThemeProvider');
  }
  return context;
}
