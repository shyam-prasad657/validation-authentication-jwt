import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';
import axiosInstance from '../api/axios';

const Home = () => {
        const { auth, setAuth } = useAuth();
        const logout = async () => {
          await axiosInstance.post('http://localhost:3500/logout',{},{ withCredentials : true });
          localStorage.clear(); // optional: clear token and expiry 
          setAuth({});
        }
        const [time, setTime] = useState(60)
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
