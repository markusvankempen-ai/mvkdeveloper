import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('🚪 Admin: Logout clicked');
    logout();
  };

  return (
    <div className="admin-container container">
      <div className="admin-content content-card">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <p>Select a section to manage:</p>
        <nav className="admin-nav">
          <Link to="/admin/settings" className="admin-nav-link">
            <h3>Site Settings</h3>
            <p>Manage site-wide settings like inventory display.</p>
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            <h3>Product Management</h3>
            <p>Add, edit, and delete products in your catalog.</p>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Admin; 