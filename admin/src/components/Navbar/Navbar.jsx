// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo}/>
        <img className='profile' src={assets.user}/>
        
    </div>
  )
}

export default Navbar