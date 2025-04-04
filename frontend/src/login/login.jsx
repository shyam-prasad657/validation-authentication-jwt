import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './login.css';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

export default function Login() {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (email && pwd) {
        setSuccess(true);
      }
      try {
        const response = await axios.post('/login',
          {email, pwd},
          { params : {email}},
          {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
          }
        );
        console.log('Login data', response?.data);
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        const email = response?.data?.email;
        const pwd = response?.data?.pwd;
        const username = response?.data?.username;

        setAuth({ email, pwd, roles, accessToken, username });
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
              <label htmlFor = 'email' className='form-label'>Username</label>
            <input
              type = "email"
              id = "email"
              ref = {emailRef}
              required
              onChange={(e) => setEmail(e.target.value)}
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
            <button id = 'submit' className="btn btn-primary" disabled={email && pwd ? false : true}>Sign Up</button>
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
