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
<img width="1881" height="1079" alt="image" src="https://github.com/user-attachments/assets/d9254c73-db70-480e-99d1-7a9cbd97db6e" />
<img width="1910" height="1075" alt="image" src="https://github.com/user-attachments/assets/c7fd17ab-f5a7-40a9-8e1c-ddb27a0dc627" />
<img width="1705" height="943" alt="Screenshot from 2026-05-27 02-00-02" src="https://github.com/user-attachments/assets/4b528f52-fbdb-42d2-b6c1-5b685ffb51e3" />
<img width="1906" height="1079" alt="image" src="https://github.com/user-attachments/assets/4bb2c7ee-a5e3-415b-9fb4-078cdf2b9c18" />
<img width="1875" height="1073" alt="image" src="https://github.com/user-attachments/assets/8bfb69c1-0f3e-49f1-83ce-4afa0a81bea2" />
<img width="1921" height="842" alt="image" src="https://github.com/user-attachments/assets/9368faed-7b78-4d05-8037-14d3aa8e2b59" />
<img width="1906" height="862" alt="image" src="https://github.com/user-attachments/assets/40b35697-6376-45fe-8bd9-0b1f56c34724" />
<img width="1904" height="567" alt="image" src="https://github.com/user-attachments/assets/fe29e0dc-3d9f-484c-b7d7-3c3643371440" />

## Notes

- This is a **client-side only** application using mock data — no backend or API integration
- Cart and theme preferences are persisted in `localStorage`
- Search and contact form submission are UI-only (not wired to a backend)
