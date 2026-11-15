"use client";

import React, { useState, useTransition } from "react";
import {
  Play,
  Plus,
  TrendingUp,
  Flame,
  Star,
  Film,
  Tv,
  Check,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Heart,
  Eye,
  Sparkles,
  X,
} from "lucide-react";
import { CINEMATIC_THEMES, MovieTheme, getMovieThemeColor } from "@/lib/colorExtractor";

export interface MediaItem {
  id: string;
  title: string;
  year: string;
  rating: string;
  liked?: boolean;
  watched?: boolean;
  poster: string;
  backdrop?: string;
  multilineTitle?: [string, string];
  synopsis?: string;
  seasonInfo?: string;
  metaInfo?: string;
  trailerId?: string;
}

const TRENDS_ITEMS: MediaItem[] = [
  {
    id: "t0",
    title: "Mouse",
    year: "2021",
    rating: "7.3",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 20 EPISODES",
    metaInfo: "2021 · Psychological Thriller · 1 Season",
    synopsis: "A suspenseful drama where police officers face a psychopathic predator who terrorizes the entire nation.",
    trailerId: "kP98iJmI92M",
  },
  {
    id: "t1",
    title: "Vincenzo",
    year: "2021",
    rating: "8.4",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 20 EPISODES",
    metaInfo: "2021 · Dark Comedy & Crime · 1 Season",
    synopsis: "During a visit to his motherland, a Korean-Italian mafia lawyer gives an unrivaled conglomerate a taste of its own medicine.",
    trailerId: "S12-4mXQRj4",
  },
  {
    id: "t2",
    title: "Tomorrow",
    year: "2022",
    rating: "7.6",
    liked: false,
    watched: false,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 16 EPISODES",
    metaInfo: "2022 · Fantasy & Drama · 1 Season",
    synopsis: "Made half-human and half-spirit by accident, a young man is employed by a company of grim reapers to carry out special missions.",
    trailerId: "pGvE7HnJ28Q",
  },
  {
    id: "t3",
    title: "Sweet Home",
    year: "2020",
    rating: "7.3",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 2 • 8 EPISODES",
    metaInfo: "2020 · Apocalyptic Horror · 3 Seasons",
    synopsis: "As humans turn into savage monsters, one troubled teenager and his neighbors fight to survive and to hold on to their humanity.",
    trailerId: "7rI56NmD33Y",
  },
  {
    id: "t4",
    title: "Flower Of Evil",
    year: "2020",
    rating: "8.6",
    liked: false,
    watched: false,
    poster: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 16 EPISODES",
    metaInfo: "2020 · Romantic Thriller · 1 Season",
    synopsis: "A detective discovers that her seemingly perfect husband may be hiding a dark, murderous past with a fabricated identity.",
    trailerId: "8S7p_4xL6bY",
  },
  {
    id: "t5",
    title: "Lawlees Lawyer",
    year: "2018",
    rating: "9.5",
    liked: false,
    watched: false,
    poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 16 EPISODES",
    metaInfo: "2018 · Action & Legal Drama · 1 Season",
    synopsis: "A former gangster turned lawyer uses both his fists and the law to fight against those in power and avenge his mother.",
    trailerId: "5j9_xP7k2k4",
  },
  {
    id: "t6",
    title: "My name",
    year: "2021",
    rating: "8.1",
    liked: true,
    watched: false,
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "LIMITED SERIES • 8 EPISODES",
    metaInfo: "2021 · Action Noir · 1 Season",
    synopsis: "Following her father's murder, a revenge-driven woman puts her trust in a powerful crime boss and enters the police force under his direction.",
    trailerId: "ZolR6D_eKQE",
  },
];

