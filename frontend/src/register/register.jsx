import React, { useEffect, useRef, useState } from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import './register.css';
import { TiTick } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router';
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('')
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSucess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //If submit button is enables with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2 || !email) {
      setErrMsg('Invalid Entry');
      return false;
    }
    try {
      const response = await axios.post('/register', {user, pwd, email},
        {
          headers : {'Content-Type' : 'application/json'},
          withCredentials : true
        }
      );
      console.log('Registed Data',response?.data);
      setSucess(true);
      //clear state and controlled inputs
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch(err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      }
      setErrMsg(err?.response?.data?.errors);
      errRef.current.focus();
    }
  }

  return (
    <section id = "register-container">
        {success ? (
          <div className='register-page'>
          <h1>Success !!</h1>
          <span>
            <Link to  = '/login'>Sign In</Link>
          </span>
          </div>
        ) : (
      <div className='register-page'>
      <h1>Register</h1>
      <p ref = {errRef} className= {errMsg ? "alert alert-danger" : "offscreen"} aria-live = "assertive">
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
      {/* Email ID */}
      <label htmlFor='email' className='form-label'>Email ID</label>
      <input
        type = 'email'
        id = "email"
        required
        onChange={(e) => setEmail(e.target.value)}
        aria-describedby='uidnote'
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        className='form-control'
      />
      {/* Username */}
      <label htmlFor='username' className='form-label'>Username</label>
      <span className= {validName ? 'valid' : 'hide'}><TiTick /></span>
      <span className= {validName || !user ? 'hide' : 'valid'}><IoMdCloseCircle /></span>
      <input
        type = "text"
        id = "username"
        ref = {userRef}
        required
        autoComplete='off'
        onChange={(e) => setUser(e.target.value)}
        aria-invalid = {validName ? "false" : "true"}
        aria-describedby='uidnote'
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        className='form-control'
      />
      <p id = 'uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
        <IoIosInformationCircle />
        4 to 24 charecters.<br />
        Must begin with a letter.<br/>
        Letters, numbers, underscores, hyphens allowed.
      </p>
      {/* Password */}
      <label htmlFor='password' className='form-label'>Password</label>
      <span className= {validPwd ? 'valid' : 'hide'}><TiTick /></span>
      <span className= {validPwd || !pwd ? 'hide' : 'valid'}><IoMdCloseCircle /></span>
      <input
        type = "password"
        id = "password"
        required
        autoComplete='off'
        onChange={(e) => setPwd(e.target.value)}
        aria-invalid = {validPwd ? "false" : "true"}
        aria-describedby='passwordnote'
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        className='form-control'
      />
      <p id = 'passwordnote' className={pwd && !validPwd ? "instructions" : "offscreen"}>
        <IoIosInformationCircle />
        8 to 24 charecters.<br />
        Must include uppercase, lowercase letters, a number and a special charecter<br/>
      </p>
      {/* Match Password */}
      {/* Password */}
      <label htmlFor='match-password' className='form-label'>Match Password</label>
      <span className= {validMatch && matchPwd ? 'valid' : 'hide'}><TiTick /></span>
      <span className= {validMatch || !matchPwd ? 'hide' : 'valid'}><IoMdCloseCircle /></span>
      <input
        type = "password"
        id = "match-password"
        required
        autoComplete='off'
        onChange={(e) => setMatchPwd(e.target.value)}
        aria-invalid = {validMatch ? "false" : "true"}
        aria-describedby='confirmnote'
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        className='form-control'
      />
      <p id = 'confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
        <IoIosInformationCircle />
        Must match the first password input field.
      </p>
      <button id = 'submit' className="btn btn-primary" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
      </form>
      <p>
        Already registered?<br />
        <span>
            <Link to  = '/login'>Sign In</Link>
        </span>
        </p> 
      </div>
      )}
    </section>
  )
}
