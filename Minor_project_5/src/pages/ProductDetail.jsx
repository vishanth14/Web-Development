import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice";
import { useWishlist, useToast } from "../context/AppContext";
import { getProductById, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

const Stars = ({ rating }) => (
  <span className="stars">{"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}</span>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  const product = getProductById(id);

  if (!product) {
    return (
      <main className="not-found page-enter">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate("/shop")}>Back to Shop</button>
        </div>
      </main>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    dispatch(openCart());
    addToast(`${qty}× ${product.name} added to cart`, "success");
  };

  return (
    <main className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/shop">Shop</Link>
          <span>›</span>
          <Link to={`/shop?cat=${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="pd-grid">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-image">
              <img src={product.image} alt={product.name} />
              {!product.inStock && <div className="pd-oos">Out of Stock</div>}
              {discount && <div className="pd-discount">−{discount}%</div>}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-eyebrow">{product.category}</div>
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating">
              <Stars rating={product.rating} />
              <span>{product.rating}</span>
              <span className="pd-reviews">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="pd-price">
              <span className="pd-price-current">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-price-original">${product.originalPrice.toFixed(2)}</span>
                  <span className="pd-save">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            {/* Features */}
            <div className="pd-features">
              {product.features.map((f) => (
                <span key={f} className="feature-tag">{f}</span>
              ))}
            </div>

            <p className="pd-desc">{product.description}</p>

            {/* Qty + Actions */}
            <div className="pd-actions">
              <div className="pd-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary pd-add-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                className={`wishlist-icon-btn ${wishlisted ? "active" : ""}`}
                onClick={() => { toggle(product); addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info"); }}
                aria-label="Toggle wishlist"
              >
                {wishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Shipping note */}
            <div className="pd-shipping">
              <span>🚚</span>
              <p>Free shipping on orders over $100 · Returns within 30 days</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="tab-headers">
            {["description", "features", "reviews"].map((t) => (
              <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tab === "description" && (
              <p>{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            )}
            {tab === "features" && (
              <ul className="features-list">
                {product.features.map((f) => (
                  <li key={f}><span className="check">✓</span> {f}</li>
                ))}
              </ul>
            )}
            {tab === "reviews" && (
              <div className="reviews-summary">
                <div className="big-rating">
                  <span className="big-score">{product.rating}</span>
                  <Stars rating={product.rating} />
                  <span>{product.reviews.toLocaleString()} reviews</span>
                </div>
                <p className="review-note">Verified customer reviews — product quality guaranteed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="related-section">
            <div className="section-header">
              <h2>Related Products</h2>
              <Link to={`/shop?cat=${product.category}`} className="see-all">View All →</Link>
            </div>
            <div className="related-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