const MOVIES_ITEMS: MediaItem[] = [
  {
    id: "m1",
    title: "One Ordinary Day",
    multilineTitle: ["One", "Ordinary Day"],
    year: "2021",
    rating: "8.4",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "SEASON 1 • 8 EPISODES",
    metaInfo: "2021 · Legal Mystery · 1 Season",
    synopsis: "A hardcore crime drama exploring the criminal justice system from an extremely popular perspective through the fierce story of two men.",
    trailerId: "dQw4w9WgXcQ",
  },
  {
    id: "m2",
    title: "The Call",
    year: "2020",
    rating: "7.1",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "FEATURE FILM • 1h 52m",
    metaInfo: "2020 · Sci-Fi Thriller · Full Movie",
    synopsis: "Connected by phone in the same home but 20 years apart, a serial killer puts another woman's past — and life — on the line to change her own fate.",
    trailerId: "h5T4_vQo_8s",
  },
  {
    id: "m3",
    title: "The Witch",
    year: "2021",
    rating: "8.4",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "PARTS 1 & 2 • 2h 17m",
    metaInfo: "2021 · Sci-Fi & Action · Full Movie",
    synopsis: "A high school student with amnesia tries to uncover what has happened to her, all leading her into deeper and darker problems.",
    trailerId: "x7J4_6nLz4k",
  },
  {
    id: "m4",
    title: "Midnigth",
    year: "2021",
    rating: "6.4",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "FEATURE FILM • 1h 43m",
    metaInfo: "2021 · Suspense & Chase · Full Movie",
    synopsis: "A life-threatening hide-and-seek between a psychopathic killer and a deaf woman navigating the nocturnal alleyways of Seoul.",
    trailerId: "u9_P1z8W0k4",
  },
  {
    id: "m5",
    title: "Alive",
    year: "2020",
    rating: "6.3",
    liked: true,
    watched: true,
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1800&q=85",
    seasonInfo: "FEATURE FILM • 1h 38m",
    metaInfo: "2020 · Zombie Survival · Full Movie",
    synopsis: "The rapid spread of an unknown infection has left an entire city in ungovernable chaos, but one survivor remains alive in isolation.",
    trailerId: "jQ8CCg1t3Hg",
  },
];

const DEFAULT_HERO: MediaItem = {
  id: "hero-save-me",
  title: "SAVE ME",
  year: "2017",
  rating: "9.1",
  poster: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
  backdrop: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85",
  seasonInfo: "SEASON 1 • 16 EPISODE",
  metaInfo: "2017 · Exciting story · 2 season",
  synopsis: "Series adapted from the webcomic entitled Out of the World by writer Jo Geum-san.",
  trailerId: "kP98iJmI92M",
};

const GENRES = [
  "Action",
  "Adventure",
  "Biography",
  "Crime",
  "Comedy",
  "Documentary",
  "Drama",
];

