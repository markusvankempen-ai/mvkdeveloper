import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const PRODUCTS_URL = `${process.env.PUBLIC_URL}/products.json`;

const STATIC_PAGES = [
  {
    title: 'About Our Fiddle Music Shop',
    route: '/about',
    content: `Welcome to the Fiddle Music Shop, your number one source for all things fiddle! We're dedicated to giving you the very best of fiddle music resources, with a focus on quality, customer service, and uniqueness. Founded in 2024, our shop has come a long way from its beginnings. When we first started out, our passion for preserving and sharing the rich tradition of fiddle music drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the world, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the music industry. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.`
  },
  {
    title: 'Contact Us',
    route: '/contact',
    content: `Have questions? We'd love to hear from you! Email: contact@fiddleshop.com Phone: (555) FID-DLE1 Address: 123 Fiddle Lane, Music Town, USA Follow us on our non-existent social media!`
  }
];

const Header = ({ onCartClick }) => {
  const { items } = useCart();
  const { currentUser, logout } = useAuth();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (!search) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const searchText = search.toLowerCase();
    const productResults = products.filter(p => p.name.toLowerCase().includes(searchText) || (p.author && p.author.toLowerCase().includes(searchText)) || (p.artist && p.artist.toLowerCase().includes(searchText)) || (p.description && p.description.toLowerCase().includes(searchText))).map(p => ({ type: 'product', id: p.id, name: p.name, image: p.image, route: '/' }));
    const pageResults = STATIC_PAGES.filter(p => p.title.toLowerCase().includes(searchText) || p.content.toLowerCase().includes(searchText)).map(p => ({ type: 'page', title: p.title, route: p.route }));
    setResults([...productResults, ...pageResults]);
    setShowDropdown(true);
  }, [search, products]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleResultClick = (result) => {
    setShowDropdown(false);
    setSearch("");
    if (result.type === 'product') {
      navigate(`/product/${result.id}`);
    } else if (result.type === 'page') {
      navigate(result.route);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-nav">
          <Link to="/" className="header-title-link">
            <h1 className="header-title">Cranford Publications</h1>
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
        </div>
        <div className="header-actions">
          <div className="site-search-container" ref={searchRef}>
            <input
              type="text"
              className="site-search-input"
              placeholder="Search site..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
            />
            {showDropdown && results.length > 0 && (
              <div className="site-search-dropdown">
                {results.map((result, idx) => (
                  <div
                    key={result.type + (result.id || result.route) + idx}
                    className="site-search-result"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.type === 'product' && (
                      <img src={result.image ? `${process.env.PUBLIC_URL}${result.image}` : ''} alt="" />
                    )}
                    <span>
                      {result.type === 'product' ? result.name : result.title}
                      {result.type === 'page' && <span className="page-tag">[Page]</span>}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="user-auth-section">
            {currentUser ? (
              <>
                <span className="welcome-user">Welcome, {currentUser.username}</span>
                <Link to="/profile" className="nav-link profile-link">Profile</Link>
                <button onClick={logout} className="logout-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link auth-link">Login</Link>
                <Link to="/register" className="nav-link auth-link">Register</Link>
              </>
            )}
          </div>

          {currentUser && currentUser.isAdmin && (
            <Link to="/admin" className="admin-link">Admin</Link>
          )}
          
          <div className="cart-icon-wrapper" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="cart-item-count">{totalItems}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 