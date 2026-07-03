import React from 'react'
import Header from './Header'
import './Signup.css'


function Signup() {
  return (
    <div className='signup-page'>
        <div className='signup-card'>
            <div className='signup-header'>
                <span className='signup-brand'><a href='/'>Stratcom</a></span>
                <p>Create Account</p>
            </div>
            <form className='signup-form' action="">
                <div className='signup-form-group'>
                    <label className="label">Enter your User Name</label>
                    <input type='text' placeholder='e.g jackson'/>
                    <label className="label">Enter your email</label>
                    <input type='email' placeholder='e.g example@gmail.com'/>
                    <br/>
                    <label className="label">Enter your password</label>
                    <input type='password' placeholder='*******'/>
                    <label className="label"> Comfirm password</label>
                    <input type='password' placeholder='*******'/>
                </div>
                <button className='signup-button'>SignUp</button>
            </form>
            <p className='signup-switch'> Already Have an Account?<a href='./Login'>Signin</a></p>
        </div>
      
    </div>
  )
}

export default Signup
