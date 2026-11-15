export interface MovieTheme {
  primary: string;
  rgb: [number, number, number];
  glow: string;
  glowSubtle: string;
  border: string;
  name?: string;
}

// Curated cinematic themes for mock items or specific genres
export const CINEMATIC_THEMES: Record<string, MovieTheme> = {
  default: {
    primary: '#E50914',
    rgb: [229, 9, 20],
    glow: 'rgba(229, 9, 20, 0.32)',
    glowSubtle: 'rgba(229, 9, 20, 0.12)',
    border: 'rgba(229, 9, 20, 0.4)',
    name: 'Netflix Crimson',
  },
  mouse: {
    primary: '#DC2626',
    rgb: [220, 38, 38],
    glow: 'rgba(220, 38, 38, 0.35)',
    glowSubtle: 'rgba(220, 38, 38, 0.15)',
    border: 'rgba(220, 38, 38, 0.45)',
    name: 'Psych Crimson',
  },
  vincenzo: {
    primary: '#D97706',
    rgb: [217, 119, 6],
    glow: 'rgba(217, 119, 6, 0.35)',
    glowSubtle: 'rgba(217, 119, 6, 0.15)',
    border: 'rgba(217, 119, 6, 0.45)',
    name: 'Consigliere Gold',
  },
  tomorrow: {
    primary: '#0EA5E9',
    rgb: [14, 165, 233],
    glow: 'rgba(14, 165, 233, 0.35)',
    glowSubtle: 'rgba(14, 165, 233, 0.15)',
    border: 'rgba(14, 165, 233, 0.45)',
    name: 'Grim Reaper Cyan',
  },
  'sweet home': {
    primary: '#059669',
    rgb: [5, 150, 105],
    glow: 'rgba(5, 150, 105, 0.35)',
    glowSubtle: 'rgba(5, 150, 105, 0.15)',
    border: 'rgba(5, 150, 105, 0.45)',
    name: 'Monster Emerald',
  },
  'flower of evil': {
    primary: '#7C3AED',
    rgb: [124, 58, 237],
    glow: 'rgba(124, 58, 237, 0.35)',
    glowSubtle: 'rgba(124, 58, 237, 0.15)',
    border: 'rgba(124, 58, 237, 0.45)',
    name: 'Mystery Violet',
  },
  'lawlees lawyer': {
    primary: '#2563EB',
    rgb: [37, 99, 235],
    glow: 'rgba(37, 99, 235, 0.35)',
    glowSubtle: 'rgba(37, 99, 235, 0.15)',
    border: 'rgba(37, 99, 235, 0.45)',
    name: 'Justice Cobalt',
  },
  'my name': {
    primary: '#E11D48',
    rgb: [225, 29, 72],
    glow: 'rgba(225, 29, 72, 0.35)',
    glowSubtle: 'rgba(225, 29, 72, 0.15)',
    border: 'rgba(225, 29, 72, 0.45)',
    name: 'Revenge Rose',
  },
  'one ordinary day': {
    primary: '#4F46E5',
    rgb: [79, 70, 229],
    glow: 'rgba(79, 70, 229, 0.35)',
    glowSubtle: 'rgba(79, 70, 229, 0.15)',
    border: 'rgba(79, 70, 229, 0.45)',
    name: 'Trial Indigo',
  },
  'the call': {
    primary: '#B91C1C',
    rgb: [185, 28, 28],
    glow: 'rgba(185, 28, 28, 0.35)',
    glowSubtle: 'rgba(185, 28, 28, 0.15)',
    border: 'rgba(185, 28, 28, 0.45)',
    name: 'Bloodline Red',
  },
  'the witch': {
    primary: '#9333EA',
    rgb: [147, 51, 234],
    glow: 'rgba(147, 51, 234, 0.35)',
    glowSubtle: 'rgba(147, 51, 234, 0.15)',
    border: 'rgba(147, 51, 234, 0.45)',
    name: 'Subversion Amethyst',
  },
  midnigth: {
    primary: '#EAB308',
    rgb: [234, 179, 8],
    glow: 'rgba(234, 179, 8, 0.35)',
    glowSubtle: 'rgba(234, 179, 8, 0.15)',
    border: 'rgba(234, 179, 8, 0.45)',
    name: 'Chase Amber',
  },
  alive: {
    primary: '#EA580C',
    rgb: [234, 88, 12],
    glow: 'rgba(234, 88, 12, 0.35)',
    glowSubtle: 'rgba(234, 88, 12, 0.15)',
    border: 'rgba(234, 88, 12, 0.45)',
    name: 'Biohazard Flame',
  },
  'save me': {
    primary: '#E50914',
    rgb: [229, 9, 20],
    glow: 'rgba(229, 9, 20, 0.35)',
    glowSubtle: 'rgba(229, 9, 20, 0.15)',
    border: 'rgba(229, 9, 20, 0.45)',
    name: 'Cult Crimson',
  },
};

