import React from 'react';
import ShoppingCart from './ShoppingCart';
import './CartPanel.css';

const CartPanel = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`cart-panel-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-panel-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="close-panel-btn">
            &times;
          </button>
        </div>
        <ShoppingCart />
      </div>
    </>
  );
};

export default CartPanel; 