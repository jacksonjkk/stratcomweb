import React from 'react'
import './Header.css'
function Header() {
  return (
    <header className='header'>
    <div className='container headercontainer'>
      <div className='logo'>
        <span className='logotext'>Stratcom</span>
        {/* <img scr a href="">logo</img> */}
      </div>
      <nav className='navmenu'>
        <ul className='navlist'>
          <li className='navitem'><a className='navlink' href=''>Home</a></li>
          <li className='navitem'><a className='navlink' href=''>About</a></li>
          <li className='navitem'><a className='navlink' href=''>Contact</a></li>
          <li className='navitem'><a className='navlink' href=''>login</a></li>
          <li className='navitem'><a className='navlink' href=''>Signup</a></li>
         
        </ul>
      </nav>
    </div>
    </header>
  )
}

export default Header
