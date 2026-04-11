import React , {useContext,useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Appointment from './pages/Appointment.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './Context.jsx';
import axios from 'axios';

function App() {
  const {isAuthenticated ,setIsAuthenticated ,setUser} =useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials:true  });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        console.log(error.response.data.message);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/appointment' element={<Appointment/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Footer/>
      <ToastContainer  position="top-center"/>
    </Router>
    </>
   )
}

export default App
