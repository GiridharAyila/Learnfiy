
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but no role selected, redirect to role selector
  if (!userRole) {
    return <Navigate to="/role-selector" state={{ from: location }} replace />;
  }

  // Check if user is trying to access a dashboard they shouldn't
  const dashboardPath = location.pathname.startsWith('/dashboard/') 
    ? location.pathname.split('/')[2] 
    : null;

  if (dashboardPath && dashboardPath !== userRole) {
    // Redirect to the appropriate dashboard based on user role
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  return <Outlet />;
};
