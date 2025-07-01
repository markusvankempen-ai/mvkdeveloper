import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import './ProductCard.css';
import './ProductDetail.css';

// --- Helper Functions for Ratings ---
const getRatingsFromStorage = () => {
  try {
    const ratings = localStorage.getItem('productRatings');
    return ratings ? JSON.parse(ratings) : {};
  } catch (e) {
    return {};
  }
};

const setRatingInStorage = (productId, username, rating) => {
  const allRatings = getRatingsFromStorage();
  if (!allRatings[productId]) {
    allRatings[productId] = {};
  }
  allRatings[productId][username] = rating;
  localStorage.setItem('productRatings', JSON.stringify(allRatings));
};
// --- End Helper Functions ---

const StarRating = ({ rating, setRating, disabled }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !disabled && setRating(ratingValue)}
              readOnly={disabled}
            />
            <span className={`star ${ratingValue <= rating ? 'filled' : ''}`}>&#9733;</span>
          </label>
        );
      })}
    </div>
  );
};

const PRODUCTS_URL = `${process.env.PUBLIC_URL}/products.json`;

const ProductDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // --- Rating State ---
  const [ratings, setRatings] = useState(() => getRatingsFromStorage());
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === id);
        setProduct(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  
  useEffect(() => {
    if (currentUser && product) {
      const productRatings = ratings[product.id] || {};
      setUserRating(productRatings[currentUser.username] || 0);
    }
  }, [currentUser, product, ratings]);

  const handleSetRating = (rating) => {
    if (!currentUser) return;
    setUserRating(rating);
    setRatingInStorage(product.id, currentUser.username, rating);
    // Refresh ratings state from storage
    setRatings(getRatingsFromStorage());
  };
  
  const averageRating = useMemo(() => {
    if (!product || !ratings[product.id]) return 0;
    const productRatings = Object.values(ratings[product.id]);
    if (productRatings.length === 0) return 0;
    const sum = productRatings.reduce((a, b) => a + b, 0);
    return (sum / productRatings.length).toFixed(1);
  }, [product, ratings]);

  if (loading) return <div className="product-detail-message">Loading product...</div>;
  if (!product) return <div className="product-detail-message">Product not found.</div>;

  const imageUrl = product.image ? `${process.env.PUBLIC_URL}${product.image}` : '';
  const isOutOfStock = product.inventory === 0;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="product-detail-content">
        <img src={imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-artist">{product.type === 'book' ? product.author : product.artist}</p>
          <div className="rating-summary">
            <StarRating rating={averageRating} disabled={true} />
            <span>{averageRating} ({Object.keys(ratings[product.id] || {}).length} ratings)</span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-inventory">{isOutOfStock ? 'Out of Stock' : `${product.inventory} in stock`}</div>
          <div className="product-price">${(product.price / 100).toFixed(2)}</div>
          <button className="add-to-cart-btn" onClick={() => addItem(product)} disabled={isOutOfStock}>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="product-rating-section">
        <h3>Rate this Product</h3>
        {currentUser ? (
          <div>
            <p>Your rating:</p>
            <StarRating rating={userRating} setRating={handleSetRating} />
          </div>
        ) : (
          <p>Please <Link to="/login">login</Link> to rate this product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 