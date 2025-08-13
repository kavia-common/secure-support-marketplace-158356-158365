import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children, requireListener = false }) {
  /**
   * Route guard component that redirects unauthenticated users to /login,
   * and optionally ensures the current user is a listener.
   */
  const { user, loading, isListener } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireListener && !isListener) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
