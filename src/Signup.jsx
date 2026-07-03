import React,{useEffect,useState} from 'react'
import Header from './Header'
import './Signup.css'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,createUserWithEmailAndPassword,updateProfile } from './firebase'
import { useNavigate } from 'react-router-dom'


function Signup() {
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

    //function to create  user
    const createUser= async(e)=>{
        e.preventDefault() // page not to refresh itself after button click 
        // console.log('button clicked')

        setError('')
        if (password.length<6){
            setError('Passowrd Must Be Atleast Six Characters')
            return;
        }
        setLoading(true)
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            const user = userCredential.user;
            await updateProfile(user,{displayName:username})
            alert('User Has Been created Succesfully')
            navigate('/dashboard')
        }catch(err){
            switch(err.code){
                case'auth/email-already-in-use':
                setError('Email Already in Use')
                break;
                case 'auth/invalid-email':
                setError('Invalid Email')
                break;
                case'auth/weak-password':
                setError('Password Is Too Weak, Use A Stronger Password')
                break;
                default:
                    setError('SignUp Failed,Try Again')
            }
            }finally{
            setLoading(false)
        }


    }

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
                    <input value={username} onChange={(e)=>setuserName(e.target.value)} type='text' placeholder='e.g jackson'/>
                    <label className="label">Enter your email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='e.g example@gmail.com'/>
                    <br/>
                    <label className="label">Enter your password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)}type='password' placeholder='*******'/>
                    {/* <label className="label"> Comfirm password</label>
                    <input type='password' placeholder='*******'/> */}
                </div>
                <button onClick={createUser} className='signup-button'>SignUp</button>
            </form>
            <p className='error'>{error}</p>
            <p className='signup-switch'> Already Have an Account?<a href='./Login'>Signin</a></p>
        </div>
      
    </div>
  )
   function newFunction() {
    console.log('')
  }
}


export default Signup
