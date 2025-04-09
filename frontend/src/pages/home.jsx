import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';

const Home = () => {
        const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Home {auth?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/view'>go to view</Link>
    </div>
  )
}

export default Home
