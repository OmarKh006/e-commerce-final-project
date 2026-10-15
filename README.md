# Exclusive — React E-Commerce Storefront

A responsive multi-page e-commerce storefront built with React 19 and Vite. It covers the full customer-facing flow — browsing, product detail, wishlist, cart, checkout, authentication, and account management — backed by Supabase and styled with Tailwind CSS.

## Features

- **Catalog & discovery** — home page with hero banners, flash sales, category browsing, and a search page (`/search?q=…`, case-insensitive, matches product titles; `/search` alone lists everything; `?category=<id>` filters by category)
- **Product details** — gallery, color/size selection, quantity stepper, ratings, and customer reviews (stored per browser in `localStorage`; see `src/lib/reviews.js`)
- **Cart** — add/remove/update line items, running subtotal, demo coupon `EXCLUSIVE10` (10% off). Works for guests. The header counter shows total item quantity.
- **Wishlist** — toggle items from any product card, move all to cart. Works for guests.
- **Checkout** — validated, simulated checkout (no payment is collected). Orders are saved to `localStorage` and listed under `/account/orders`.
- **Auth** — email/password signup and login via Supabase Auth, validation, protected `/account` routes, session persistence, logout
- **Account management** — profile editing, password changes, order history
- **Internationalization** — English, Spanish and French via i18next (`<select data-testid="lang-switch">`, persisted, sets `<html lang>`)
- **Static pages** — About, Contact (demo form; messages are not actually delivered), 404

## Tech Stack

| Layer                        | Tools                                    |
| ---------------------------- | ---------------------------------------- |
| UI                           | React 19, React Router 7                 |
| Styling                      | Tailwind CSS 4                           |
| State                        | React Context API (cart, wishlist, auth) |
| Server state / data fetching | TanStack Query                           |
| Forms & validation           | React Hook Form, Zod                     |
| Backend                      | Supabase (Auth + Postgres)               |
| i18n                         | i18next, react-i18next                   |
| Tooling                      | Vite, oxlint                             |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (URL + anon key)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then create the database: open your Supabase project's **SQL editor** and run [`supabase/schema.sql`](supabase/schema.sql). It creates `categories`, `products`, `product_images` and `profiles` with row-level security (public read for the catalog, own-row only for profiles), a trigger that creates a profile on sign-up, and seed products that use the images in `public/`.

For quick testing, turn off **Authentication → Providers → Email → Confirm email** so sign-up logs the user in immediately; otherwise the app shows a "check your email" message.

Only the public anon key belongs in the client. Never put the `service_role` key in `.env` or the source.

### Development

```bash
npm run dev
```

Starts the Vite dev server with hot module replacement.

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

### Deployment

The app uses client-side routing, so the host must serve `index.html` for unknown paths. `public/_redirects` (Netlify / Cloudflare Pages) and `vercel.json` (Vercel) are included. Hash-style URLs such as `/#/cart` are rewritten to `/cart` on load. Set the two `VITE_SUPABASE_*` variables in the host's environment settings.

### Required `data-testid` attributes

`product-card`, `product-link`, `add-to-cart`, `add-to-wishlist`, `search-input`, `cart-count`, `cart-item`, `remove-from-cart`, `wishlist-item`, `checkout-form`, `place-order`, `order-success`, `signup-form`, `login-form`, `logout` (only while signed in), `product-details`, `review-text`, `review-submit`, `review`, `lang-switch`.

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Smallest building blocks (Button, Input, Badge, ...)
│   ├── molecules/      # Composed of atoms (ProductCard, SearchBar, CouponForm, ...)
│   ├── organisms/      # Composed of molecules (Header, CartTable, CheckoutForm, ...)
│   └── RequireAuth.jsx # Route guard for authenticated pages
├── context/             # React Context providers — the app's source of truth for shared state
│   ├── AppProviders.jsx    # Composes Wishlist > Cart > Auth in the correct nesting order
│   ├── AuthContext.jsx     # Supabase session, login/signup/logout, password updates
│   ├── CartContext.jsx     # Cart items, coupon, subtotal — persisted to localStorage
│   └── WishlistContext.jsx # Wishlisted product ids — persisted to localStorage
├── data/                # Countdown end dates and team-member data for static sections
├── hooks/               # TanStack Query hooks (useProducts, useProfile, ...)
├── layouts/             # Route layouts (PublicLayout: header/footer shell)
├── lib/
│   ├── api/             # Supabase queries (products, categories, profile)
│   ├── format.js         # Price formatting / rounding
│   ├── i18n.js           # i18next setup (en, es, fr)
│   ├── orders.js         # Simulated orders (localStorage)
│   ├── reviews.js        # Product reviews (localStorage)
│   └── supabaseClient.js # Supabase client instance
├── locales/             # en.json / es.json / fr.json translation resources
├── pages/                # Route-level page components
├── App.jsx               # Route definitions
└── main.jsx               # App entry point, providers, React Query client
```

Components follow an atoms → molecules → organisms hierarchy: atoms are unstyled-opinion primitives, molecules combine a few atoms into a reusable unit, and organisms assemble those into page sections.

## State Management

Shared application state lives in three React Context providers (`src/context/`), composed once in `AppProviders`:

```
WishlistProvider
  └─ CartProvider
       └─ AuthProvider
            └─ App
```

- **`useCart()`** — `items`, `couponCode`, `addItem`, `removeItem`, `updateQty`, `applyCoupon`, `clear`, `count`, `subtotal`, `discount`, `total`
- **`useWishlist()`** — `productIds`, `isWishlisted`, `toggle`, `remove`, `clear`
- **`useAuth()`** — `user`, `loading`, `signup`, `login`, `logout`, `updatePassword`

`AuthProvider` is nested inside the other two so that `logout()` can clear the cart and wishlist. Cart and wishlist state are persisted to `localStorage` (`exclusive-cart` / `exclusive-wishlist`); auth state is sourced from and kept in sync with the Supabase session.

Server data (products, categories, profile) is fetched and cached separately via TanStack Query hooks in `src/hooks/`, not stored in Context.

## Internationalization

Translation strings live in `src/locales/{en,es,fr}.json` (all three have identical keys). The active language is persisted to `localStorage` under the `lang` key and can be changed from the `LanguageSwitcher` component.

## Notes

- Checkout is a simulated flow: it validates the form, saves the order locally, shows a confirmation and clears the cart. No payment is processed.
- Reviews and orders are stored in the visitor's browser, not in Supabase, so they are not shared between devices.
- The "Sign up with Google" button is visual only (no OAuth provider is configured).
