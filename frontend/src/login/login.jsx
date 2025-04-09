import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './login.css';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email || !pwd) {
        setErrMsg('Invalid Entry');
        return false;
      }
      try {
        const response = await axios.post('/login', {email, pwd},
          {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
          }
        );
        if(response?.data?.message === 'Logged in Sucessfully') {
          const { accessToken, roles, email, username } = response?.data;
          setAuth({ email, roles, accessToken, username });
          console.log('sucess');
          navigate(from, {replace : true})
        }
        setEmail('');
        setPwd('');
      }
     catch(err) {
      if(!err?.response) {
        setErrMsg('No server response');
      }
      console.error(err?.response)
      setErrMsg(err?.response?.data?.errors);
      errRef.current.focus();
    }
  }
  return (
      <section id = "login-container">
            <div className='login-page'>
            <h1>Login</h1>
            <p ref = {errRef} className= {errMsg ? "alert alert-danger" : "offscreen"} aria-live = "assertive">
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor = 'email' className='form-label'>Email ID</label>
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
    </section>
  )
}
