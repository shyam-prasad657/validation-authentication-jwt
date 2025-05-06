import React from 'react'
import { Link } from 'react-router';
import { useAuth } from '../context/AuthProvider';


const View = () => {
    const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Viewer {auth?.user?.username}</h1>
      <Link to = '/admin'>go to admin</Link>
      <Link to = '/home'>go to home</Link>
    </div>
  )
}

export default View
