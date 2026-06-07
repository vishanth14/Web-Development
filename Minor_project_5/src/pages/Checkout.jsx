import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal, clearCart } from "../redux/cartSlice";
import { useToast } from "../context/AppContext";
import "./Checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const shipping = total > 100 ? 0 : 9.99;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
    cardNumber: "", cardExpiry: "", cardCVV: "", cardName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.address || !form.cardNumber) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    setSubmitted(true);
    dispatch(clearCart());
    addToast("Order placed successfully!", "success");
  };

  if (items.length === 0 && !submitted) {
    navigate("/shop");
    return null;
  }

  if (submitted) {
    return (
      <main className="checkout-page page-enter">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
            <p className="order-number">Order #LUXE-{Math.floor(Math.random() * 90000) + 10000}</p>
            <button className="btn btn-primary" onClick={() => navigate("/shop")}>Continue Shopping</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page page-enter">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form">
            <section className="form-section">
              <h2>Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
            </section>

            <section className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-group">
                <label>Address *</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" required />
              </div>
              <div className="form-row form-row-3">
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="New York" required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="NY" />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="10001" />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Details</h2>
              <div className="form-group">
                <label>Card Number *</label>
                <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" maxLength={19} required />
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input name="cardCVV" value={form.cardCVV} onChange={handleChange} placeholder="123" maxLength={4} />
                </div>
              </div>
            </section>

            <button className="btn btn-primary checkout-submit" onClick={handleSubmit}>
              Place Order · ${(total + shipping).toFixed(2)}
            </button>
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <ul className="summary-items">
              {items.map((item) => (
                <li key={item.id} className="summary-item">
                  <div className="summary-img-wrap">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <p>{item.name}</p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
