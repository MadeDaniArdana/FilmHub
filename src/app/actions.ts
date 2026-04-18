'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addToWatchlist(movieId: number, title: string, posterPath: string | null) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Anda harus login untuk menambahkan ke watchlist' };
  }

  const { error } = await supabase.from('watchlist').insert({
    user_id: user.id,
    tmdb_movie_id: movieId,
    movie_title: title,
    poster_path: posterPath,
  });

  if (error) {
    if (error.code === '23505') {
      return { error: 'Film sudah ada di watchlist Anda' };
    }
    return { error: error.message };
  }

  revalidatePath('/watchlist');
  return { success: true };
}
