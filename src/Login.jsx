import React from 'react'
import Header from './Header'
import './Login.css'


function Login() {
  return (
    <div className='login-page'>
        <div className='login-card'>
            <div className='login-header'>
                <span className='login-brand'><a href='/'>Stratcom</a></span>
                <h2>Welcome back</h2>
                <p>Sign In To Continue</p>
            </div>
            <form className='login-form' action="">
                <div className='login-form-group'>
                    <label className="label">Enter your email</label>
                    <input type='email' placeholder='e.g example@gmail.com'/>
                    <br/>
                    <label className="label">Enter your password</label>
                    <input type='password' placeholder='*******'/>
                </div>
                <button className='login-button'>SignIn</button>
            </form>
            <p className='login-switch'> Dont Have an Account?<a href='./Signup'>SignUp</a></p>
        </div>
      
    </div>
  )
}

export default Login
