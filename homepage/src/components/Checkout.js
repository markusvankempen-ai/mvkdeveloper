import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Checkout.css';

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Other',
];

const Checkout = () => {
  const { items, products, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    console.log('💳 Checkout: Processing order...');
    console.log('🛒 Checkout: Items in cart:', items);
    console.log('👤 Checkout: Customer data:', formData);

    // Simulate payment processing
    setTimeout(() => {
      const newOrderNumber = `FID-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      setIsProcessing(false);
      
      console.log('✅ Checkout: Order completed with number:', newOrderNumber);
      console.log('📦 Checkout: Inventory has been decremented automatically by cart system');
      
      // Clear the cart (inventory was already decremented when items were added)
      clearCart();
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Order Complete!</h2>
          <p className="order-number">Order Number: <strong>{orderNumber}</strong></p>
          <div className="order-details">
            <h3>Order Summary:</h3>
            {items.map(item => {
              const product = products.find(p => p.id === item.id);
              const imageUrl = product?.image ? 
                (product.image.startsWith('http') ? product.image : `${process.env.PUBLIC_URL}${product.image}`) 
                : `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
              return (
                <div key={item.id} className="order-item">
                  <img src={imageUrl} alt={product?.name} className="order-item-image" />
                  <div className="order-item-details">
                    <span>{product?.name} x {item.quantity}</span>
                    <span>${((product?.price || 0) * item.quantity / 100).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
            <div className="order-total">
              <strong>Total: ${(total / 100).toFixed(2)}</strong>
            </div>
          </div>
          <p className="success-message">
            Thank you for your purchase! A confirmation email has been sent to {formData.email}.
          </p>
          <button 
            className="continue-shopping-btn"
            onClick={() => window.location.href = '/mvkdeveloper'}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => window.location.href = '/mvkdeveloper'}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Checkout</h2>
        
        <div className="checkout-sections">
          <div className="checkout-form">
            {/* Guest/Login Options */}
            {!currentUser && (
              <div className="checkout-auth-section">
                <h3>Checkout Options</h3>
                <p>You're checking out as a guest. Want to save your information for future purchases?</p>
                <div className="checkout-auth-options">
                  <Link to="/login" className="checkout-login-btn">
                    Login to Account
                  </Link>
                  <Link to="/register" className="checkout-register-btn">
                    Create Account
                  </Link>
                  <span className="guest-indicator">or continue as guest below</span>
                </div>
              </div>
            )}

            {currentUser && (
              <div className="checkout-user-info">
                <h3>👤 Logged in as {currentUser.username}</h3>
                <p>Your information will be saved for future purchases.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="form-section">
                <h3>Shipping Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    autoComplete="street-address"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country:</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      autoComplete="country"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Postal Code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Information</h3>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    autoComplete="cc-number"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date:</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV:</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Order...' : `Place Order - $${(total / 100).toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map(item => {
                const product = products.find(p => p.id === item.id);
                const imageUrl = product?.image ? 
                  (product.image.startsWith('http') ? product.image : `${process.env.PUBLIC_URL}${product.image}`) 
                  : `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
                return (
                  <div key={item.id} className="summary-item">
                    <img src={imageUrl} alt={product?.name} className="summary-item-image" />
                    <div className="item-details">
                      <h4>{product?.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${((product?.price || 0) * item.quantity / 100).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="summary-total">
              <h3>Total: ${(total / 100).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 