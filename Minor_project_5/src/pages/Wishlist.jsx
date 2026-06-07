import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="wishlist-page page-enter">
      <div className="container">
        <div className="page-header">
          <h1>Wishlist</h1>
          <p>{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-heart">♡</div>
            <h2>Your wishlist is empty</h2>
            <p>Save products you love and find them here later.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
