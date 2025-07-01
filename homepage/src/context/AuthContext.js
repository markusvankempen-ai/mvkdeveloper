import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper to get users from localStorage
const getUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('siteUsers');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error parsing users from localStorage", error);
    return [];
  }
};

// Helper to get current user from sessionStorage
const getCurrentUserFromStorage = () => {
  try {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing current user from sessionStorage", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserFromStorage());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to restore session
    const user = getCurrentUserFromStorage();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const register = (username, password, email, newsletter) => {
    const users = getUsersFromStorage();
    const userExists = users.some(u => u.username === username || u.email === email);
    if (userExists) {
      // It's better to return false than to throw an error for control flow
      return false;
    }

    const newUser = { username, password, email }; // In a real app, hash the password
    const updatedUsers = [...users, newUser];
    localStorage.setItem('siteUsers', JSON.stringify(updatedUsers));

    // Also, create a default profile with the newsletter preference
    const defaultProfile = {
      fullName: '',
      shippingAddress: '',
      city: '',
      postalCode: '',
      country: '',
      newsletter: newsletter || false,
    };
    localStorage.setItem(`userProfile_${username}`, JSON.stringify(defaultProfile));
    
    return true;
  };

  const login = (username, password) => {
    // Admin login
    if (username === 'admin' && password === 'fiddlemusic123') {
      const adminUser = { username: 'admin', isAdmin: true };
      setCurrentUser(adminUser);
      sessionStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    }
    // Regular user login
    const users = getUsersFromStorage();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const loggedInUser = { username: user.username, isAdmin: false };
      setCurrentUser(loggedInUser);
      sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 