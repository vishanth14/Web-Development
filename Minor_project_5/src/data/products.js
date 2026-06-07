export const products = [
  {
    id: 1,
    name: "Obsidian Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    badge: "Best Seller",
    description:
      "Premium noise-cancelling wireless headphones with 40-hour battery life, crystal-clear audio and a luxurious matte finish. Perfect for audiophiles and professionals alike.",
    features: ["40hr Battery", "ANC", "Hi-Res Audio", "Foldable"],
    inStock: true,
  },
  {
    id: 2,
    name: "Ember Smart Watch Pro",
    price: 449.00,
    originalPrice: null,
    category: "Electronics",
    rating: 4.6,
    reviews: 879,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "New",
    description:
      "A sleek smartwatch with health monitoring, GPS, and a gorgeous AMOLED display. Tracks sleep, workouts, and keeps you connected throughout the day.",
    features: ["AMOLED", "GPS", "Health Monitor", "5 ATM Water Resistant"],
    inStock: true,
  },
  {
    id: 3,
    name: "Nomad Leather Backpack",
    price: 189.00,
    originalPrice: 230.00,
    category: "Fashion",
    rating: 4.9,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    badge: "Sale",
    description:
      "Hand-stitched full-grain leather backpack with a 15\" laptop compartment, anti-theft pockets, and aged brass hardware. Built to last a lifetime.",
    features: ["Full-Grain Leather", "15\" Laptop Slot", "Anti-Theft", "Lifetime Warranty"],
    inStock: true,
  },
  {
    id: 4,
    name: "Arctic Mechanical Keyboard",
    price: 159.99,
    originalPrice: null,
    category: "Electronics",
    rating: 4.7,
    reviews: 2108,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    badge: null,
    description:
      "A tenkeyless mechanical keyboard with Cherry MX switches, per-key RGB lighting, and a machined aluminum frame. Responsive, durable and gorgeous.",
    features: ["Cherry MX Switches", "Per-Key RGB", "Aluminum Frame", "TKL Layout"],
    inStock: true,
  },
  {
    id: 5,
    name: "Velvet Lounge Chair",
    price: 699.00,
    originalPrice: 899.00,
    category: "Home",
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    badge: "Sale",
    description:
      "Mid-century modern lounge chair upholstered in premium velvet with solid walnut wood legs. The ultimate statement piece for any living space.",
    features: ["Premium Velvet", "Walnut Legs", "Ergonomic", "Easy Assembly"],
    inStock: true,
  },
  {
    id: 6,
    name: "Aura Minimalist Sneakers",
    price: 129.00,
    originalPrice: null,
    category: "Fashion",
    rating: 4.4,
    reviews: 765,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    badge: "New",
    description:
      "Clean, minimalist sneakers with a premium leather upper, cushioned insole, and vulcanized rubber sole. Versatile enough for any occasion.",
    features: ["Leather Upper", "Cushioned Insole", "Vulcanized Sole", "Unisex Fit"],
    inStock: true,
  },
  {
    id: 7,
    name: "Cascade Pour-Over Set",
    price: 85.00,
    originalPrice: null,
    category: "Home",
    rating: 4.8,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    badge: "Best Seller",
    description:
      "Handblown borosilicate glass pour-over coffee set with a walnut stand. Brews a perfect cup with precise temperature control and a beautiful ritual.",
    features: ["Borosilicate Glass", "Walnut Stand", "600ml Capacity", "Heat Resistant"],
    inStock: false,
  },
  {
    id: 8,
    name: "Phantom Camera Lens 85mm",
    price: 1199.00,
    originalPrice: 1499.00,
    category: "Electronics",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    badge: "Sale",
    description:
      "Professional-grade 85mm f/1.4 portrait lens with ultra-smooth bokeh, nano-coating, and weather sealing. The choice of professional photographers worldwide.",
    features: ["f/1.4 Aperture", "Weather Sealed", "Nano Coating", "Auto/Manual Focus"],
    inStock: true,
  },
];

export const categories = ["All", "Electronics", "Fashion", "Home"];

export const getFeaturedProducts = () => products.slice(0, 4);
export const getProductById = (id) => products.find((p) => p.id === parseInt(id));
export const getProductsByCategory = (cat) =>
  cat === "All" ? products : products.filter((p) => p.category === cat);
