import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { Role } from '@/zustand/auth/types';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface RoleBasedRouteProps {
  children: JSX.Element;
  requiredRole: Role[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useAuthStore();
  const toast = useNotification();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error({
        message: 'Unauthorized',
        description: 'You must be logged in to access this page',
      });
      const timer = setTimeout(() => setShouldRedirect(true), 500);
      return () => clearTimeout(timer);
    }
  }, [user, toast]);

  if (shouldRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.roles?.some((role) => requiredRole.includes(role))) {
    return children;
  } else {
    return <Navigate to="/not-found" replace />;
  }
};

export default RoleBasedRoute;
