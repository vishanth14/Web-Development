import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">◆ LUXE</p>
          <p>Curated goods for the discerning eye. Quality without compromise.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?cat=Electronics">Electronics</Link></li>
              <li><Link to="/shop?cat=Fashion">Fashion</Link></li>
              <li><Link to="/shop?cat=Home">Home</Link></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 LUXE. Built with React, Redux & React Router.</p>
      </div>
    </footer>
  );
}
