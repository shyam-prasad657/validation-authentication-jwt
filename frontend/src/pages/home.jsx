import React from 'react'
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
  return (
    <div>
      <h1>Welcome Home {auth?.user?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/view'>go to view</Link>

      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
