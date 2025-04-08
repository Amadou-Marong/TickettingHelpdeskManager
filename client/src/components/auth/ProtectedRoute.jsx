
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const ProtectedRoute = ({
  children,
  requiredPermission,
}) => {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking auth
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permissions if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Redirect to unauthorized page if permission check fails
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required permission
  return <>{children}</>;
};

export default ProtectedRoute;
