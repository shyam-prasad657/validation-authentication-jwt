import React from 'react'
import { useAuth } from './hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({allowedRoles}) => {
    const { auth, loading } = useAuth();
    const location = useLocation();
    if (loading) {
      return <div>Loading...</div>; // or a spinner
    }
    const x = auth?.user?.roles
    console.log('after reload in requireAuth',x)

  return (
    allowedRoles?.includes(auth?.user?.roles)
        ? <Outlet />
        : auth?.user?.username
            ? <Navigate to = '/unauthorize' state = {{from : location}} replace />
            : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
