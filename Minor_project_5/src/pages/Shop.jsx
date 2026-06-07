import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1500]);

  const activeCat = searchParams.get("cat") || "All";
  const searchQuery = (searchParams.get("q") || "").toLowerCase();

  const setCategory = (cat) => {
    const p = new URLSearchParams(searchParams);
    if (cat === "All") p.delete("cat");
    else p.set("cat", cat);
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    if (searchQuery) list = list.filter((p) => p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "price-asc":  return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating":     return list.sort((a, b) => b.rating - a.rating);
      case "name":       return list.sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [activeCat, searchQuery, sort, priceRange]);

  return (
    <main className="shop-page page-enter">
      <div className="container">
        <div className="shop-header">
          <div>
            <h1>
              {searchQuery ? `Results for "${searchQuery}"` : activeCat === "All" ? "All Products" : activeCat}
            </h1>
            <p>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="shop-sort">
            <label>Sort by</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            <div className="filter-group">
              <h3>Category</h3>
              <ul>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className={`filter-btn ${activeCat === cat ? "active" : ""}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                      <span className="filter-count">
                        {cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-range">
                <div className="price-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1500}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="range-slider"
                />
              </div>
            </div>

            <div className="filter-group">
              <h3>Availability</h3>
              <ul>
                <li>
                  <button className="filter-btn active">
                    In Stock <span className="filter-count">{products.filter((p) => p.inStock).length}</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Products */}
          <div className="shop-products">
            {filtered.length === 0 ? (
              <div className="empty-results">
                <p className="empty-icon">◇</p>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button className="btn btn-outline" onClick={() => { setCategory("All"); setSearchParams({}); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="shop-grid">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
