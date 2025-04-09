import React from 'react'
import { useAuth } from './hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

  return (
    allowedRoles?.includes(auth?.roles)
        ? <Outlet />
        : auth?.username
            ? <Navigate to = '/unauthorize' state = {{from : location}} replace />
            : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
