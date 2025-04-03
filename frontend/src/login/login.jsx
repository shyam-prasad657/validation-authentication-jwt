import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './login.css';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

export default function Login() {
  const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (user && pwd) {
        setSuccess(true);
      }
      try {
        const response = await axios.post('/login',
          {user, pwd},
          { params : {user}},
          {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
          }
        );
        console.log('Login data', response?.data);
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);
      }
     catch(err) {
      if(!err?.response) {
        setErrMsg('No server response');
      }
      setErrMsg(err?.response?.data?.errors);
      errRef.current.focus();
    }
  }
  return (
      <section id = "login-container">
        {success ? (
          <div className='login-page'>
            <h1>Your are logged in</h1>
            <span>
              <Link to  = '/home'>Go to home</Link>
            </span>
          </div>
        ) : (
            <div className='login-page'>
            <h1>Login</h1>
            <p ref = {errRef} className= {errMsg ? "alert alert-danger" : "offscreen"} aria-live = "assertive">
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='form-label'>Username</label>
            <input
              type = "text"
              id = "username"
              ref = {userRef}
              required
              onChange={(e) => setUser(e.target.value)}
              className='form-control'
            />
            {/* Password */}
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type = "password"
              id = "password"
              required
              onChange={(e) => setPwd(e.target.value)}
              className='form-control'
            />
            <button id = 'submit' className="btn btn-primary" disabled={user && pwd ? false : true}>Sign Up</button>
            </form>
            <p>
              New User ?<br />
              <span>
                  <Link to  = '/register'>Resgister</Link>
              </span>
            </p>
            </div>
            )}
    </section>
  )
}
