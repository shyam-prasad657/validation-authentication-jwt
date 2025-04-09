import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Admin = () => {
    const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Admin {auth?.username}</h1>
    </div>
  )
}

export default Admin
