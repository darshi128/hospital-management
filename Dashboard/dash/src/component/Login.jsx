import React, {useState, useContext} from 'react'
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


function Login() {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")

  const navigateTo = useNavigate();

   const handleLogin= async(e)=>{
    e.preventDefault();
    try {
       await axios.post("http://localhost:4000/api/v1/user/login",
         {email, password,confirmPassword, role:"Admin"},
         {withCredentials:true, headers:{"Content-type":"application/json"}}
        ) .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(isAuthenticated){
    navigateTo("/");
  }
  return (
    <>
    <div className='container form-component'>
      <img src="/logo.png" alt="logo" className='logo' />
      <h2 className='form-title'>WELCOME TO ZEECARE</h2>
      <p>Only Admins are allowed to access this resouces!</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
        <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password'/>
      <div style={{justifyContent:"center", alignItems:"center"}}>
        <button type='submit'>Login</button>
      </div>
      </form>
    </div>
    </>
  )
}

export default Login