// Genre ID to Theme Mapping for live TMDB movies
export const GENRE_THEMES: Record<number, MovieTheme> = {
  28: { // Action
    primary: '#E50914',
    rgb: [229, 9, 20],
    glow: 'rgba(229, 9, 20, 0.35)',
    glowSubtle: 'rgba(229, 9, 20, 0.15)',
    border: 'rgba(229, 9, 20, 0.4)',
    name: 'Action Red',
  },
  12: { // Adventure
    primary: '#D97706',
    rgb: [217, 119, 6],
    glow: 'rgba(217, 119, 6, 0.35)',
    glowSubtle: 'rgba(217, 119, 6, 0.15)',
    border: 'rgba(217, 119, 6, 0.4)',
    name: 'Adventure Amber',
  },
  16: { // Animation
    primary: '#F59E0B',
    rgb: [245, 158, 11],
    glow: 'rgba(245, 158, 11, 0.35)',
    glowSubtle: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.4)',
    name: 'Animation Gold',
  },
  35: { // Comedy
    primary: '#10B981',
    rgb: [16, 185, 129],
    glow: 'rgba(16, 185, 129, 0.35)',
    glowSubtle: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)',
    name: 'Comedy Emerald',
  },
  80: { // Crime
    primary: '#4F46E5',
    rgb: [79, 70, 229],
    glow: 'rgba(79, 70, 229, 0.35)',
    glowSubtle: 'rgba(79, 70, 229, 0.15)',
    border: 'rgba(79, 70, 229, 0.4)',
    name: 'Crime Indigo',
  },
  99: { // Documentary
    primary: '#0D9488',
    rgb: [13, 148, 136],
    glow: 'rgba(13, 148, 136, 0.35)',
    glowSubtle: 'rgba(13, 148, 136, 0.15)',
    border: 'rgba(13, 148, 136, 0.4)',
    name: 'Docu Teal',
  },
  18: { // Drama
    primary: '#8B5CF6',
    rgb: [139, 92, 246],
    glow: 'rgba(139, 92, 246, 0.35)',
    glowSubtle: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.4)',
    name: 'Drama Violet',
  },
  14: { // Fantasy
    primary: '#A855F7',
    rgb: [168, 85, 247],
    glow: 'rgba(168, 85, 247, 0.35)',
    glowSubtle: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.4)',
    name: 'Fantasy Purple',
  },
  27: { // Horror
    primary: '#B91C1C',
    rgb: [185, 28, 28],
    glow: 'rgba(185, 28, 28, 0.38)',
    glowSubtle: 'rgba(185, 28, 28, 0.15)',
    border: 'rgba(185, 28, 28, 0.45)',
    name: 'Horror Crimson',
  },
  878: { // Science Fiction
    primary: '#06B6D4',
    rgb: [6, 182, 212],
    glow: 'rgba(6, 182, 212, 0.35)',
    glowSubtle: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.4)',
    name: 'Sci-Fi Cyan',
  },
  53: { // Thriller
    primary: '#E11D48',
    rgb: [225, 29, 72],
    glow: 'rgba(225, 29, 72, 0.35)',
    glowSubtle: 'rgba(225, 29, 72, 0.15)',
    border: 'rgba(225, 29, 72, 0.4)',
    name: 'Thriller Rose',
  },
  10749: { // Romance
    primary: '#EC4899',
    rgb: [236, 72, 153],
    glow: 'rgba(236, 72, 153, 0.35)',
    glowSubtle: 'rgba(236, 72, 153, 0.15)',
    border: 'rgba(236, 72, 153, 0.4)',
    name: 'Romance Pink',
  },
};

