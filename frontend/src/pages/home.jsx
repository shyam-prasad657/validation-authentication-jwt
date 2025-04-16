import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';

const Home = () => {
        const { auth, setAuth } = useAuth();
        const logout = () => {
          setAuth({});
        }
  return (
    <div>
      <h1>Welcome Home {auth?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/view'>go to view</Link>

      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
