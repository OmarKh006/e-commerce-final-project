-- Exclusive e-commerce: Supabase schema + seed data.
-- Run once in the Supabase SQL editor of a NEW project, then set
-- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example).
-- Column names match what src/lib/api/*.js reads.

create extension if not exists pgcrypto;

-- ───────────── Tables ─────────────
create table if not exists public.categories (
  id   uuid primary key default gen_random_uuid(),
  name text not null,
  icon text
);

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  price        numeric(10,2) not null check (price >= 0),
  old_price    numeric(10,2),
  discount_pct integer,
  rating_avg   numeric(2,1) default 0,
  review_count integer default 0,
  image_url    text,
  badge        text check (badge in ('sale','new')),
  colors       text[] default '{}',
  sizes        text[] default '{}',
  category_id  uuid references public.categories(id) on delete set null,
  in_stock     boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url        text not null,
  sort_order integer not null default 0
);

create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name  text,
  email      text,
  address    text
);

-- ───────────── Row level security ─────────────
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.profiles       enable row level security;

-- Catalog is public read-only (writes only via the dashboard / service role).
create policy "catalog read categories" on public.categories     for select using (true);
create policy "catalog read products"   on public.products       for select using (true);
create policy "catalog read images"     on public.product_images for select using (true);

-- Each user can only see and edit their own profile.
create policy "profiles select own" on public.profiles for select using (auth.uid() = id);
create policy "profiles update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles insert own" on public.profiles for insert with check (auth.uid() = id);

-- Create a profile row automatically on sign-up (name comes from signUp options.data.name).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────── Seed data (images are served from /public) ─────────────
with cats as (
  insert into public.categories (name, icon) values
    ('Phones',      'FiSmartphone'),
    ('Computers',   'FiMonitor'),
    ('SmartWatch',  'FiWatch'),
    ('Headphones',  'FiHeadphones'),
    ('Gaming',      'FiPlay'),
    ('Home',        'FiHome')
  returning id, name
)
insert into public.products
  (title, description, price, old_price, discount_pct, rating_avg, review_count, image_url, badge, colors, sizes, category_id, in_stock)
select p.title, p.description, p.price, p.old_price, p.discount_pct, p.rating, p.reviews, p.image, p.badge, p.colors, p.sizes,
       (select id from cats where name = p.cat), true
from (values
  ('Havic HV G-92 Gamepad', 'PlayStation 5 controller skin, high quality vinyl with air channel adhesive for easy bubble-free install.', 192.00, null::numeric, null::int, 4.0, 150, '/gamepad.png', 'new',  array['#A0BCE0','#E07575'], array['XS','S','M','L','XL'], 'Gaming'),
  ('AK-900 Wired Keyboard', 'Wired mechanical-feel keyboard with RGB backlight.',                                                   960.00, 1160.00, 35, 4.0,  75, '/keyboard.png',   'sale', array[]::text[], array[]::text[], 'Computers'),
  ('IPS LCD Gaming Monitor', '27 inch curved IPS gaming monitor, 165Hz.',                                                           370.00,  400.00, 30, 5.0,  99, '/monitor.png',    'sale', array[]::text[], array[]::text[], 'Computers'),
  ('ASUS FHD Gaming Laptop', '15.6 inch FHD gaming laptop with dedicated graphics.',                                                700.00, null,  null, 5.0, 325, '/gamingLaptop.png', null,  array[]::text[], array[]::text[], 'Computers'),
  ('Apple Watch Series', 'Fitness and health tracking smartwatch.',                                                                 499.00, null,  null, 4.5,  88, '/appleWatch.png', null,   array['#000000','#E07575'], array['S','M','L'], 'SmartWatch'),
  ('iPhone', 'Latest generation smartphone.',                                                                                      999.00, null,  null, 4.5, 210, '/Iphone.png',     'new',  array['#000000','#A0BCE0'], array[]::text[], 'Phones'),
  ('JBL Speaker', 'Portable Bluetooth speaker with deep bass.',                                                                    120.00,  160.00, 25, 4.5,  65, '/Speakers.png',   'sale', array[]::text[], array[]::text[], 'Headphones'),
  ('Comfort Chair', 'Ergonomic office chair with lumbar support.',                                                                 375.00,  400.00,  6, 4.5,  99, '/chair.png',      null,   array['#000000','#E07575'], array[]::text[], 'Home')
) as p(title, description, price, old_price, discount_pct, rating, reviews, image, badge, colors, sizes, cat);
