import React from 'react'
import { useAuth } from './hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({allowedRoles}) => {
    const { auth, loading } = useAuth();
    const location = useLocation();
    if (loading) {
      return <div>Loading...</div>; // or a spinner
    }
    const x = localStorage.getItem('refreshExpiry')
    console.log('after reload in requireAuth',x)
    const now = Date.now()
    console.log('current date',now)
    if( !x || now > Number(x)) {
      console.log('Refresh token expired. Logging out.');
      localStorage.clear(); // optional: clear token and expiry
      console.log('Auth value while logout',auth)
      return <Navigate to='/login' state={{ from: location }} replace />
    }

  return (
    allowedRoles?.includes(auth?.user?.roles)
        ? <Outlet />
        : auth?.user?.username
            ? <Navigate to = '/unauthorize' state = {{from : location}} replace />
            : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
