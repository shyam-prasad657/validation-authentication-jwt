import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './context/AuthProvider';
import logout from './hooks/logout';

const RequireAuth = ({allowedRoles}) => {
    const { auth,setAuth, loading } = useAuth();
    const location = useLocation();
    
    const x = localStorage.getItem('refreshExpiry')
    console.log('after reload in requireAuth',x)
    const now = Date.now()
    console.log('current date',now)
    const [time, setTime] = useState(10)
    useEffect(() => {
      setTime(10)
    },[location])
        useEffect(() => {
          const timer = setTimeout(() => {
            setTime(prev => {
              if(prev === 0) {
                clearTimeout(timer);
                console.log('idle time logged out')
                logout(setAuth);
                return false;
              }
              return prev - 1;
            })
          },1000)
          console.log('Refreshing idle timeout',time)
          return () => clearTimeout(timer); // Clean-up on unmount
        },[time])
        if (loading) {
          return <div>Loading...</div>; // or a spinner
        }
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
