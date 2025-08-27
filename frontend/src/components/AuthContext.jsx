// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { loginUser, registerUser } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on app load
//     const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
//     if (savedUser) {
//       setUser(savedUser);
//     }
//     setLoading(false);
//   }, []);

//   // Login with backend
//   const login = async ({ email, password }) => {
//     const res = await loginUser({ email, password });
//     const userData = {
//       name: res.name,
//       email: res.email,
//       role: res.role,
//       token: res.token,
//     };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   // Register with backend
//   const register = async ({ name, email, password, role }) => {
//     await registerUser({ name, email, password, role });
//     // Auto-login after registration
//     await login({ email, password });
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     register,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app load
    const initializeAuth = () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login with backend
  const login = async ({ email, password }) => {
    try {
      setError(null);
      const response = await loginUser({ email, password });
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Register with backend
  const register = async ({ name, email, password, role }) => {
    try {
      setError(null);
      const response = await registerUser({ name, email, password, role });
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  // Get auth token for API calls
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    error,
    isAdmin,
    isAuthenticated,
    getToken,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};