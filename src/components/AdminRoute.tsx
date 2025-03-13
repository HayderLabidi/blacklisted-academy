import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute; 