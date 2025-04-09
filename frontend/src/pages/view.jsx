import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';


const View = () => {
    const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Viewer {auth?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/home'>go to home</Link>
    </div>
  )
}

export default View
