import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router';


const Admin = () => {
    const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Admin {auth?.user?.username}</h1>
      <Link to = '/home'>go to home</Link>
      <Link to = '/view'>go to view</Link>
    </div>
  )
}

export default Admin
