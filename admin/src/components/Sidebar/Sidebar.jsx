// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add"  className="sidebar-option">
                <img src={assets.add}/>
                <p>Add Items</p>
            </NavLink >
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.list}/>
                <p>List Items</p>
            </NavLink >
            <NavLink  to="/order" className="sidebar-option">
                <img src={assets.order}/>
                <p> Orders</p>
            </NavLink >
        </div>
        
    </div>
  )
}

export default Sidebar