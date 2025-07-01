import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: '',
    newsletter: false,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      const savedProfile = localStorage.getItem(`userProfile_${currentUser.username}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      localStorage.setItem(`userProfile_${currentUser.username}`, JSON.stringify(profile));
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p>Manage your account details and newsletter subscription.</p>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={profile.shippingAddress}
            onChange={handleChange}
            placeholder="123 Main St"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={profile.city}
              onChange={handleChange}
              placeholder="Fiddletown"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={profile.postalCode}
              onChange={handleChange}
              placeholder="A1B 2C3"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={profile.country}
            onChange={handleChange}
            placeholder="Canada"
          />
        </div>
        <div className="form-group-checkbox">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={profile.newsletter}
            onChange={handleChange}
          />
          <label htmlFor="newsletter">Subscribe to our newsletter</label>
        </div>
        <button type="submit" className="save-button">Save Changes</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default Profile; 