import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartOpen,
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import "./Cart.css";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectCartOpen);

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => dispatch(closeCart())} />
      <aside className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart <span>({items.length})</span></h2>
          <button className="cart-close" onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">◇</div>
            <p>Your cart is empty</p>
            <button className="btn btn-outline" onClick={() => { dispatch(closeCart()); navigate("/shop"); }}>
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart-shipping">
                <span>Shipping</span>
                <span>{total > 100 ? "Free" : "$9.99"}</span>
              </div>
              <div className="cart-total">
                <span>Total</span>
                <span>${(total > 100 ? total : total + 9.99).toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 4 }} onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              {total < 100 && (
                <p className="free-shipping-note">Add ${(100 - total).toFixed(2)} more for free shipping!</p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
