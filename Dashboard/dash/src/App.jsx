import React , {useContext, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dashboard';
import Doctors from './component/Doctors';
import Messages from './component/Messages';
import AddNewAdmin from './component/AddNewAdmin';
import AddNewDoctor from './component/AddNewDoctor';
import Login from './component/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './Context';
import axios from 'axios';
import "./App.css";


function App() {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://hospital-management-1-sl9n.onrender.com/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        console.error(error);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App