import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Assuming Register.css will be similar or we can create a new one
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newsletter: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const success = register(formData.username, formData.password, formData.email, formData.newsletter);
      if (success) {
        navigate('/login');
      } else {
        setError('Username or email already exists.');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group-checkbox">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          <label htmlFor="newsletter">I'd like to receive the newsletter.</label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register; 