import React from 'react'
import './Header.css'

function Header() {
  return (
      <header className='header'>
        <div className='container headercontainer'>
           <div className='logo'>
             <span className='logotext'>Stratcom</span>
           </div>
           <nav className='navmenu'>
         <ul className='navlist'>
             <li className='navitem'><a className='navlink' href='/'>Home</a> </li>
             <li className='navitem'><a className='navlink' href='/aboutus'>Aboutus</a> </li>
             <li className='navitem'><a className='navlink' href='/services'>Services</a> </li>
             <li className='navitem'><a className='navlink' href='/login'>Login</a> </li>
             <li className='navitem'><a className='navlink' href='/signup'>SignUp</a> </li>
         </ul>
      </nav>
        </div>
      
      </header>
  )
}

export default Header