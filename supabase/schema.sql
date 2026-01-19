-- Create tables
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  bio text
);

create table designs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  image_url text,
  image_urls text[],
  category text,
  user_id uuid references profiles(id) on delete cascade not null,
  tools text[],
  tags text[]
);

create table likes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete cascade not null,
  design_id uuid references designs(id) on delete cascade not null,
  unique(user_id, design_id)
);

create table saves (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete cascade not null,
  design_id uuid references designs(id) on delete cascade not null,
  unique(user_id, design_id)
);

create table views (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete set null,
  design_id uuid references designs(id) on delete cascade not null
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;
alter table designs enable row level security;
alter table likes enable row level security;
alter table saves enable row level security;
alter table views enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Designs are viewable by everyone." on designs
  for select using (true);

create policy "Users can insert their own designs." on designs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own designs." on designs
  for update using (auth.uid() = user_id);

create policy "Users can delete own designs." on designs
  for delete using (auth.uid() = user_id);

create policy "Likes are viewable by everyone." on likes
  for select using (true);

create policy "Users can insert their own likes." on likes
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own likes." on likes
  for delete using (auth.uid() = user_id);

create policy "Saves are viewable by everyone." on saves
  for select using (true);

create policy "Users can insert their own saves." on saves
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own saves." on saves
  for delete using (auth.uid() = user_id);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('designs', 'designs', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Design images are publicly accessible." on storage.objects
  for select using (bucket_id = 'designs');

create policy "Anyone can upload a design." on storage.objects
  for insert with check (bucket_id = 'designs');

-- Notifications Table
create table notifications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete cascade not null, -- Receiver
  actor_id uuid references profiles(id) on delete cascade not null, -- Triggerer
  type text not null, -- 'like', 'message', 'comment'
  design_id uuid references designs(id) on delete cascade, -- Optional
  content text, -- Optional message snippet
  is_read boolean default false not null
);

alter table notifications enable row level security;

create policy "Users can view their own notifications." on notifications
  for select using (auth.uid() = user_id);

create policy "System/Users can insert notifications." on notifications
  for insert with check (true); -- Usually inserted via server actions or triggers

create policy "Users can update their own notifications." on notifications
  for update using (auth.uid() = user_id);

-- Messages Table (Simple 1-on-1)
create table messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  receiver_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  is_read boolean default false not null
);

alter table messages enable row level security;

create policy "Users can view messages they sent or received." on messages
  for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can insert their own messages." on messages
  for insert with check (auth.uid() = sender_id);

create policy "Users can update messages they received (to mark as read)." on messages
  for update using (auth.uid() = receiver_id);
