import React from 'react'
import { useAuth } from '../hooks/useAuth';

const Home = () => {
        const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Home {auth?.username}</h1>
    </div>
  )
}

export default Home
