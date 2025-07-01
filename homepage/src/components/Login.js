import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('🔐 Login: Submitting form with username:', formData.username);

    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = login(formData.username, formData.password);
      
      if (!success) {
        setError('Invalid username or password');
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
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

        <button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className="form-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login; 