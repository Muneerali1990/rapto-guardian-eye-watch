import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleCheckRoute = () => {
  const { user } = useUser();

  if (!user?.publicMetadata.role) {
    return <Navigate to="/select-role" replace />;
  }

  return <Outlet />;
};

export default RoleCheckRoute;