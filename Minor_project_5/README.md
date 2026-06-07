# LUXE — E-Commerce Frontend

A modern, full-featured e-commerce frontend built with **React 18**, **Redux Toolkit**, and **React Router v6**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Responsive nav with search, theme toggle
│   ├── Navbar.css
│   ├── Cart.jsx          # Animated cart sidebar
│   ├── Cart.css
│   ├── ProductCard.jsx   # Reusable product card
│   ├── ProductCard.css
│   ├── Toast.jsx         # Toast notification system
│   └── Footer.jsx
│
├── pages/
│   ├── Home.jsx          # Hero + featured products
│   ├── Home.css
│   ├── Shop.jsx          # Product listing with filters/sort
│   ├── Shop.css
│   ├── ProductDetail.jsx # Product page with tabs
│   ├── ProductDetail.css
│   ├── Wishlist.jsx      # Saved items
│   ├── Wishlist.css
│   ├── Checkout.jsx      # Multi-section checkout form
│   └── Checkout.css
│
├── redux/
│   ├── store.js          # Redux store configuration
│   └── cartSlice.js      # Cart state (RTK slice)
│
├── context/
│   └── AppContext.js     # Theme, Wishlist, Toast contexts
│
├── data/
│   └── products.js       # Product catalog data
│
└── styles/
    └── global.css        # Design tokens, global styles
```

---

## ✨ Features

| Feature | Implementation |
|---|---|
| Product Listing | `Shop.jsx` with category/price filters and sort |
| Product Detail | `ProductDetail.jsx` with tabs and related products |
| Cart Management | Redux Toolkit (`cartSlice.js`) — add, remove, qty |
| Wishlist | React Context API (`WishlistContext`) |
| Theme Toggle | Context API (`ThemeContext`) — dark/light |
| Toast Notifications | Context API (`ToastContext`) |
| Routing | React Router v6 with dynamic `product/:id` routes |
| Checkout | Full form with order confirmation state |
| Responsive Design | Mobile-first CSS with breakpoints |

---

## 🛠 Technologies

- **React 18** — Functional components + Hooks
- **React Router v6** — Client-side routing
- **Redux Toolkit** — Cart global state management
- **Context API** — Theme, Wishlist, Toast state
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Google Fonts** — Cormorant Garamond + DM Sans

---

## 📦 State Management

### Redux (Cart)
```js
// Dispatch actions
dispatch(addToCart(product));
dispatch(removeFromCart(id));
dispatch(updateQuantity({ id, quantity }));
dispatch(clearCart());

// Select state
const items = useSelector(selectCartItems);
const total = useSelector(selectCartTotal);
const count = useSelector(selectCartCount);
```

### Context API (Theme, Wishlist, Toast)
```js
const { theme, toggle } = useTheme();
const { wishlist, toggle, isWishlisted } = useWishlist();
const { addToast } = useToast();
```

---

## 🎨 Design System

CSS custom properties used throughout:
- Colors: `--bg`, `--surface`, `--accent` (`#c8a96e`), `--text`
- Typography: `--font-display` (Cormorant Garamond) + `--font-body` (DM Sans)
- Spacing/radius: `--radius`, `--radius-lg`
- Shadows: `--shadow`, `--shadow-lg`

---

## Submission

**Submitted by:** [Your Name]  
**Deadline:** 08/06/2026  
**GitHub:** [Your Repository Link]
