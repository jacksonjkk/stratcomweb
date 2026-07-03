import React,{useEffect,useState} from 'react'
import Header from './Header'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,signInWithEmailAndPassword,updateProfile } from './firebase'
import { useNavigate } from 'react-router-dom'
import './Login.css'


function Login() {

        //this is where we put the javascript
        const [email,setEmail]= useState('')
        const [password,setPassword]= useState('')
        const [username,setuserName]= useState('')
        const [error,setError]=useState('')
        const [loading,setLoading]=useState(false)
        const navigate = useNavigate()
    
    //check if data is captured 
        // console.log(username)
        // console.log(email)
        // console.log(password)
    
        //function to login a user
        const loginUser= async(e)=>{
            e.preventDefault() // page not to refresh itself after button click 
            // console.log('button clicked')
    
            setError('')
            setLoading(true)
            try{
                await signInWithEmailAndPassword(auth,email,password)
                navigate('/dashboard')
            }catch(err){
                switch(err.code){
                    case'auth/user-not-found':
                    setError('User Not Fount')
                    break;
                    case 'auth/invalid-email':
                    setError('Invalid Email')
                    break;
                    case'auth/weak-password':
                    setError('Password Is Too Weak, Use A Stronger Password')
                    break;
                    default:
                        setError('login Failed,Try Again')
                }
            }finally{
                setLoading(false)
                }
            }

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
                    <input value={email} onChange={(e)=>setEmail(e.target.value)}type='email' placeholder='e.g example@gmail.com'/>
                    <br/>
                    <label className="label">Enter your password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='*******'/>
                </div>
                <button onClick={loginUser} className='login-button'>SignIn</button>
            </form>
            <p className='error'>{error}</p>
            <p className='login-switch'> Dont Have an Account?<a href='./Signup'>SignUp</a></p>
        </div>
      
    </div>
  )
}


export default Login