export default function NetflixStreamingLanding() {
  // Theme Color State
  const [theme, setTheme] = useState<MovieTheme>(CINEMATIC_THEMES.default);
  const [isPending, startTransition] = useTransition();

  // Active Hero Item (Defaults to SAVE ME, switches when a film is clicked)
  const [activeHero, setActiveHero] = useState<MediaItem>(DEFAULT_HERO);

  // Active Tabs for Section 1 and Section 2
  const [activeTabTop, setActiveTabTop] = useState<string>("Trends Now");
  const [activeTabBottom, setActiveTabBottom] = useState<string>("Movies");

  // Genre Filtering
  const [activeGenresTop, setActiveGenresTop] = useState<string[]>([
    "Action",
    "Crime",
    "Drama",
  ]);
  const [activeGenresBottom, setActiveGenresBottom] = useState<string[]>([
    "Action",
    "Crime",
    "Drama",
  ]);

  // Liked & Watched State Maps
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({
    t0: true,
    t1: true,
    t3: true,
    t6: true,
    m1: true,
    m2: true,
    m3: true,
    m4: true,
    m5: true,
  });

  const [watchedMap, setWatchedMap] = useState<Record<string, boolean>>({
    t0: true,
    t1: true,
    t3: true,
    m1: true,
    m2: true,
    m3: true,
    m4: true,
    m5: true,
  });

  // Movie Slider Pagination index
  const [moviePage, setMoviePage] = useState(0);

  // Video Trailer Modal State
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  // Dynamic Color Adaptation when any film is clicked!
  const handleMovieClick = async (item: MediaItem) => {
    setActiveHero(item);

    // Dynamic color extraction
    const extractedTheme = await getMovieThemeColor(
      item.title,
      item.backdrop || item.poster
    );

    startTransition(() => {
      setTheme(extractedTheme);
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--accent-primary", extractedTheme.primary);
        document.documentElement.style.setProperty("--accent-glow", extractedTheme.glow);
        document.documentElement.style.setProperty("--accent-border", extractedTheme.border);
      }
    });
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWatched = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGenre = (
    genre: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      current.includes(genre)
        ? current.filter((g) => g !== genre)
        : [...current, genre]
    );
  };

  return (
    <div
      className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden relative theme-transition"
      style={
        {
          "--accent-primary": theme.primary,
          "--accent-glow": theme.glow,
        } as React.CSSProperties
      }
    >
      {/* ================= DYNAMIC AMBIENT GLOW OVERLAYS ================= */}
      {/* Left middle glow */}
      <div
        className="pointer-events-none fixed top-[52%] -left-32 w-[420px] h-[420px] rounded-full blur-[140px] z-0 transition-all duration-700 opacity-90"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        }}
      />
      {/* Bottom right glow */}
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-[460px] h-[360px] rounded-full blur-[150px] z-0 transition-all duration-700 opacity-90"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Dynamic Theme Color Pill Badge */}
      <div className="fixed top-24 right-6 z-50 hidden lg:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-2xl transition-all duration-500">
        <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
        <span className="text-[11px] font-medium text-zinc-300">Theme:</span>
        <span
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: theme.primary }}
        >
          {theme.name || "Cinematic"}
        </span>
        <div
          className="w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-500"
          style={{ backgroundColor: theme.primary }}
        />
      </div>

      {/* ================= HERO & NAVBAR SECTION ================= */}
      <section className="relative w-full h-[640px] overflow-hidden">
        {/* Background Hero Image with right bias & smooth cross-fade */}
        <div
          key={activeHero.id}
          className="absolute inset-0 bg-cover bg-right-top bg-no-repeat scale-105 transition-all duration-700 ease-out animate-fadeIn"
          style={{
            backgroundImage: `url('${activeHero.backdrop || activeHero.poster}')`,
            filter: "contrast(1.1) brightness(0.75) saturate(0.85)",
          }}
        />

        {/* Multi-Directional Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent w-[75%] transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-transparent h-32" />

        {/* Dynamic Subtle Color Aura behind hero */}
        <div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[130px] opacity-40 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Top Navbar */}
        <header className="relative z-20 max-w-6xl mx-auto px-8 pt-7 flex items-center justify-between">
          <a
            href="#"
            className="font-black text-3xl tracking-tighter uppercase select-none transition-colors duration-500"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: "0.04em",
              color: theme.primary,
            }}
          >
            NETFLIX
          </a>

          <nav className="hidden md:flex items-center space-x-10 text-[15px] font-medium text-zinc-200">
            <a
              href="#"
              className="text-white hover:text-white transition font-semibold"
              style={{ color: theme.primary }}
            >
              Home
            </a>
            <a href="#" className="hover:text-white transition">
              Profil
            </a>
            <a href="#" className="hover:text-white transition">
              Drama
            </a>
            <a href="#" className="hover:text-white transition">
              Movie
            </a>
            <a href="#" className="hover:text-white transition">
              Help
            </a>
          </nav>

          {/* Custom Staggered Hamburger Icon */}
          <button
            aria-label="Menu"
            className="flex flex-col items-end justify-center space-y-1.5 w-8 h-8 group cursor-pointer"
          >
            <span
              className="w-4 h-[3px] rounded-full mr-1 group-hover:w-7 transition-all duration-300"
              style={{ backgroundColor: theme.primary }}
            />
            <span className="w-7 h-[3px] bg-white rounded-full" />
            <span className="w-3.5 h-[3px] bg-white rounded-full mr-1.5 group-hover:w-7 transition-all duration-300" />
          </button>
        </header>

        {/* Hero Left Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 h-[calc(100%-88px)] flex flex-col justify-center">
          <div className="max-w-md space-y-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300 flex items-center space-x-2">
              <span>{activeHero.seasonInfo || "SEASON 1 • 16 EPISODE"}</span>
            </p>

            <div className="flex items-center space-x-2 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">{activeHero.rating}</span>
              <span className="text-zinc-400 font-medium">
                {activeHero.metaInfo || `${activeHero.year} · Exciting story · 2 season`}
              </span>
            </div>

            <h1 className="text-5xl sm:text-[54px] font-extrabold tracking-wide text-white leading-none pt-1 drop-shadow-md">
              {activeHero.title}
            </h1>

            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed pt-1 max-w-[340px]">
              {activeHero.synopsis ||
                "Series adapted from the webcomic entitled Out of the World by writer Jo Geum-san."}
            </p>

            {/* CTA Buttons - Adaptive to Film Color! */}
            <div className="flex items-center space-x-4 pt-3">
              <button
                onClick={() => setActiveTrailer(activeHero.trailerId || "kP98iJmI92M")}
                className="flex items-center space-x-2 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-500 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 24px -4px ${theme.glow}`,
                }}
              >
                <Play className="w-3 h-3 fill-white text-white" />
                <span>WATCH</span>
              </button>
              <button
                onClick={() => toggleLike(activeHero.id)}
                className="flex items-center space-x-1.5 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-500 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 24px -4px ${theme.glow}`,
                }}
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>{likedMap[activeHero.id] ? "IN LIST" : "ADD LIST"}</span>
              </button>
            </div>
          </div>

          {/* Hero Pagination Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            <span className="w-5 h-[2px] bg-zinc-600 rounded-full" />
            <span
              className="w-6 h-[3px] rounded-full transition-all duration-500"
              style={{ backgroundColor: theme.primary }}
            />
            <span className="w-5 h-[2px] bg-zinc-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: TRENDS NOW ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-4">
        {/* Category Header Tabs with Active Indicator Dot */}
        <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3.5 relative">
          <button
            onClick={() => setActiveTabTop("Trends Now")}
            className={`relative flex items-center space-x-3 font-bold text-base transition-colors ${
              activeTabTop === "Trends Now" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <TrendingUp
              className="w-5 h-5 stroke-[2.2] transition-colors"
              style={{ color: activeTabTop === "Trends Now" ? "#ffffff" : undefined }}
            />
            <span>Trends Now</span>
            {/* Dynamic Active Indicator Dot */}
            {activeTabTop === "Trends Now" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 10px ${theme.primary}`,
                }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabTop("Popular")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabTop === "Popular" ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Popular</span>
            {activeTabTop === "Popular" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabTop("Premium")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabTop === "Premium" ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Premium</span>
            {activeTabTop === "Premium" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabTop("Recently Added")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabTop === "Recently Added"
                ? "text-white font-bold"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Recently Added</span>
            {activeTabTop === "Recently Added" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>
        </div>

        {/* Genre Pills Row */}
        <div className="flex items-center justify-between py-6 overflow-x-auto no-scrollbar gap-3">
          {GENRES.map((genre) => {
            const isActive = activeGenresTop.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre, activeGenresTop, setActiveGenresTop)}
                className={`text-sm font-medium px-5 py-1 rounded-full transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-white font-semibold shadow-md"
                    : "text-zinc-200 hover:text-white hover:bg-zinc-800/60"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.primary,
                        boxShadow: `0 4px 14px -2px ${theme.glow}`,
                      }
                    : {}
                }
              >
                {genre}
              </button>
            );
          })}
          <button
            aria-label="More genres"
            className="text-zinc-500 hover:text-white pl-2 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Edge-Bleeding Poster Row (Clicking any poster updates Theme & Hero!) */}
        <div className="relative -mx-24 px-4 overflow-hidden">
          <div className="grid grid-cols-7 gap-5 items-start">
            {TRENDS_ITEMS.map((item, idx) => {
              const isEdge = idx === 0 || idx === TRENDS_ITEMS.length - 1;
              const isSelected = activeHero.id === item.id;
              const isLiked = likedMap[item.id] ?? item.liked;
              const isWatched = watchedMap[item.id] ?? item.watched;

              return (
                <div
                  key={item.id}
                  onClick={() => handleMovieClick(item)}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isEdge ? "opacity-85 hover:opacity-100" : ""
                  } ${isSelected ? "scale-[1.03]" : "hover:scale-[1.02]"}`}
                >
                  {/* Poster Card with 2:3 aspect ratio */}
                  <div
                    className={`relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 shadow-md transition-all duration-500 ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-offset-[#050505]"
                        : "hover:ring-1 hover:ring-white/30"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: theme.primary,
                            boxShadow: `0 10px 30px -5px ${theme.glow}`,
                          }
                        : {}
                    }
                  >
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Active Ribbon / Indicator */}
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-md animate-pulse"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Active
                      </div>
                    )}

                    {/* Click Play overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 transform scale-75 group-hover:scale-100"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Metadata Footer: Row 1 Title */}
                  <h3
                    className="font-bold text-[13px] truncate transition-colors duration-300"
                    style={{
                      color: isSelected ? theme.primary : "#ffffff",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Card Metadata Footer: Row 2 Year & 3-Icon Cluster */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5">
                    <span>{item.year}</span>
                    <div className="flex items-center space-x-2">
                      {/* Heart (Like) */}
                      <button
                        aria-label="Favorite"
                        onClick={(e) => toggleLike(item.id, e)}
                        className="cursor-pointer hover:scale-125 transition-transform"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            isLiked
                              ? "fill-[#DC2626] text-[#DC2626]"
                              : "fill-zinc-400 text-zinc-400 hover:text-white"
                          }`}
                        />
                      </button>

                      {/* Eye (Watched) */}
                      <button
                        aria-label="Watched"
                        onClick={(e) => toggleWatched(item.id, e)}
                        className="cursor-pointer hover:scale-125 transition-transform"
                      >
                        <Eye
                          className={`w-3 h-3 ${
                            isWatched ? "text-[#FBBF24]" : "text-zinc-400 hover:text-white"
                          }`}
                        />
                      </button>

                      {/* Star + Rating Score */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-2.5 h-2.5 fill-[#FBBF24] text-[#FBBF24]" />
                        <span className="text-zinc-300 font-medium">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: MOVIES ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-12">
        {/* Category Header Tabs with Active Indicator Dot */}
        <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3.5 relative">
          <button
            onClick={() => setActiveTabBottom("Movies")}
            className={`relative flex items-center space-x-3 font-bold text-base transition-colors ${
              activeTabBottom === "Movies" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Film className="w-5 h-5 text-white" />
            <span>Movies</span>
            {activeTabBottom === "Movies" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 10px ${theme.primary}`,
                }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabBottom("Series")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabBottom === "Series" ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Series</span>
            {activeTabBottom === "Series" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabBottom("Original Series")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabBottom === "Original Series"
                ? "text-white font-bold"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Original Series</span>
            {activeTabBottom === "Original Series" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTabBottom("Search")}
            className={`relative flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors ${
              activeTabBottom === "Search" ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
            {activeTabBottom === "Search" && (
              <span
                className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>
        </div>

        {/* Genre Pills Row */}
        <div className="flex items-center justify-between py-6 overflow-x-auto no-scrollbar gap-3">
          {GENRES.map((genre) => {
            const isActive = activeGenresBottom.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre, activeGenresBottom, setActiveGenresBottom)}
                className={`text-sm font-medium px-5 py-1 rounded-full transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-white font-semibold shadow-md"
                    : "text-zinc-200 hover:text-white hover:bg-zinc-800/60"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.primary,
                        boxShadow: `0 4px 14px -2px ${theme.glow}`,
                      }
                    : {}
                }
              >
                {genre}
              </button>
            );
          })}
          <button
            aria-label="More genres"
            className="text-zinc-500 hover:text-white pl-2 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-Filters & Rating Slider Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-7">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-zinc-300 font-medium pr-1">Sort by:</span>
            <button
              className="text-white font-semibold px-4 py-1 rounded-full text-[11px] transition-all duration-500 cursor-pointer shadow-sm"
              style={{ backgroundColor: theme.primary }}
            >
              Latest
            </button>
            <button className="bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 px-3.5 py-1 rounded-full text-[11px] flex items-center space-x-1.5 transition cursor-pointer">
              <span>Year</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
            <button className="bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 px-3.5 py-1 rounded-full text-[11px] flex items-center space-x-1.5 transition cursor-pointer">
              <span>A-z</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
          </div>

          {/* Rating Progress Bar */}
          <div className="flex items-center space-x-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <div className="w-36 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(parseFloat(activeHero.rating) / 10) * 100}%`,
                  backgroundColor: theme.primary,
                }}
              />
            </div>
            <span className="text-xs font-bold text-white">{activeHero.rating}</span>
          </div>
        </div>

        {/* 5-Column Movie Grid flanked by Circular Pagination Buttons */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous"
            onClick={() => setMoviePage((prev) => (prev > 0 ? prev - 1 : 0))}
            className="absolute -left-7 top-[38%] -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Grid of 5 Cards */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
            {MOVIES_ITEMS.map((movie) => {
              const isSelected = activeHero.id === movie.id;
              const isLiked = likedMap[movie.id] ?? movie.liked;
              const isWatched = watchedMap[movie.id] ?? movie.watched;

              return (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isSelected ? "scale-[1.03]" : "hover:scale-[1.02]"
                  }`}
                >
                  <div
                    className={`relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 shadow-md transition-all duration-500 ${
                      isSelected ? "ring-2 ring-offset-2 ring-offset-[#050505]" : "hover:ring-1 hover:ring-white/30"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: theme.primary,
                            boxShadow: `0 10px 30px -5px ${theme.glow}`,
                          }
                        : {}
                    }
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Active Ribbon / Indicator */}
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-md animate-pulse"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Active
                      </div>
                    )}

                    {/* Play button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 transform scale-75 group-hover:scale-100"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Multiline title support or standard title */}
                  {movie.multilineTitle ? (
                    <h3
                      className="font-bold text-[13px] leading-tight transition-colors duration-300"
                      style={{
                        color: isSelected ? theme.primary : "#ffffff",
                      }}
                    >
                      {movie.multilineTitle[0]}
                      <br />
                      {movie.multilineTitle[1]}
                    </h3>
                  ) : (
                    <h3
                      className="font-bold text-[13px] truncate pt-3 transition-colors duration-300"
                      style={{
                        color: isSelected ? theme.primary : "#ffffff",
                      }}
                    >
                      {movie.title}
                    </h3>
                  )}

                  {/* Card Metadata Footer: Row 2 */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5">
                    <span>{movie.year}</span>
                    <div className="flex items-center space-x-2">
                      {/* Heart Toggle */}
                      <button
                        aria-label="Favorite"
                        onClick={(e) => toggleLike(movie.id, e)}
                        className="cursor-pointer hover:scale-125 transition-transform"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            isLiked
                              ? "fill-[#DC2626] text-[#DC2626]"
                              : "fill-zinc-400 text-zinc-400 hover:text-white"
                          }`}
                        />
                      </button>

                      {/* Eye Toggle */}
                      <button
                        aria-label="Watched"
                        onClick={(e) => toggleWatched(movie.id, e)}
                        className="cursor-pointer hover:scale-125 transition-transform"
                      >
                        <Eye
                          className={`w-3 h-3 ${
                            isWatched ? "text-[#FBBF24]" : "text-zinc-400 hover:text-white"
                          }`}
                        />
                      </button>

                      {/* Star + Score */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-2.5 h-2.5 fill-[#FBBF24] text-[#FBBF24]" />
                        <span className="text-zinc-300 font-medium">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            aria-label="Next"
            onClick={() => setMoviePage((prev) => prev + 1)}
            className="absolute -right-7 top-[38%] -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 max-w-6xl mx-auto px-8 mt-14 pt-8 pb-12 border-t border-zinc-800/90">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-[11px] text-zinc-400">
          {/* Col 1: Resource */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">Resource</h4>
            <p className="leading-relaxed text-[10px] text-zinc-400">
              About, Blockbuster,
              <br />
              Contact US, Forums
              <br />
              ON Movie Indonesia,
              <br />
              Blog, Help Center.
            </p>
          </div>

          {/* Col 2: Legal */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">Legal</h4>
            <ul className="space-y-1 text-[10px]">
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Police
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Account */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">Account</h4>
            <ul className="space-y-1 text-[10px]">
              <li>
                <a href="#" className="hover:text-white transition">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Watchlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  User Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: NewsLetter */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">NewsLetter</h4>
            <p className="leading-relaxed text-[10px]">
              Subscribe to our newsletter system
              <br />
              now to get latest news from us
              <br />
              Inspired By Pinterest
            </p>
          </div>

          {/* Col 5: IDN Netflix Indonesia */}
          <div className="space-y-2">
            <h4 className="text-white font-normal text-[11px]">IDN Netflix Indonesia</h4>
            <p className="text-[10px] text-zinc-300">Call us (+62) 823 45678910</p>
            <p className="text-[11px] text-zinc-200 pt-1">@2024 bilqish.i All Right Reserved.</p>
          </div>
        </div>
      </footer>

      {/* ================= MODAL TRAILER PLAYER ================= */}
      {activeTrailer && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <h3 className="font-bold text-white text-base">
                  {activeHero.title} — Official Trailer
                </h3>
              </div>
              <button
                onClick={() => setActiveTrailer(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeTrailer}?autoplay=1`}
                title="Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
