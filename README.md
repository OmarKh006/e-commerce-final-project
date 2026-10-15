# Exclusive — React E-Commerce Storefront

A responsive, multi-page e-commerce storefront built with **React 19** and **Vite**, backed by **Supabase** (Auth + Postgres) and styled with **Tailwind CSS 4**. It covers the full customer journey: browsing, search, product details, wishlist, cart, checkout, authentication and account management, in three languages (English, Spanish, French).

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture Overview](#architecture-overview)
4. [Getting Started](#getting-started)
5. [Supabase Setup](#supabase-setup)
6. [Available Scripts](#available-scripts)
7. [Project Structure](#project-structure)
8. [State Management](#state-management)
9. [Data Layer](#data-layer)
10. [Routing](#routing)
11. [Internationalization](#internationalization)
12. [Styling & Responsiveness](#styling--responsiveness)
13. [Testing Hooks (`data-testid`)](#testing-hooks-data-testid)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)
16. [Known Limitations](#known-limitations)
17. [Contributing Guidelines](#contributing-guidelines)

---

## Features

| Area | What it does |
| --- | --- |
| **Catalog & discovery** | Home page with hero banner, flash sales, category browsing and product grids. Search page at `/search?q=…` (case-insensitive, matches product titles). `/search` alone lists everything; `?category=<id>` filters by category. |
| **Product details** | Image gallery, color/size selection, quantity stepper, ratings and customer reviews. |
| **Cart** | Add, remove and update line items; running subtotal; demo coupon `EXCLUSIVE10` (10% off). Works for guests. The header counter shows total item quantity. |
| **Wishlist** | Toggle items from any product card; "move all to cart". Works for guests. |
| **Checkout** | Validated, **simulated** checkout (no payment is collected). Orders are listed under `/account/orders`. |
| **Authentication** | Email/password sign-up and login via Supabase Auth, form validation, protected `/account` routes, session persistence, logout. |
| **Account** | Profile editing, password change, order history. |
| **i18n** | English, Spanish, French. Language is persisted and `<html lang>` is kept in sync. |
| **Static pages** | About, Contact (demo form, nothing is delivered), 404. |

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Shared client state | React Context API (cart, wishlist, auth) |
| Server state | TanStack Query 5 |
| Forms & validation | React Hook Form, Zod (plus plain controlled forms on auth pages) |
| Backend | Supabase (Auth + Postgres with Row Level Security) |
| i18n | i18next, react-i18next |
| Carousels / icons | Swiper, react-icons |
| Tooling | Vite 8, oxlint |

## Architecture Overview

```
┌──────────────────────────── Browser (SPA) ────────────────────────────┐
│                                                                       │
│  Pages ──► Organisms ──► Molecules ──► Atoms          (UI hierarchy)  │
│    │                                                                  │
│    ├── Context providers  (Wishlist ▸ Cart ▸ Auth)   client state     │
│    │        └─ persisted to localStorage (cart, wishlist)             │
│    │                                                                  │
│    └── TanStack Query hooks ──► lib/api/*  ──► Supabase JS client     │
│                                                                       │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │ HTTPS (anon key + RLS)
                          ┌─────────▼──────────┐
                          │ Supabase           │
                          │  • Auth            │
                          │  • Postgres + RLS  │
                          └────────────────────┘
```

Key decisions:

- **Context for client state, TanStack Query for server state.** Cart, wishlist and session live in Context; products, categories and profile are fetched and cached through query hooks.
- **Security via RLS, not via the client.** Only the public anon key is shipped to the browser. The catalog is public read-only; each user can read and edit only their own profile row.
- **Atomic design hierarchy** keeps components small and reusable.
- **Fail-soft configuration.** If the Supabase env vars are missing the app still renders and shows error states instead of a blank screen.

## Getting Started

### Prerequisites

- **Node.js 18+** (20 LTS recommended)
- **npm** 9+
- A free [Supabase](https://supabase.com) project

### 1. Install

```bash
git clone <your-repo-url>
cd exclusive-ecommerce
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Find both values in **Supabase → Project Settings → API**.

> **Security:** only the public **anon** key belongs in the client. Never put the `service_role` key in `.env`, the source code or any `VITE_*` variable — everything prefixed with `VITE_` is embedded in the public bundle.

### 3. Set up the database and auth

Follow [Supabase Setup](#supabase-setup) below.

### 4. Run

```bash
npm run dev
```

Open the URL printed by Vite (default `http://localhost:5173`).

## Supabase Setup

### Database schema

1. Open your project's **SQL Editor**.
2. Run the contents of [`supabase/schema.sql`](supabase/schema.sql).

The script is written for a new project and creates:

- `categories`, `products`, `product_images`, `profiles`
- **Row Level Security** on every table: public read for the catalog, own-row only for `profiles`
- A trigger (`handle_new_user`) that creates a `profiles` row on sign-up, using the `name` passed in `signUp` options
- Seed products that reference images served from `public/`

### Authentication settings

Configure these under **Authentication** in the Supabase dashboard. Sign-up and login depend on them.

| Setting | Where | Recommended value | Why |
| --- | --- | --- | --- |
| Confirm email | Providers → Email | **Off** for demos, tests and automated graders; **On** for production | When on, sign-up returns no session and the user must confirm before logging in. |
| Custom SMTP | Emails → SMTP Settings | **Enabled** for any real deployment | Supabase's built-in mailer is heavily rate-limited, intended for development, and may reject addresses whose domain has no MX record (`email_address_invalid`). |
| Site URL / Redirect URLs | URL Configuration | Your deployed URL (and `http://localhost:5173` for dev) | Required for confirmation and password-reset links. |

The sign-up form maps Supabase error codes to user-friendly messages (see [`src/pages/Signup.jsx`](src/pages/Signup.jsx) and [`src/pages/Login.jsx`](src/pages/Login.jsx)).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

Before opening a PR, run `npm run lint && npm run build`.

## Project Structure

```
.
├── public/                  # Static assets (product images, banners, favicon, _redirects)
├── supabase/
│   └── schema.sql           # Tables, RLS policies, trigger, seed data
├── src/
│   ├── components/
│   │   ├── atoms/           # Button, Input, Badge, Avatar, StarRating, ...
│   │   ├── molecules/       # ProductCard, SearchBar, CouponForm, CountdownTimer, ...
│   │   ├── organisms/       # Header, Footer, CartTable, CheckoutForm, HeroBanner, ...
│   │   └── RequireAuth.jsx  # Route guard for authenticated pages
│   ├── context/
│   │   ├── AppProviders.jsx     # Wishlist ▸ Cart ▸ Auth composition
│   │   ├── AuthContext.jsx      # Supabase session, login/signup/logout, password update
│   │   ├── CartContext.jsx      # Items, coupon, totals (localStorage)
│   │   └── WishlistContext.jsx  # Wishlisted ids (localStorage)
│   ├── data/                # Static data: countdown end dates, team members
│   ├── hooks/               # TanStack Query hooks (useProducts, useProfile)
│   ├── layouts/             # PublicLayout (announcement bar, header, footer)
│   ├── lib/
│   │   ├── api/             # Supabase queries (products, categories, profile)
│   │   ├── format.js        # Price formatting and rounding
│   │   ├── i18n.js          # i18next setup
│   │   ├── orders.js        # Simulated orders (localStorage)
│   │   ├── reviews.js       # Product reviews (localStorage)
│   │   └── supabaseClient.js
│   ├── locales/             # en.json, es.json, fr.json
│   ├── pages/               # Route-level components
│   ├── App.jsx              # Route definitions
│   ├── index.css            # Tailwind import and design tokens
│   └── main.jsx             # Entry point (providers, React Query client)
├── vercel.json              # SPA rewrite for Vercel
└── vite.config.js
```

## State Management

Shared client state lives in three Context providers composed once in `AppProviders`:

```
WishlistProvider
  └─ CartProvider
       └─ AuthProvider
            └─ App
```

`AuthProvider` is nested innermost so that `logout()` can clear the cart and wishlist.

| Hook | Exposes |
| --- | --- |
| `useCart()` | `items`, `couponCode`, `addItem`, `removeItem`, `updateQty`, `applyCoupon`, `clear`, `count`, `subtotal`, `discount`, `total` |
| `useWishlist()` | `productIds`, `isWishlisted`, `toggle`, `remove`, `clear` |
| `useAuth()` | `user`, `loading`, `signup`, `login`, `logout`, `updatePassword` |

Cart and wishlist persist to `localStorage` under `exclusive-cart` and `exclusive-wishlist`. Auth state comes from the Supabase session and stays in sync through `onAuthStateChange`.

## Data Layer

- All Supabase queries live in `src/lib/api/` and are consumed through TanStack Query hooks in `src/hooks/`. Components never call Supabase directly for catalog data.
- Auth calls are wrapped in `AuthContext` and return a uniform `{ success, error?, data? }` result so pages can branch on `error.code`.
- **Orders** and **reviews** are stored in the browser's `localStorage` (not in Supabase), so they are per-device.

## Routing

| Path | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/search` | Search / category listing | Public |
| `/product/:id` | Product details | Public |
| `/cart`, `/wishlist`, `/checkout` | Cart, wishlist, checkout | Public |
| `/login`, `/signup` | Authentication | Public |
| `/about`, `/contact` | Static pages | Public |
| `/account`, `/account/orders` | Profile, order history | Authenticated (`RequireAuth`) |
| `*` | 404 | Public |

Unauthenticated visits to protected routes redirect to `/login` and return the user to the original page after login.

## Internationalization

- Translations live in `src/locales/{en,es,fr}.json` and **must keep identical keys** across all three files.
- The active language is stored in `localStorage` under `lang` and applied to `<html lang>`.
- Change language with the `LanguageSwitcher` (`<select data-testid="lang-switch">`).
- To add a language: create `src/locales/<code>.json`, register it in `src/lib/i18n.js` (`LANGUAGES`), and translate every key.

## Styling & Responsiveness

- Tailwind CSS 4 with design tokens declared in `@theme` inside `src/index.css` (colors, fonts, shadows). Use the tokens (`text-ink`, `bg-primary`, …) instead of hard-coded values.
- **Mobile-first.** Test at **375px** (phone), **768px** (tablet) and **1280px+** (desktop). Pages must not scroll horizontally.
- Rules of thumb that prevent horizontal overflow:
  - Put `flex-wrap` on rows that mix a title and a fixed-width widget (e.g. countdowns).
  - Use `min-w-0` on flex/grid children that contain long content.
  - Use responsive padding (`px-5 sm:px-10 md:px-16`) instead of large fixed padding.
  - Give images `max-w-full` or an explicit responsive width.
- `index.css` also sets `overflow-x: clip` on `html` and `body` as a safety net. It is a guard, not a substitute for fixing the offending element.

## Testing Hooks (`data-testid`)

These attributes are relied on by automated checks. Do not rename or remove them.

`product-card`, `product-link`, `add-to-cart`, `add-to-wishlist`, `search-input`, `cart-count`, `cart-item`, `remove-from-cart`, `wishlist-item`, `checkout-form`, `place-order`, `order-success`, `signup-form`, `login-form`, `logout` (rendered only while signed in), `product-details`, `review-text`, `review-submit`, `review`, `lang-switch`.

## Deployment

The app is a client-side-routed SPA, so the host must serve `index.html` for unknown paths.

| Host | Configuration |
| --- | --- |
| **Vercel** | `vercel.json` is included (rewrites everything to `/index.html`). |
| **Netlify / Cloudflare Pages** | `public/_redirects` is included. |
| **Other** | Configure a fallback to `index.html` for all non-file requests. |

Checklist:

1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the host's environment settings. They are read **at build time**, so redeploy after changing them.
2. Build command `npm run build`, output directory `dist`.
3. Add the production URL to **Supabase → Authentication → URL Configuration**.
4. Review the [Authentication settings](#authentication-settings) (email confirmation and SMTP).

## Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Console shows `[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set` | Missing `.env` (local) or host env vars (production). Restart `npm run dev` or redeploy after setting them. |
| Sign-up shows **"Email address … is invalid"** | Rejected by Supabase, not by the app. Typically the email domain has no MX record while using the default mailer. Enable Custom SMTP, or test with a real-domain address. |
| Sign-up succeeds but login says **"Incorrect email or password"** or asks to confirm email | Email confirmation is on and the account is unconfirmed. Confirm the email, or turn off **Confirm email** for dev/test. |
| Sign-up fails with a rate-limit message | The built-in mailer allows very few emails per hour. Use Custom SMTP. |
| Home or product lists are empty or show a load error | `supabase/schema.sql` was not run, or RLS policies are missing. |
| Refreshing a deep link (e.g. `/cart`) returns 404 in production | SPA fallback not configured on the host. See [Deployment](#deployment). |
| Horizontal scroll on phones | Find the overflowing element in DevTools device mode at 375px and apply the rules in [Styling & Responsiveness](#styling--responsiveness). |

## Known Limitations

- Checkout is **simulated**: it validates the form, saves the order locally, shows a confirmation and clears the cart. No payment is processed.
- Orders and reviews are stored in `localStorage` and are not shared across devices or users.
- "Sign up with Google" is visual only; no OAuth provider is configured.
- Contact form and newsletter are demos; nothing is delivered.
- Some homepage sidebar and "view all" links are placeholders (`#`).

## Contributing Guidelines

- **Branches:** `feature/<short-name>`, `fix/<short-name>`.
- **Commits:** short, imperative subject (e.g. `Fix footer overflow on mobile`).
- **Before a PR:** `npm run lint` and `npm run build` must pass; check key pages at 375px, 768px and desktop width.
- **Components:** place new UI in the right atomic level; keep pages thin and move reusable logic into hooks or `lib/`.
- **Translations:** every new user-facing string goes into all three locale files.
- **Secrets:** never commit `.env`; never expose the `service_role` key.
