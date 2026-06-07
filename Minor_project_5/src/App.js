import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, WishlistProvider, ToastProvider, useTheme } from "./context/AppContext";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/Cart";
import ToastContainer from "./components/Toast";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import "./styles/global.css";

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <div data-theme={theme}>
      <Navbar />
      <CartSidebar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={
          <main style={{ padding: "120px 24px", textAlign: "center", minHeight: "60vh" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 400, color: "var(--accent)" }}>404</h1>
            <p style={{ color: "var(--text2)", marginTop: 12 }}>Page not found.</p>
          </main>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <WishlistProvider>
          <ToastProvider>
            <BrowserRouter>
              <ThemedApp />
            </BrowserRouter>
          </ToastProvider>
        </WishlistProvider>
      </ThemeProvider>
    </Provider>
  );
}
