import React, { useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [phone,setPhone]= useState("");
  const [nic, setNic]= useState("");
  const [gender, setGender]= useState("");
  const [dob,setDob]= useState("");

  const navigateTo = useNavigate();

  const handleRegister= async(e)=>{
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password , role:"Patient"},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  if(isAuthenticated){
    return navigateTo("/");
  }

  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please Sign Up to continue</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure reiciendis nostrum tenetur aliquam nihil quas.</p>
      <form onSubmit={handleRegister}>
        <div>
        <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name'/>
        <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name'/>
        </div>
        <div>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/> 
        <input type="number " value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone'/>
        </div>
        <div>
        <input type="number" value={nic} onChange={(e)=>setNic(e.target.value)} placeholder='NIC'/>
        <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)} placeholder='Date of Birth'/>
        </div>
        <div>
        <select  value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
        </div>
        <div style={{
        gap:"10px",
        justifyContent:"flex-end",
        flexDirection:"row",
      }}>
        <p style={{marginBottom:0}}>Already Registered?</p>
        <Link to="/login" style={{textDecoration:"none", alignItems:"center"}}>Login Now</Link>
      </div>
      <div style={{justifyContent:"center", alignItems:"center"}}>
        <button type='submit'>Register</button>
      </div>
      </form>
    </div>
  )
}

export default Register