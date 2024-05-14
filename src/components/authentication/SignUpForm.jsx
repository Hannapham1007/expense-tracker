import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUpForm({setIsLogIn, setLoading}) {
  const API_URL = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({username: "", email: "", password: "", role: ['user']});
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setUserData((data) => ({...data, [name]: value}))
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);
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
          finally {
            setLoading(false);
          }
    }
  return (
    <div className='d-flex justify-content-center align-items-center px-4 py-4'>
        <form onSubmit={handleSubmit} className='col-md-7 col-10'>
        <div className='mb-3'> 
            <label className="form-label mb-0 fw-bold" htmlFor='username'>Username</label>
            <input className="form-control mb-3" id='username' type='text' name='username' placeholder='Enter username' autoComplete="off" value={userData.username} onChange={handleChange} required></input>
            <label className="form-label mb-0 fw-bold" htmlFor='email' >Email</label>
            <input className="form-control mb-3" id='email' type='email' name='email' placeholder='Email@gmail.com' autoComplete='off'  value={userData.email} onChange={handleChange} required></input>
            <label className="form-label mb-0 fw-bold" htmlFor='password' >Password</label>
            <input className="form-control mb-3" id='password' type='password' name='password' placeholder='Enter password' autoComplete='off' value={userData.password} onChange={handleChange} required></input>
            <div className='d-flex justify-content-center'>
            <button  className="btn btn-bg" type='submit'>Create Account</button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default SignUpForm