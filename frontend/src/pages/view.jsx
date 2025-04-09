import React from 'react'
import { useAuth } from '../hooks/useAuth';

const View = () => {
    const { auth } = useAuth();
  return (
    <div>
      <h1>Welcome Viewer {auth?.username}</h1>
    </div>
  )
}

export default View
