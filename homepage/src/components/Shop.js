import React from 'react';
import ProductGrid from './ProductGrid';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop-container container">
      <div className="content-card">
        <h1 className="shop-title">Shop Fiddle Books & CDs</h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Shop; 