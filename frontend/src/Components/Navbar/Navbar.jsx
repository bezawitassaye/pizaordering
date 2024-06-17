// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/Assests'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home")
    const {token,settoken} = useContext(StoreContext)
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.removeItem("token")
        settoken("")
        navigate("/")
    }
  return (
    <div className='navbar'>
        
        <Link to="/"><img src={assets.logo} className='logo'/></Link>
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}><Link to="/">home</Link></li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("about")} className={menu==="about"?"active":""}>about</li>
            <li onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search} alt=''/>
            <div className="navbar-search-icon">
                <Link to="/cart"> <img src={assets.shooping} alt=''/></Link>
               
                <div className="dot"></div>
            </div>
            {!token ?
             <button onClick={()=>setShowLogin(true)}>Sign In</button>
             : <div className="navbar-profile">
                <img src={assets.user}/>
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate("/myorders")}><img src={assets.bag}/>Orders</li>
                  
                    <hr/>
                    <li onClick={logout}><img src={assets.logout}/>Logout</li>
                </ul>
                
             </div>
            }
            </div>
    </div>
    

  )
}

export default Navbar