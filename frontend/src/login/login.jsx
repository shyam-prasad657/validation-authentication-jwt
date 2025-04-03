import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './login.css';


export default function Login() {
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
  return (
      <section id = "login-container">
            <p ref = {errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">
              {errMsg}
            </p>
            <div id='login-page'>
            <h1>Login</h1>
            <form>
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
                  <Link to  = '/register'><a href="#">Resgister</a></Link>
              </span>
            </p>
            </div>
    </section>
  )
}