const PALETTE_FALLBACKS: MovieTheme[] = [
  { primary: '#E50914', rgb: [229, 9, 20], glow: 'rgba(229, 9, 20, 0.35)', glowSubtle: 'rgba(229, 9, 20, 0.15)', border: 'rgba(229, 9, 20, 0.4)', name: 'Crimson' },
  { primary: '#06B6D4', rgb: [6, 182, 212], glow: 'rgba(6, 182, 212, 0.35)', glowSubtle: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.4)', name: 'Cyan' },
  { primary: '#8B5CF6', rgb: [139, 92, 246], glow: 'rgba(139, 92, 246, 0.35)', glowSubtle: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.4)', name: 'Amethyst' },
  { primary: '#F59E0B', rgb: [245, 158, 11], glow: 'rgba(245, 158, 11, 0.35)', glowSubtle: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', name: 'Amber' },
  { primary: '#10B981', rgb: [16, 185, 129], glow: 'rgba(16, 185, 129, 0.35)', glowSubtle: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', name: 'Emerald' },
  { primary: '#E11D48', rgb: [225, 29, 72], glow: 'rgba(225, 29, 72, 0.35)', glowSubtle: 'rgba(225, 29, 72, 0.15)', border: 'rgba(225, 29, 72, 0.4)', name: 'Rose' },
  { primary: '#3B82F6', rgb: [59, 130, 246], glow: 'rgba(59, 130, 246, 0.35)', glowSubtle: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', name: 'Cobalt' },
  { primary: '#F97316', rgb: [249, 115, 22], glow: 'rgba(249, 115, 22, 0.35)', glowSubtle: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)', name: 'Orange Flame' },
];

/**
 * Extracts a dynamic theme color from an image URL using in-browser Canvas,
 * or falls back intelligently to Title/Genre analysis.
 */
export async function getMovieThemeColor(
  title: string,
  imageUrl?: string | null,
  genreIds?: number[]
): Promise<MovieTheme> {
  const normalizedTitle = title.toLowerCase().trim();

  // 1. Direct curated match
  for (const [key, theme] of Object.entries(CINEMATIC_THEMES)) {
    if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
      return theme;
    }
  }

  // 2. Try browser canvas extraction if image is available and in browser
  if (typeof window !== 'undefined' && imageUrl) {
    try {
      const extracted = await extractColorFromImage(imageUrl);
      if (extracted) {
        return extracted;
      }
    } catch {
      // Ignore CORS or canvas error, continue to fallback
    }
  }

  // 3. Fallback based on Primary Genre
  if (genreIds && genreIds.length > 0) {
    for (const gid of genreIds) {
      if (GENRE_THEMES[gid]) {
        return GENRE_THEMES[gid];
      }
    }
  }

  // 4. Deterministic string hash fallback
  let hash = 0;
  for (let i = 0; i < normalizedTitle.length; i++) {
    hash = normalizedTitle.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE_FALLBACKS.length;
  return PALETTE_FALLBACKS[index];
}

/**
 * Client-side canvas sampler to find the most vibrant dominant color
 */
function extractColorFromImage(url: string): Promise<MovieTheme | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    // Timeout if loading stalls
    const timer = setTimeout(() => resolve(null), 1200);

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(null);

        const size = 32;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size).data;
        let bestR = 229, bestG = 9, bestB = 20;
        let maxScore = -1;

        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          if (a < 180) continue;

          // Compute perceived brightness & saturation
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const brightness = (max + min) / 2;
          const delta = max - min;
          const saturation = max === 0 ? 0 : delta / max;

          // Reject too dark, washed out, or pure white
          if (brightness < 35 || brightness > 230) continue;
          if (saturation < 0.25) continue;

          // Boost vibrant and cinematic saturated hues
          const score = saturation * 1.5 + (brightness > 60 && brightness < 180 ? 1 : 0.5);

          if (score > maxScore) {
            maxScore = score;
            bestR = r;
            bestG = g;
            bestB = b;
          }
        }

        if (maxScore > 0) {
          const hex = `#${((1 << 24) + (bestR << 16) + (bestG << 8) + bestB).toString(16).slice(1)}`;
          resolve({
            primary: hex,
            rgb: [bestR, bestG, bestB],
            glow: `rgba(${bestR}, ${bestG}, ${bestB}, 0.32)`,
            glowSubtle: `rgba(${bestR}, ${bestG}, ${bestB}, 0.15)`,
            border: `rgba(${bestR}, ${bestG}, ${bestB}, 0.45)`,
            name: 'Cinematic Dynamic',
          });
          return;
        }
        resolve(null);
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
  });
}
