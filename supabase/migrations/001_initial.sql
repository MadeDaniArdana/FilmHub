-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  bio text,
  favorite_genres text[],
  created_at timestamptz default now()
);

-- Watchlist table
create table public.watchlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  tmdb_movie_id integer not null,
  movie_title text not null,
  poster_path text,
  status text default 'want_to_watch',
  added_at timestamptz default now(),
  unique(user_id, tmdb_movie_id)
);

-- RLS Policies for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- RLS Policies for watchlist
alter table public.watchlist enable row level security;
create policy "Users can view own watchlist." on public.watchlist for select using (auth.uid() = user_id);
create policy "Users can insert into own watchlist." on public.watchlist for insert with check (auth.uid() = user_id);
create policy "Users can update own watchlist." on public.watchlist for update using (auth.uid() = user_id);
create policy "Users can delete from own watchlist." on public.watchlist for delete using (auth.uid() = user_id);

-- Trigger to automatically create a profile when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
