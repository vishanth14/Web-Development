import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice";
import { useWishlist, useToast } from "../context/AppContext";
import "./ProductCard.css";

const badgeClass = {
  "Best Seller": "badge-best",
  "New": "badge-new",
  "Sale": "badge-sale",
};

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [adding, setAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    setAdding(true);
    dispatch(addToCart(product));
    dispatch(openCart());
    addToast(`${product.name} added to cart`, "success");
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
    addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article className={`product-card ${adding ? "adding" : ""}`}>
      <Link to={`/product/${product.id}`} className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
        {product.badge && (
          <span className={`badge ${badgeClass[product.badge] || "badge-new"} card-badge`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="discount-pill">−{discount}%</span>
        )}
        <div className="card-overlay">
          <button
            className={`wishlist-btn ${wishlisted ? "active" : ""}`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>
      </Link>

      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>
        <div className="card-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="card-footer">
          <div className="card-price">
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className={`add-btn ${!product.inStock ? "disabled" : ""} ${adding ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {adding ? "✓" : product.inStock ? "+" : "✕"}
          </button>
        </div>
      </div>
    </article>
  );
}
