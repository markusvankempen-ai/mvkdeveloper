import React from 'react';
import { useCart } from '../hooks/useCart';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  // Ensure image path includes PUBLIC_URL if it's a relative path
  const imageUrl = item.image ? 
    (item.image.startsWith('http') ? item.image : `${process.env.PUBLIC_URL}${item.image}`) 
    : `${process.env.PUBLIC_URL}/images/placeholder.jpg`;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${(item.price / 100).toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          className="cart-item-quantity"
        />
        <button onClick={() => removeItem(item.id)} className="cart-item-remove">
          Remove
        </button>
      </div>
      <div className="cart-item-total">
        ${((item.price * item.quantity) / 100).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem; 