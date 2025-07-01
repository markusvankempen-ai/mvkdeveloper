import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const PRODUCTS_URL = `${process.env.PUBLIC_URL}/products.json`;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [showInventory, setShowInventory] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showFeatured, setShowFeatured] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const loadSettings = () => {
      try {
        const storedSetting = localStorage.getItem('showInventory');
        if (storedSetting !== null) {
          setShowInventory(JSON.parse(storedSetting));
        }
      } catch (error) {
        console.error("Failed to read 'showInventory' from localStorage", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(PRODUCTS_URL);
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      loadSettings(); // Load settings from localStorage
      await fetchProducts();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading-message">Loading products...</div>;

  // Get unique product types
  const productTypes = Array.from(new Set(products.map(p => p.type))).filter(Boolean);

  // Handle type filter change
  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      // Search filter
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.author && product.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.artist && product.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Featured filter
      const matchesFeatured = !showFeatured || product.featured;
      
      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      
      // Stock filter
      const matchesStock = !showInStockOnly || (product.inventory && product.inventory > 0);
      
      return matchesSearch && matchesFeatured && matchesType && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const clearAllFilters = () => {
    setSearchQuery('');
    setShowFeatured(false);
    setSelectedTypes([]);
    setShowInStockOnly(false);
    setSortBy('name');
  };

  const hasActiveFilters = searchQuery || showFeatured || selectedTypes.length > 0 || showInStockOnly || sortBy !== 'name';

  return (
    <div>
      {/* Enhanced Search and Filter Controls */}
      <div className="product-grid-controls">
        <div className="search-section">
          <input
            type="text"
            className="product-search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">Filters:</label>
            <label className="control-label">
              <input
                type="checkbox"
                checked={showFeatured}
                onChange={e => setShowFeatured(e.target.checked)}
              />
              Featured Only
            </label>
            <label className="control-label">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={e => setShowInStockOnly(e.target.checked)}
              />
              In Stock Only
            </label>
          </div>

          <div className="type-filters">
            <label className="filter-label">Types:</label>
            {productTypes.map(type => (
              <label key={type} className="control-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="sort-section">
            <label className="filter-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="type">Type</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button onClick={clearAllFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        Showing {filteredAndSortedProducts.length} of {products.length} products
        {searchQuery && <span className="search-term"> for "{searchQuery}"</span>}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-products-found">
            <h3>No products found</h3>
            <p>Try adjusting your search terms or filters.</p>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showInventory={showInventory} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid; 