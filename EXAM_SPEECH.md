# Exam Presentation Speech — Natural Skincare
### Project 3 · Group 6 · 10-minute oral presentation

> **Format reminders**
> - Part 1 – Functional demo: **2–3 min** (live app)
> - Part 2 – Web UI design: **2–3 min** (live app)
> - Part 3 – Software architecture: **3–5 min** (live app + source code)
> - After this: 10-min Q&A from the professor → see [Q&A section](#qa-preparation) below

---

## ▶ PART 1 — Functional Demo `[0:00 – 2:30]`

> **Screen:** live app running at `localhost:5173`, start on Home page

---

**[0:00]** *(open with a single clear statement about what the project is)*

"Our project is **Natural Skincare** — an e-commerce Single-Page Application for skincare products. It's composed of two independent systems: a **React and TypeScript** client, and a **Node.js/Express** RESTful API server. I'll walk through the functionality first, then the design, and then the architecture."

---

**[0:25]** *(point at the Home page — hero section, product rows)*

"On the Home page, the user lands on a full-width hero section. Below it, products are organized into three pre-filtered sections: **New Arrivals**, **Bestsellers**, and **Featured Products**. These are not three separate datasets — they're curated views of the same product catalogue, filtered by the `isNew` and `isBestseller` flags that come from the API."

---

**[0:45]** *(click 'Shop' in the navbar)*

"Moving to the **Shop page** — this is the main browsing area. On the left there is a filter panel with three independent dimensions:  
- a **Category dropdown**, with values like Cleanser, Serum, Cream, Mask;  
- **Skin Type checkboxes** — Sensitive, Dry, Combination, Oily, Mature;  
- **Collection checkboxes** — Bestsellers and New Arrivals.

*(select 'Serums' from the dropdown)*

When I select *Serums*, the product grid updates immediately — no page reload. The filter triggers a new API call to `GET /categories/serums/products`. If I also check *Dry Skin*, the URL becomes `GET /categories/serums/products?skin=Dry`. Filters **compose**: the server receives all active filters as query parameters and applies them together."

> **⚑ Defend:** *"Why call the category endpoint instead of filtering on the client?"*  
> Because filtering on the client means downloading all 20 products every time. Calling the server's category endpoint is more semantically correct and scales to a real catalogue. The professor actually gave us feedback on Project 2 to move from `GET /products?category=` to `GET /categories/:category/products` — a path-based design that makes the resource hierarchy explicit.

---

**[1:15]** *(click on a product card)*

"Clicking a product navigates to the **Product Detail** page. The URL changes to `/product/7` — React Router handles this client-side, without a server round-trip for the HTML. The page shows the full product info: name, price, description, skin type, ingredients list, how-to-use instructions, and a quantity selector."

*(click ADD TO CART button)*

"I click *Add to Cart*. Notice the **badge on the cart icon in the navbar** updates from 0 to 1, instantly. That's the lifted-state pattern — I'll explain it in the architecture section."

---

**[1:45]** *(click the cart icon)*

"On the **Cart page**, I can see the item, adjust the quantity with the plus and minus buttons, or remove it entirely with the trash icon. The right-side summary recalculates the total in real time. All cart operations call the server — `POST /cart/guest/:productId` to add, `DELETE /cart/guest/:productId` to remove — so the cart is always in sync with `data.json`."

---

**[2:05]** *(navigate to /register)*

"Finally, the **Registration form** — this is the main new requirement for Project 3. *(type a single character in First Name)* I type just one letter and immediately get: *'First name must be at least 2 characters'*. The validation runs on every keystroke, before the user even tries to submit. *(fill in all fields correctly)* When every field is valid, the REGISTER button activates. *(submit)* After registration, I'm redirected to the Home page and I can see the greeting updated: *'Hi, Gabriele'* appears in the navbar. The user's name is persisted in `localStorage` so it survives a page refresh."

---

## ▶ PART 2 — Web UI Design `[2:30 – 5:00]`

> **Screen:** keep app open, navigate through pages to illustrate each point

---

**[2:30]**

"Let me now talk about the web design decisions."

### Information Architecture

"The product catalogue is structured around **three independent taxonomies**:

1. **Category** — the functional classification (Cleanser, Serum, Cream, Mask, Oil, Toner, SPF). This is the primary navigation axis: we expose it as both the Shop dropdown and the URL path `/categories/:category/products`.
2. **Skin Type** — an attribute taxonomy (Sensitive, Dry, Combination, Oily, Mature). It cross-cuts categories: a Serum can be for Dry or Oily skin simultaneously.
3. **Collection** — an editorial grouping (Bestsellers, New Arrivals). These collections are surfaced in two completely different ways: as **filter checkboxes** in Shop, and as **dedicated sections** on the Home page. So a user can reach the same Bestseller product from the home section, or by ticking the checkbox in the shop.

The content hierarchy has **three levels**: Home (overview), Shop (full catalogue + filtering), and Product Detail (single item). Cart and Register are transactional areas that sit outside the hierarchy."

---

**[3:10]**

### Navigation Layers

*(hover over navbar as you explain each)*

"We implemented **four navigation layers simultaneously**:

1. **Primary navigation** — the top navbar with Home, Shop, Contact, About Us. It's `sticky-top` so it's always visible while scrolling.
2. **Utility navigation** — the right side of the navbar: the user icon (links to Login/Register) and the cart badge.
3. **Contextual navigation** — the breadcrumb on the Product Detail page: *Shop > Serums*. *(navigate to a product and point to the breadcrumb)* This tells the user exactly where they are in the hierarchy and how to go back.
4. **Footer navigation** — repeats key links (Shop, About, Contact, policy pages) for users who reach the bottom."

---

**[3:40]**

### Design Principles

"Three design principles are especially visible:

**Consistency**: we have a single `ProductCard` component used in both the Home page sections and the Shop grid. The card always looks the same — same layout, same price color, same 'Add to Cart' button — regardless of where it appears. This is a direct consequence of component-based architecture.

**Visibility of system status** (Nielsen heuristic #1): the cart badge updates immediately every time an item is added or removed. The user never has to guess whether their action was registered.

**Responsiveness**: *(resize the browser window)* the layout adapts to any screen size using **Bootstrap 5's 12-column grid**. The filter sidebar stacks below the product grid on mobile. The navbar collapses to a hamburger menu. We don't write custom breakpoint CSS — Bootstrap handles it with `col-lg-3`, `col-lg-9`, `navbar-expand-lg`."

> **⚑ Defend:** *"Why Bootstrap instead of plain CSS?"*  
> Bootstrap gives us a production-quality responsive grid and a set of consistent UI components (form controls, buttons, badges, navbar) without building from scratch. Since the scope was an e-commerce prototype, not a brand-identity exercise, it was the correct tool for the given timeframe.

---

## ▶ PART 3 — Software Architecture `[5:00 – 10:00]`

> **Screen:** switch between app and VS Code / file explorer to show actual files

---

**[5:00]**

### Physical Architecture

"Physically, we have a **two-tier architecture**. The React client runs on port **5173** through Vite's dev server. The Express API runs on port **3000**. They communicate exclusively over HTTP — the client knows nothing about the server's file system, and the server knows nothing about React.

*(open `client/vite.config.ts`)*

During development, Vite's built-in **reverse proxy** forwards any request whose path starts with `/products`, `/categories`, or `/cart/` to `localhost:3000`. This means the browser always talks to port 5173, so there's no CORS problem. The proxy rule for `/cart/` uses a regex pattern — `^/cart/` — because `/cart` alone is a React route that must load the SPA, not call the server.

The project is a **monorepo**: a root `package.json` with `concurrently` starts both `npm run dev` commands with a single `npm run dev` from the root."

---

**[5:45]**

### Client — Five-Layer Structure

*(open the `client/src/` folder)*

"On the client, I organized the code into **five layers**:

1. **`types/index.ts`** — TypeScript interfaces: `Product`, `CartItem`, `Category`, `RegisteredUser`. These are the shared data contracts. If the server changes a field name, TypeScript catches every affected reference at compile time.

2. **`api/`** — three files (`products.ts`, `categories.ts`, `cart.ts`) that wrap every `fetch()` call and return typed Promises. No UI logic lives here — it's a pure data-access layer.

3. **`contexts/`** — global state management. I have `AuthContext` for the registered user and `CartContext` for the cart badge count. Both expose custom hooks — `useAuth()` and `useCart()`.

4. **`components/`** — reusable UI elements: `Layout`, `Navbar`, `Footer`, `ProductCard`.

5. **`pages/`** — nine page components, each owning its own local state."

---

**[6:30]**

### Context API & Lifted State

*(open `AuthContext.tsx`)*

"The two contexts are the most architecturally interesting part of the client.

`AuthContext` holds the registered user object. On mount, `useState` is initialized with `getStoredUser` — a function reference, not a call result — so React reads `localStorage` lazily, only once. The context exposes `register()`, `login()`, and `logout()` as named functions. Every component that needs to know who is logged in calls `useAuth()` and reads `user`.

*(open `CartContext.tsx`)*

`CartContext` holds `itemCount` — the total number of items across all cart entries. This is the **lifted state** pattern. The problem it solves: the Navbar needs to display the badge count, but cart operations happen deep inside `ProductDetail` and `Cart`. If we passed the count down through props, every intermediate component would need to accept and forward it — that's **prop drilling**. By lifting the count into a Context, `Navbar` reads it directly via `useCart().itemCount`, and `ProductDetail` triggers `useCart().refresh()` after adding an item — no props involved at all.

*(point to the `useCallback` in CartContext)*

`refresh` is wrapped in `useCallback` with an empty dependency array. This gives it a **stable reference** across renders. Without `useCallback`, every re-render of `CartProvider` would create a new `refresh` function object. Since `refresh` is listed in the `useEffect` dependency array — the one that loads the initial cart count — a new reference on every render would trigger the effect again, causing an **infinite loop**."

> **⚑ Defend:** *"Why not use Redux or Zustand for state management?"*  
> Context API is sufficient for two small slices of global state: a user object and a single integer count. Redux adds boilerplate (actions, reducers, dispatchers) that is only justified when the state is large, shared by many components, or frequently updated. We chose the lightest tool that solved the actual problem.

---

**[7:45]**

### React Router v6 & Layout Pattern

*(open `App.tsx`)*

"All nine routes are nested under a single **`<Route element={<Layout />}>`** parent. `Layout.tsx` renders `<AppNavbar />`, then `<Outlet />`, then `<AppFooter />`. `Outlet` is where React Router injects the matched child page. This means the navigation shell is **defined once**, not in every page component.

The provider nesting order in `App.tsx` is also intentional: `CartProvider` is inside `AuthProvider`. This is forward-compatible design — if a future version requires the cart to scope by user, `CartContext` can already read from `AuthContext` without restructuring the tree.

In `Navbar.tsx`, `NavLink` automatically adds an `active` class when the current URL matches. The `end` prop on the `/` link is critical: without it, the Home link would stay active on every page because every URL starts with `/`."

---

**[8:30]**

### Registration Form — Zod + React Hook Form

*(open `Register.tsx`)*

"For the registration form, we use **Zod** for schema definition and **React Hook Form** for form state management.

The Zod schema is defined once — it specifies the shape and the validation rules together. `z.infer<typeof schema>` then **derives the TypeScript type automatically**. We don't write an interface separately and keep it in sync with the schema — there is only one source of truth.

React Hook Form connects directly to native DOM inputs via `register()`, so it does not store field values in React state. This means typing into the form does **not cause re-renders** — it is far more performant than a controlled-input approach where `useState` updates on every keystroke.

`mode: 'onChange'` runs the Zod resolver after every keystroke. When all fields pass, `formState.isValid` becomes `true`, and the `disabled` attribute on the submit button is removed. The user gets instant, field-level feedback without ever clicking submit.

The cross-field refinement — `passwords must match` — uses Zod's `.refine()` method, attaching the error to `confirmPassword`."

---

**[9:15]**

### Server — Router/Controller Pattern

*(open `server/app.js` and the `products/` folder)*

"On the server, `app.js` is just 17 lines: it creates the Express app, mounts the three routers, and starts listening. No handler logic is there.

Each resource has a **Router** — `products.router.js` — which maps HTTP method + path to a controller function. And a **Controller** — `products.controller.js` — which contains all the handler logic: reading from `data.json`, applying filters, responding with JSON.

All file I/O is centralized in `dataAccess.js`, a shared module with `readData()` and `writeData()`. No controller imports `fs` directly — this is the **single-responsibility principle**: one module owns persistence.

Data is stored in a single `data.json` with two top-level keys: a `products` array of 20 items, and a `carts` object keyed by user ID — always `'guest'` in this implementation. All cart endpoints use `:user` as a URL parameter, so the design already supports multiple users without structural changes."

---

**[9:55]** *(wrap up — one sentence)*

"That covers the main architecture. Happy to go into more detail on any of these decisions."

---
---

# Q&A Preparation

> The professor will ask **extra project questions** and **2 random questions from topics I–VIII**.  
> Be ready to answer fluently on ANY part of the project — the excuse *"I didn't do that part"* is not accepted.

---

## Project-Specific Questions

### "What's the difference between MPA and SPA? Which one is this?"

> This is a **Single-Page Application**. In an MPA (Multi-Page Application), every navigation triggers a full HTTP request to the server, which responds with a new HTML document. The browser re-renders the entire page on every click.  
> In a SPA, the browser loads one HTML file once. React Router intercepts all link clicks and updates the DOM in place — no full page reload, no round-trip for HTML. Only data (JSON) is fetched from the server. The result is faster navigation and a more app-like feel.  
> The trade-off: SPAs require JavaScript to render content, so initial load can be slower, and SEO requires extra work (SSR or static generation). For an e-commerce prototype, neither was a concern.

---

### "How does React Router handle navigation without reloading the page?"

> React Router uses the **HTML5 History API** (`pushState` / `replaceState`) to update the browser URL without triggering a page reload. When a `<Link>` or `<NavLink>` is clicked, React Router calls `pushState` to change the URL, then re-renders the matched `<Route>` inside the `<Outlet>`. The server never receives a new request for the HTML — it only receives API requests.

---

### "How does Context state update propagate to components?"

> When `setUser(u)` is called in `AuthContext`, React re-renders `AuthProvider` with the new state value. The new value is passed down through `AuthContext.Provider`'s `value` prop. Every component that consumes this context via `useAuth()` / `useContext(AuthContext)` automatically re-renders with the new value — React's reconciler handles this. No manual subscription is needed.

---

### "How do you render a list of products?"

> With `Array.map()`. For example in `Shop.tsx`:
> ```tsx
> {products.map(product => (
>   <ProductCard key={product.id} product={product} />
> ))}
> ```
> The `key` prop is mandatory — React uses it to identify which DOM nodes to update when the list changes. Using the stable `product.id` is correct; using the array index would cause incorrect diffs if the list is sorted or filtered.

---

### "What is a TypeScript interface? How does it differ from a class?"

> An interface is a **compile-time-only type contract**. It describes the shape of an object — what properties it has and what types they are — but produces **zero JavaScript at runtime**. It cannot be instantiated.  
> A class is a **runtime construct**: it compiles to JavaScript, can be instantiated with `new`, and can hold methods and private state.  
> We use interfaces (`Product`, `CartItem`, `RegisteredUser`) throughout the project because we only need type-checking — the objects themselves come from JSON and don't need constructor logic.

---

### "What is type inference in TypeScript?"

> TypeScript infers a variable's type from the value it is initialized with, without requiring an explicit annotation.  
> Example: `const [products, setProducts] = useState<Product[]>([])` — we annotate the generic because the initial value `[]` alone doesn't give TypeScript enough information. But `const count = items.reduce((sum, item) => sum + item.quantity, 0)` — TypeScript infers `count: number` automatically.  
> `z.infer<typeof schema>` in `Register.tsx` is the most powerful form of inference: Zod derives a full TypeScript type from a runtime validation schema, so there is one single source of truth.

---

### "Explain `async/await` and Promises"

> `fetch()` returns a `Promise` — an object representing a value that will be available in the future. Instead of chaining `.then()` callbacks, we use `async/await`: an `async` function can `await` a Promise, pausing execution of that function (but not blocking the main thread) until the Promise resolves.  
> In our API layer, every function is `async` and returns a typed Promise, e.g.:
> ```ts
> export async function getAllProducts(filters?: Filters): Promise<Product[]> {
>   const res = await fetch(`/products?${buildQuery(filters)}`)
>   return res.json()
> }
> ```
> In the calling component, this is used inside `useEffect` with an async IIFE or with `.then()` because `useEffect`'s callback cannot itself be `async` (it would return a Promise where React expects either nothing or a cleanup function).

---

### "What are `map`, `filter`, and `reduce`?"

> All three are **higher-order functions** on arrays — they take a function as argument and do not mutate the original array.  
> - `map(fn)` transforms each element, returns a new array of the same length. Used constantly in JSX to render lists.  
> - `filter(fn)` returns a new array containing only elements for which `fn` returns `true`. Used in the server controller to apply skin-type and collection filters.  
> - `reduce(fn, init)` collapses an array to a single value. Used in `CartContext` to sum item quantities: `items.reduce((sum, item) => sum + item.quantity, 0)`.

---

### "What is the RESTful architectural style?"

> REST (Representational State Transfer) is an architectural style for network APIs based on six constraints:
> 1. **Client-server**: the UI and data storage are separated.
> 2. **Stateless**: each request carries all the information needed; the server does not store client session state.
> 3. **Uniform interface**: resources are identified by URLs; representations (JSON) are sent in request/response bodies; self-descriptive messages.
> 4. **Layered system**: the client can't tell if it's talking to the real server or a proxy.
> 5. **Cacheable**: responses can indicate whether they can be cached.
> 6. **Code on demand** (optional): servers can send executable code.
>
> In our project: resources are `/products`, `/categories`, `/cart/:user`. HTTP verbs express intent (GET = read, POST = create/update, DELETE = delete). The server is stateless — the cart's owner is in the URL (`/cart/guest`), not in a session. Responses are JSON.

---

### "OOP vs. Functional Programming in this project"

> The server (JavaScript) uses a largely **procedural/functional** style: standalone functions in controllers, pure helper functions in `dataAccess.js`, `filter()` / `map()` for data transformations.  
> The client (TypeScript) is **functional React**: all components are functions, state is managed with hooks, side effects are declared with `useEffect`. There are no class components, no `this`, no inheritance hierarchies.  
> We do use **OOP concepts implicitly**: TypeScript interfaces are structural typing (similar to OOP contracts), and the Context pattern mirrors the Facade design pattern — exposing a simple interface over more complex internal logic.

---

### "Why images in `public/img/` and not in `src/assets/`?"

> Vite processes files in `src/assets/` and **hashes their filenames** in the production build (e.g., `cleansing-oil.abc123.jpg`). This breaks content-addressable caching nicely for bundled code, but it would make the `image` field in `data.json` (which stores the original filename) point to a non-existent path.  
> Files in `public/` are copied **as-is**, with their original names. So `data.json` can reference `"/img/cleansing-oil.jpg"` and that path is valid in both development and production.

---

### "What is JSON?"

> JSON (JavaScript Object Notation) is a text-based format for representing structured data. It uses JavaScript's object literal syntax: `{key: value}` for objects, `[…]` for arrays, with string, number, boolean, null as primitives. It is language-agnostic, though it originated from JavaScript.  
> In this project, JSON is the format for all API responses (Express sends `res.json(data)`) and for the persistent storage file `data.json`. The client uses `response.json()` to parse the body.

---

*Last updated: June 2026 · Natural Skincare · Project 3 · Group 6*
