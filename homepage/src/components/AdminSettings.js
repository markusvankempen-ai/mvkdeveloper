import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminSettings.css';

const AdminSettings = () => {
  const [showInventory, setShowInventory] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    try {
      const storedSetting = localStorage.getItem('showInventory');
      if (storedSetting !== null) {
        setShowInventory(JSON.parse(storedSetting));
      }
    } catch (error) {
      console.error("Failed to read 'showInventory' from localStorage", error);
    }
  }, []);

  const handleToggle = () => {
    const newShowInventory = !showInventory;
    setShowInventory(newShowInventory);
    try {
      localStorage.setItem('showInventory', JSON.stringify(newShowInventory));
      setSaveMessage('Settings saved locally!');
    } catch (error) {
      setSaveMessage('Failed to save settings.');
      console.error("Failed to save 'showInventory' to localStorage", error);
    }
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <div className="admin-settings-container">
      <Link to="/admin" className="back-to-dashboard">‹ Back to Admin Dashboard</Link>
      <h2>Admin Settings</h2>
      <div className="setting-item">
        <label htmlFor="show-inventory">Show Product Inventory</label>
        <button
          id="show-inventory"
          onClick={handleToggle}
          className={`toggle-button ${showInventory ? 'active' : ''}`}
        >
          {showInventory ? 'ON' : 'OFF'}
        </button>
      </div>
      {saveMessage && <p className="save-message">{saveMessage}</p>}
    </div>
  );
};

export default AdminSettings; 