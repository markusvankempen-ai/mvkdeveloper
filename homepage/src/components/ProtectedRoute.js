import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔒 ProtectedRoute: Checking authentication...', { isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🚫 ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ ProtectedRoute: User authenticated, allowing access');
  return children;
};

export default ProtectedRoute; 