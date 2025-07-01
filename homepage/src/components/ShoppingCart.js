import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <strong>Total:</strong> ${(cartTotal / 100).toFixed(2)}
            </div>
            <div className="cart-actions">
              <button onClick={handleCheckout} className="checkout-btn">
                Checkout
              </button>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart; 