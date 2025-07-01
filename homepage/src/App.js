import React, { useState } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import CartPanel from './components/CartPanel';
import AdminSettings from './components/AdminSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import AdminProducts from './components/AdminProducts';
import Login from './components/Login';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Profile from './components/Profile';

const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Header is always shown now
  return (
    <div className="App">
      <Header onCartClick={toggleCart} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
      <CartPanel isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router basename="/mvkdeveloper">
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
