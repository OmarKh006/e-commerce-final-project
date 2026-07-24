# Exclusive — React E-Commerce Storefront

A responsive multi-page e-commerce storefront built with React 19 and Vite. It covers the full customer-facing flow — browsing, product detail, wishlist, cart, checkout, authentication, and account management — backed by Supabase and styled with Tailwind CSS.

## Features

- **Catalog & discovery** — home page with hero banners, flash sales, category browsing, and a dedicated search page
- **Product details** — gallery, color/size selection, quantity stepper, ratings
- **Cart** — add/remove/update line items, coupon codes, running subtotal
- **Wishlist** — toggle items, move all to cart
- **Auth** — email/password signup and login via Supabase Auth, protected routes, session persistence
- **Account management** — profile editing and password changes
- **Internationalization** — English and Spanish translations via i18next, with a language switcher
- **Static pages** — About, Contact, 404

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

The app expects `categories`, `products` (with related `product_images`), and `profiles` tables in Supabase — see `src/lib/api/` for the exact fields each query reads.

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
├── data/                # Local mock data
├── hooks/               # TanStack Query hooks (useProducts, useProfile, ...)
├── layouts/             # Route layouts (PublicLayout: header/footer shell)
├── lib/
│   ├── api/             # Supabase queries (products, categories, profile)
│   ├── i18n.js           # i18next setup
│   └── supabaseClient.js # Supabase client instance
├── locales/             # en.json / es.json translation resources
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

- **`useCart()`** — `items`, `couponCode`, `addItem`, `removeItem`, `updateQty`, `applyCoupon`, `clear`, `count`, `subtotal`
- **`useWishlist()`** — `productIds`, `isWishlisted`, `toggle`, `remove`, `clear`
- **`useAuth()`** — `user`, `loading`, `signup`, `login`, `logout`, `updatePassword`

`AuthProvider` is nested inside the other two so that `logout()` can clear the cart and wishlist. Cart and wishlist state are persisted to `localStorage` (`exclusive-cart` / `exclusive-wishlist`); auth state is sourced from and kept in sync with the Supabase session.

Server data (products, categories, profile) is fetched and cached separately via TanStack Query hooks in `src/hooks/`, not stored in Context.

## Internationalization

Translation strings live in `src/locales/en.json` and `src/locales/es.json`. The active language is persisted to `localStorage` under the `lang` key and can be changed from the `LanguageSwitcher` component.

## Notes

- `package.json` currently lists `zustand` as a dependency, but the codebase has migrated fully to the Context API described above — it's safe to remove `zustand` from `package.json` the next time dependencies are touched.
- Checkout is a front-end demo flow: it validates the shipping form and clears the cart on "Place Order," but does not yet persist orders to Supabase.
