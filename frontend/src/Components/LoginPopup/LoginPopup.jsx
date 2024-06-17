// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/Assests'
import "./LoginPopup.css"
import axios from "axios"
// eslint-disable-next-line react/prop-types
const LoginPopup = ({setShowLogin}) => {
    // eslint-disable-next-line no-unused-vars
    const [currState,setCurrState]=useState("Login")
    const {settoken} = useContext(StoreContext)
    const [data,setdata]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(ev)=>{
        const name = ev.target.name
        const value = ev.target.value
        setdata(data=>({...data,[name]:value}))
    }
    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl
        if(currState === "Login"){
            newUrl = "http://localhost:4005/api/user/login"
        
        }
        else{
            newUrl = "http://localhost:4005/api/user/register"
        }
        const response = await axios.post(newUrl,data)
        if(response.data.success){
            settoken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        
    }
  return (
    <div className='login-popup'>
        <form onChange={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross} alt=''/>
                 
            </div>
            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input type='text' name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                <input onChange={onChangeHandler} name='email' value={data.email} type='email' placeholder='Your email' required/>
                <input onChange={onChangeHandler} name='password' value={data.password} type='password' placeholder='Password' required/>

            </div>
            <button type='submit'>{currState==="Sign UP"?"Create account":"Login"}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>by continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {
                currState === "Login"
                ?<p>Create a new account <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>

    </div>
  )
}

export default LoginPopup