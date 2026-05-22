# NaturalSkincare

A full-stack e-commerce webshop for natural skincare products. The project evolved across three milestones: a static multi-page site, a Node.js-backed vanilla JS app, and a React + TypeScript single-page application.

---

## Features

- Browse and filter products by category, skin type, and collection
- Product detail page with ingredients, how-to-use, and add-to-cart
- Shopping cart with quantity controls and simulated checkout
- User registration with real-time form validation (first name, last name, email)
- Registered user's name displayed on the home page and cart page
- Persistent session: registration survives page reloads via localStorage

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| State | Context API (AuthContext, CartContext) |
| Forms | React Hook Form + Zod |
| Styling | Bootstrap 5, Bootstrap Icons, custom CSS |
| Backend | Node.js, Express |
| Storage | JSON file (`server/data/data.json`) |
| Dev tooling | concurrently, Vite dev proxy |

---

## Project structure

```
NaturalSkincare/
├── package.json          — root scripts (dev, build)
├── server/               — Express REST API (JavaScript)
│   ├── app.js
│   ├── data/data.json
│   ├── products/
│   ├── categories/
│   └── cart/
└── client/               — React + TypeScript SPA
    ├── public/img/        — product images
    └── src/
        ├── main.tsx
        ├── App.tsx        — router + context providers
        ├── types/         — TypeScript interfaces
        ├── utils/         — localStorage helpers
        ├── api/           — fetch wrappers for each resource
        ├── contexts/      — AuthContext, CartContext
        ├── components/    — Layout, Navbar, Footer, ProductCard
        └── pages/         — one file per route (9 pages)
```

---

## Installation

**Requirements:** Node.js 18+, npm 9+

```bash
# Clone the repository
git clone https://github.com/MyJersey/Framework.git
cd Framework

# Install root dependencies (concurrently)
npm install

# Install server dependencies
npm --prefix server install

# Install client dependencies
npm --prefix client install
```

---

## Usage

### Development (recommended)

Starts both the Express server and the Vite dev server in parallel:

```bash
npm run dev
```

- Client: `http://localhost:5173`
- API: `http://localhost:3000`

Vite proxies all `/products`, `/categories`, and `/cart` requests to the Express server automatically.

### Run separately

```bash
npm run dev:server    # Express only  → http://localhost:3000
npm run dev:client    # Vite only     → http://localhost:5173
```

### Production build

```bash
npm run build         # builds client/dist/
```

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/products` | All products. Filters: `?skin=`, `?collection=` |
| GET | `/products/:id` | Single product by ID |
| GET | `/categories` | List of categories |
| GET | `/categories/:category/products` | Products in a category. Filters: `?skin=`, `?collection=` |
| POST | `/cart/:user` | Create cart for user |
| GET | `/cart/:user` | Get cart contents |
| POST | `/cart/:user/:productId` | Add one unit to cart |
| DELETE | `/cart/:user/:productId` | Remove one unit from cart |
| DELETE | `/cart/:user/:productId/all` | Remove all units of a product |

---

## Authors

- Gabriele Matteoli
- Giulia Migliorini
- Luca Bailo
- Sergio Brancato
- Zhuowa Wang
- ITU Copenhagen — Frameworks course, 2026
