# BloomShop

A modern e-commerce frontend for sneaker retail, built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

## Features

- **Product Catalog** — Browse a grid of sneaker products with hover animations and quick-actions
- **Product Details** — View images, ratings, descriptions, quantity selector, and related products
- **Shopping Cart** — Full cart with add/remove/clear, quantity controls, persistent state via `localStorage`, and order summary (subtotal, shipping, tax, total)
- **Dark / Light Mode** — Theme toggle with system preference detection and persistent storage
- **Authentication UI** — Sign in and sign up forms with password visibility toggle
- **Contact Page** — Contact form with service highlights and FAQ section
- **Responsive Design** — Mobile-first layout with Tailwind CSS
- **Newsletter Subscription** — Email input in footer (UI only)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS v4, clsx, tailwind-merge |
| Icons | lucide-react, @tabler/icons-react |
| State | React Context + useReducer |
| Linting | ESLint + Prettier |
| Package Manager | pnpm |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (with HMR)
pnpm dev

# Type-check and build for production
pnpm build

# Preview the production build
pnpm preview

# Lint source files
pnpm lint
```

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images (hero, app store badges, etc.)
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Primitives (Input, Loader, ThemeToggle)
│   ├── context/        # React Context providers (Cart, Theme)
│   ├── data/           # Mock data (products, contact info)
│   ├── layouts/        # Layout components (Navbar, Footer)
│   ├── pages/          # Route page components (6 pages)
│   ├── reducers/       # Reducer functions (cartReducer)
│   ├── utils/          # Utility functions (cn)
│   ├── App.tsx         # Root component with routes
│   ├── global.css      # Global styles + Tailwind
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
└── eslint.config.js
```

## Routes

| Route | Page |
|---|---|
| `/` | Landing / product catalog |
| `/product/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/contact` | Contact form |
| `/signin` | Sign in |
| `/signup` | Sign up |

## Screenshots
<img width="1889" height="958" alt="Screenshot from 2026-05-27 01-59-03" src="https://github.com/user-attachments/assets/d5a2676f-63c2-44fb-a452-73a238ee2eae" />
<img width="1705" height="943" alt="Screenshot from 2026-05-27 02-00-02" src="https://github.com/user-attachments/assets/4b528f52-fbdb-42d2-b6c1-5b685ffb51e3" />







## Notes

- This is a **client-side only** application using mock data — no backend or API integration
- Cart and theme preferences are persisted in `localStorage`
- Search and contact form submission are UI-only (not wired to a backend)
