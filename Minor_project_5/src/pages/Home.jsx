import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedProducts, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const featured = getFeaturedProducts();

const stats = [
  { value: "10k+", label: "Happy Customers" },
  { value: "500+", label: "Curated Products" },
  { value: "4.9★", label: "Average Rating" },
  { value: "Free", label: "Shipping over $100" },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      el.style.setProperty("--tx", `${x}px`);
      el.style.setProperty("--ty", `${y}px`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-grain" />
        </div>
        <div className="container hero-content">
          <div className="hero-eyebrow">New Collection 2026</div>
          <h1 className="hero-title">
            Elevate Your<br />
            <em>Everyday</em>
          </h1>
          <p className="hero-sub">
            Handpicked products of enduring quality. From cutting-edge electronics to timeless design objects.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/shop?cat=New" className="btn btn-outline">New Arrivals</Link>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <Link to="/shop" className="see-all">View All →</Link>
          </div>
          <div className="category-grid">
            {["Electronics", "Fashion", "Home"].map((cat) => (
              <button key={cat} className="category-card" onClick={() => navigate(`/shop?cat=${cat}`)}>
                <div className="cat-icon">
                  {cat === "Electronics" ? "⚡" : cat === "Fashion" ? "✦" : "⌂"}
                </div>
                <h3>{cat}</h3>
                <p>Explore →</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Handpicked for You</p>
              <h2>Featured Products</h2>
            </div>
            <Link to="/shop" className="see-all">Shop All →</Link>
          </div>
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div className="promo-text">
            <p className="promo-eyebrow">Limited Time Offer</p>
            <h2>Free Shipping on Orders Over $100</h2>
            <p>Use code <strong>LUXE2026</strong> at checkout for an extra 10% off your first order.</p>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
          </div>
          <div className="promo-visual">
            <div className="promo-circle">◆</div>
          </div>
        </div>
      </section>
    </main>
  );
}
