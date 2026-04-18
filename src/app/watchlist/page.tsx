import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import MovieCard from '@/components/movie/MovieCard';
import { Movie } from '@/types/tmdb';
import { Clapperboard, Trash2, LibraryBig } from 'lucide-react';

export default async function WatchlistPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch watchlist from Supabase
  const { data: watchlistItems, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  if (error) {
    console.error('Error fetching watchlist:', error);
  }

  const movies: Partial<Movie>[] = watchlistItems?.map(item => ({
    id: item.tmdb_movie_id,
    title: item.movie_title,
    poster_path: item.poster_path,
    vote_average: 0, 
  })) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24 min-h-screen relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-2">My Watchlist</h1>
          <p className="text-on-surface-variant font-label">Semua film dan series yang ingin Anda tonton.</p>
        </div>
        <div className="bg-surface-container py-2 px-4 rounded-lg flex items-center gap-2 border border-white/5">
          <Clapperboard className="text-primary" size={20} />
          <span className="font-bold text-white">{movies.length} Title{movies.length !== 1 && 's'}</span>
        </div>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, idx) => (
            <div key={movie.id!} className="relative group">
              <MovieCard movie={movie as Movie} index={idx} />
              
              <form action={async () => {
                'use server';
                const sb = await createClient()
                await sb.from('watchlist').delete().eq('tmdb_movie_id', movie.id!).eq('user_id', user.id)
                revalidatePath('/watchlist')
              }} className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="submit" className="w-8 h-8 bg-red-600/90 text-white rounded-full flex items-center justify-center hover:bg-red-500 shadow-xl backdrop-blur-md" title="Hapus dari Watchlist">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-container rounded-2xl border border-dashed border-white/20">
          <LibraryBig size={64} className="text-primary/50 mb-4" />
          <h3 className="text-2xl font-headline font-bold text-white mb-2">Watchlist Anda Kosong</h3>
          <p className="text-on-surface-variant max-w-md mb-8 font-body">Mulai jelajahi FilmHub untuk menemukan film yang menarik dan tambahkan ke sini untuk ditonton nanti.</p>
          <a href="/discover?type=movie" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all font-label">
            Jelajahi Film
          </a>
        </div>
      )}
    </div>
  );
}
