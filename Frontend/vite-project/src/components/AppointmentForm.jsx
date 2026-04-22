import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AppointmentForm() {
    const [firstName, setFirstName]= useState("");
      const [lastName, setLastName]= useState("");
      const [email, setEmail]= useState("");
      const [phone,setPhone]= useState("");
      const [nic, setNic]= useState("");
      const [gender, setGender]= useState("");
      const [dob,setDob]= useState("");
      const [appointmentDate, setAppointmentDate]= useState("");
      const [department, setDepartment]= useState("");
      const [doctorFirstName, setDoctorFirstName]= useState("");
      const [doctorLastName, setDoctorLastName]= useState("");
      const [address, setAddress]= useState("");
      const [hasVisited, setHasVisited]= useState("");

    const departmentArray=[ "Pediatrics", "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Gynecology", "Ophthalmology", "Psychiatry", "Oncology", "Gastroenterology", "ENT","Radiology"];  

    const [doctors, setDoctors]= useState([]);
    useEffect(()=>{
       const fetchDoctors = async()=>{
         const {data} = await axios.get("http://hospital-management-1-sl9n.onrender.com/api/v1/user/doctors",
            {withCredentials:true}
         );
         setDoctors(data.doctors);
       }
       fetchDoctors();
    },[]);

    const handleAppointment= async(e)=>{
        e.preventDefault();
         try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://hospital-management-1-sl9n.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    }
  return (
      <div className='container form-component appointment-form'>
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
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
          <input type="date" value={appointmentDate} onChange={(e)=>setAppointmentDate(e.target.value)} placeholder='Appointment Date'/>
          </div>
          <div>
            <select value={department}  onChange={(e)=>{
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
            }}>
                {departmentArray.map((depart, index)=>{
                    return(
                    <option key={index} value={depart}>
                        {depart}
                    </option>
                )
                })}
            </select>
            <select
              value={JSON.stringify({
                firstName: doctorFirstName,
                lastName: doctorLastName,
              })}
              onChange={(e) => {
                const { firstName, lastName } = JSON.parse(e.target.value);
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      firstName: doctor.firstName,
                      lastName: doctor.lastName,
                    })}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
            <textarea rows={7} value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Address'/>
          <div style={{
          gap:"10px",
          justifyContent:"flex-end",
          flexDirection:"row",
        }}>
          <p style={{marginBottom:0}}>Have you visited before?</p>
          <input type="checkbox" checked={hasVisited} onChange={(e)=>setHasVisited(e.target.checked)} style={{flex:"none", width:"25px"}} />
        </div>
        <div style={{justifyContent:"center", alignItems:"center"}}>
          <button type='submit'>GET APPOINTMENT</button>
        </div>
        </form>
      </div>
    )
}

export default AppointmentForm;