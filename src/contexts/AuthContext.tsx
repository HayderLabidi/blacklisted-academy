import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email?: string, password?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing authentication on mount
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { isAuthenticated, isAdmin } = JSON.parse(auth);
      setIsAuthenticated(isAuthenticated);
      setIsAdmin(isAdmin);
    }
  }, []);

  const signIn = (email?: string, password?: string) => {
    // For demo purposes, if email is 'admin@example.com' and password is 'admin123',
    // the user will be signed in as an admin
    const isAdminUser = email === 'admin@example.com' && password === 'admin123';
    
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: true,
      isAdmin: isAdminUser,
    }));
    navigate('/');
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 