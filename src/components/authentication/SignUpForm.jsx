import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUpForm({setIsLogIn}) {
  const API_URL = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({username: "", email: "", password: "", role: ['user']});
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setUserData((data) => ({...data, [name]: value}))
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
              method: "POST",
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(userData)
            })
            if(!res.ok){
              alert("Failed to create account")
            }
            else{
              //console.log("Account created") 
              setUserData({
                username:"",
                email: "",
                password:""
              })
              alert("Your account was successfully created!");
              setIsLogIn(true);
              navigate('/');
            }
          }
          catch (error){
            //console.error('Error:', error);
            alert("Failed to create account. Please try again later.");
          }
    }
  return (
    <div className='d-flex justify-content-center align-items-center px-4 py-4'>
        <form onSubmit={handleSubmit} className='col-md-7 col-10'>
        <div className='mb-3'> 
            <label className="form-label mb-0 fw-bold" >Username</label>
            <input className="form-control mb-3" type='text' name='username' placeholder='Enter username' value={userData.username} onChange={handleChange} required></input>
            <label className="form-label mb-0 fw-bold">Email</label>
            <input className="form-control mb-3" type='email' name='email' placeholder='Email@gmail.com'value={userData.email} onChange={handleChange} required></input>
            <label className="form-label mb-0 fw-bold">Password</label>
            <input className="form-control mb-3" type='password' name='password' placeholder='Enter password' value={userData.password} onChange={handleChange} required></input>
            <div className='d-flex justify-content-center'>
            <button  className="btn btn-bg" type='submit'>Create Account</button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default SignUpForm