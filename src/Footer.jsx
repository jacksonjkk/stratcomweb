import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-brand'>
          <h3 className='footer-title'>StratCom</h3>
          <p className='footer-text'>Empowering the next generation of tech professionals in Uganda through practical training and industry-ready skills.</p>
        </div>

        <div className='footer-links'>
          <h4 className='footer-heading'>Quick Links</h4>
          <ul className='footer-list'>
            <li className='navitem'><a className='navlink' href='/'>Home</a> </li>
            <li className='navitem'><a className='navlink' href='/aboutus'>Aboutus</a> </li>
            <li className='navitem'><a className='navlink' href='/services'>Services</a> </li>
            <li className='navitem'><a className='navlink' href='/login'>Login</a> </li>
            <li className='navitem'><a className='navlink' href='/signup'>SignUp</a> </li>
          </ul>
        </div>

        <div className='footer-contact'>
          <h4 className='footer-heading'>Contact</h4>
          <p className='footer-text'>Kampala, Uganda</p>
          <p className='footer-text'>info@stratcom.com</p>
          <p className='footer-text'>+256 783 470 519</p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2026 StratCom. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
