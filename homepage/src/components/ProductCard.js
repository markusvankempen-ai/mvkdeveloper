import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const getCategoryIcon = (product) => {
  if (product.type) {
    switch (product.type.toLowerCase()) {
      case 'book':
        return '📖';
      case 'cd':
        return '💿';
      case 'video':
        return '🎬';
      case 'bundle':
        return '📦';
      default:
        return '📦';
    }
  }
  return '📦';
};

const ProductCard = ({ product, showInventory = true }) => {
  const { addItem } = useCart();
  const isOutOfStock = product.inventory === 0;

  const imageUrl = product.image 
    ? `${process.env.PUBLIC_URL}${product.image}` 
    : '';

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      {product.featured && (
        <div className="featured-badge" title="Featured Product">⭐</div>
      )}
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="product-image"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </Link>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <h3 className="product-name">
          <span className="category-icon" title={product.type || 'Bundle'}>{getCategoryIcon(product)}</span> {product.name}
        </h3>
      </Link>
      <p className="product-artist">
        {product.type === 'book' ? product.author : product.artist}
      </p>
      <p className="product-description">{product.description}</p>
      {showInventory && (
        <div className="product-inventory">
          {isOutOfStock ? 'Out of Stock' : `${product.inventory} in stock`}
        </div>
      )}
      <div className="product-price">${(product.price / 100).toFixed(2)}</div>
      <button
        className="add-to-cart-btn"
        onClick={() => addItem(product)}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard; 