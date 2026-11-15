import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import MovieCard from '@/components/movie/MovieCard';
import { Movie } from '@/types/tmdb';
import { Clapperboard, Trash2, Film } from 'lucide-react';
import Footer from '@/components/layout/Footer';

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
    vote_average: 8.0, 
  })) || [];

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white relative z-10 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-800/90 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              My Watchlist
            </h1>
            <p className="text-zinc-400 text-xs">Semua film dan drama yang Anda simpan untuk ditonton.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 py-1.5 px-4 rounded-full flex items-center space-x-2">
            <Clapperboard className="text-[#E50914] w-4 h-4" />
            <span className="font-bold text-xs text-white">{movies.length} Title{movies.length !== 1 && 's'}</span>
          </div>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-start">
            {movies.map((movie, idx) => (
              <div key={movie.id!} className="relative group">
                <MovieCard movie={movie as Movie} index={idx} />
                
                <form action={async () => {
                  'use server';
                  const sb = await createClient();
                  await sb.from('watchlist').delete().eq('tmdb_movie_id', movie.id!).eq('user_id', user.id);
                  revalidatePath('/watchlist');
                }} className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="submit" className="w-7 h-7 bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer" title="Remove from Watchlist">
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 flex flex-col items-center">
            <Film size={48} className="mb-4 text-zinc-600" />
            <h3 className="text-lg font-bold text-white mb-2">Watchlist Kosong</h3>
            <p className="text-zinc-400 text-xs max-w-sm mb-6">
              Jelajahi berbagai film dan tambahkan ke daftar tontonan Anda dengan mengklik tombol ADD LIST.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
