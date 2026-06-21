# Chutkima — Web

The web version of the **Chutkima** mobile app — Butwal's fastest grocery dark-store.
_Tap · Snap · Deliver._ Groceries to your door in 10–15 minutes.

Built by adapting the mobile app's full user flow to a responsive web experience,
following a clean Next.js App Router architecture with Route Groups.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Styling | Tailwind CSS + a small Ant Design layer (modals, dropdowns, switches) |
| State | Redux Toolkit (`cart`, `auth`, `filter`, `favourites`) |
| Font | **Plus Jakarta Sans** (via `next/font`) |
| Data | `src/Mockdata.ts` — full catalog, no backend needed |
| Brand | Green `#0e7a5f` (sampled from the app) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /home
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # root: Plus Jakarta font + Redux + Antd providers
│  ├─ page.tsx                # redirects → /home
│  ├─ onboarding/             # full-screen intro carousel (app splash slides)
│  ├─ (shop)/                 # public storefront (Navbar + Footer + bottom nav + sticky cart)
│  │  ├─ home, search, categories, categories/[slug]
│  │  ├─ product/[id]
│  │  ├─ cart, checkout/address, checkout/payment
│  │  ├─ order/success, order/[id]/track
│  │  └─ order-again
│  ├─ (auth)/                 # login (phone) + verify (OTP), split-screen brand layout
│  ├─ (account)/              # user dashboard: addresses, favourites, wallet, orders, notifications
│  └─ (info)/                 # about, privacy, terms, refund, faq
├─ components/
│  ├─ ui/                     # Tile, Price, DiscountBadge, Logo (base elements)
│  ├─ layout/                 # Navbar, Footer, MobileBottomNav, StickyCartBar, sidebars, buttons
│  ├─ shared/                 # ProductCard, ProductGrid, ProductRail, CategoryCard, AddToCart…
│  ├─ web-pages/              # large page sections (HomeHero, CartView, CheckoutSteps, …)
│  └─ providers/              # ReduxProvider, AntdProvider
├─ redux/                     # store, typed hooks + derived cart selectors, slices
├─ lib/                       # utils (currency, dynamic delivery fee), legal copy
├─ types/                     # shared TypeScript types
└─ Mockdata.ts                # categories, products, orders, addresses, wallet, payments, FAQ
```

## App flow → web mapping

| Mobile app | Web |
|---|---|
| Onboarding (splash + 3 slides) | `/onboarding` full-screen carousel |
| Phone + OTP auth, "Shop as Guest" | `/login` → `/verify`, split brand layout |
| Home (location, search, chips, best sellers, category grids, promos, sticky cart) | `/home` with wide desktop header & multi-column grids |
| Category index + category detail (sidebar + filters) | `/categories`, `/categories/[slug]` |
| Product details | `/product/[id]` two-column |
| Cart → Address → Payment → Success → Live tracking | `/cart`, `/checkout/*`, `/order/*` |
| Order Again (last order + staples) | `/order-again` |
| Profile hub + sub-pages + legal | `(account)` dashboard + `(info)` pages |

## Notes / web adaptations

- **Responsive**: app-like single column on mobile (with bottom tab bar), wide
  multi-column layout with a top nav on desktop.
- **Dynamic delivery fee** (the app's "more you add, less you pay") is implemented
  in `lib/utils.ts` and shown live in the cart.
- **Product imagery** uses tinted emoji tiles so there are never broken images and
  no external image dependencies. Swap `Tile` for `<Image>` when real photos exist.
- **Promo codes** to try in the cart: `CHUTKIMA10`, `WELCOME50`, `FREESHIP`.
- All data is mock — replace `Mockdata.ts` reads with API calls to go live.
