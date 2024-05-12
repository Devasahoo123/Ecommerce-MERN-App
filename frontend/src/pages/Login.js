import  { React, useState } from 'react'
import loginIcon from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useContext } from 'react';

import SummarApi from '../common/SummarApi';
import Context from '../context';

const Login = () => {
    // State for showing/hiding password
    const [showPassword, setShowPassword]=useState(false);
    // State for storing form data
    const [data,setData]=useState({
        email:"",
        password:""
    });
    // Hook for navigating to different routes
    const navigate = useNavigate();
    // Accessing context for user details
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context);

    // Function to handle input changes
    const handleOnChange = (e)=>{
        const {name,value}=e.target;

        setData((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Function to handle form submission
    const handelSubmit=async(e)=>{
        e.preventDefault();
        const dataResponse = await fetch(SummarApi?.signIn?.url,{
            method : "POST",
            credentials : "include",
            body : JSON.stringify(data),
            headers :{
                "content-type" : "application/json"
            },
        })
        const dataApi = await dataResponse.json()

        // Handle success and error responses
        if(dataApi?.success){
            toast.success(dataApi.message)
            navigate("/");
            fetchUserDetails()
            fetchUserAddToCart()
            
        }
        if(dataApi.error){
            toast.error(dataApi?.message)
        }
    }

    return (
        <>
            <section id='login'>
                <div className="container mx-auto px-4 ">
                    
                    <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
                        <div className='w-20 h-20 mx-auto rounded-full shadow-lg'>
                            <img className='rounded-3xl' src={loginIcon} alt="login-icon" />
                        </div>

                        {/* Login form */}
                        <form className='pt-6' action="" onSubmit={handelSubmit}>
                            {/* Email input */}
                            <div className='grid'>
                                <label htmlFor="email">Email : </label>
                                <div className='bg-slate-100 p-2'>
                                    <input 
                                        type="email" 
                                        onChange={handleOnChange}
                                        name='email'
                                        required
                                        value={data.email}
                                        placeholder='enter email' 
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>

                            {/* Password input with show/hide functionality */}
                            <div className='grid'>
                                <label htmlFor="password">Password : </label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input 
                                        type={showPassword ? "text" : "password" } 
                                        name='password'
                                        value={data.password}
                                        required
                                        onChange={handleOnChange}
                                        placeholder='enter password' 
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div className='cursor-pointer text-xl' onClick={()=>setShowPassword(!showPassword)}>
                                        <span>
                                            {
                                                showPassword ? (
                                                    <IoIosEyeOff/>
                                                )
                                                :
                                                (
                                                    <FaEye/>
                                                )
                                            }                                   
                                        </span>
                                    </div>
                                </div>
                                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-blue-700'>
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login button */}
                            <button className='bg-red-600 hover:bg-red-700 text-white p-1 w-full max-w-[110px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                        </form>
                        {/* Link to sign-up page */}
                        <p className='my-5'>Don't have account? <Link to={'/sign-up'} className='hover:text-red-700 hover:underline'>Sign Up</Link></p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login
