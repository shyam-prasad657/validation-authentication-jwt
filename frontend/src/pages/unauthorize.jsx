import React from 'react'
import { useNavigate } from 'react-router';

const Unauthorize = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <h1>Unauthorized</h1>
      <button className="btn btn-primary" onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Unauthorize
