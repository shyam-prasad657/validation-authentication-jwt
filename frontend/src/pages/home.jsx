import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';
import axiosInstance from '../api/axios';

const Home = () => {
        const { auth, setAuth } = useAuth();
        const logout = async () => {
          await axiosInstance.post('http://localhost:3500/logout',{},{ withCredentials : true });
          localStorage.removeItem('token');
          setAuth({});
        }
        const x = auth?.refresh_expiry/1000;
        const [time, setTime] = useState(x)
        useEffect(() => {
          const timer = setInterval(() => {
            setTime(prev => {
              if(prev === 0) {
                clearInterval(timer);
                logout();
                return false;
              }
              return prev - 1;
            })
          },1000)
          return () => clearInterval(timer); // Clean-up on unmount
        },[])
  return (
    <div>
      <h1>Welcome Home {auth?.user?.username} {time}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/view'>go to view</Link>

      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
