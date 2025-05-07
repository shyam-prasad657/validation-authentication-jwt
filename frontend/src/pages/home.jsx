import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthProvider';
import logout from '../hooks/logout';

const Home = () => {
        const { auth, setAuth } = useAuth();
        const handleLogout = () => {
          logout(setAuth);
        }
    
  return (
    <div>
      <h1>Welcome Home {auth?.user?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/view'>go to view</Link>

      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
