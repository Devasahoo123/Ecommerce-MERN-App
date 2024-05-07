import  { React, useState } from 'react'
import loginIcon from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import imageToBases64  from '../helpers/imageToBase64';
import {v4 as uuid} from "uuid";

// import User from '../../../backend/models/userModel';
import SummarApi from '../common/SummarApi'
import { toast } from 'react-toastify';

const SignUp = () => {
  
  const [showPassword, setShowPassword]=useState(false);
  const [showCPassword, setShowCPassword]=useState(false);
  const [data,setData]=useState({
      name:'',
      email:"",
      password:"",
      cpassword:"",
      profilePic:""
  });
  const navigate=useNavigate();

  const handleOnChange = (e)=>{
      const {name,value}=e.target;

      setData((prev)=>{
          return {
              ...prev,
              [name]: value
          }
      })
  }

  const handelSubmit=async(e)=>{
      e.preventDefault();

      if(data.password===data.cpassword){
          const  dataResponse = await fetch(SummarApi.signUp.url,{
            method: SummarApi.signUp.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
          }) 
          const dataApi =await dataResponse.json();
          if(dataApi.success){
            toast.success(dataApi.message);
            navigate("/login");
          }
         if(dataApi.error){
           toast.error(dataApi.message); 
         }
      }
      else{
        toast.error("Password not matches fill it again")
      }
  }

  const handleUploadPic = async(e)=>{
    try {
        const file=e.target.files[0];
        const formData = new FormData();
        formData.append("file",file);
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append("public_id", uuid());
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            body: formData,
            method: "POST",
        });

        const data = await res.json();

        setData((prev) => {
            return {
                ...prev,
                profilePic: data.url
            }
        });
        
    } catch (error) {
        console.error(error);
    }
    
  }

  return (
    <>
      <section id='signup'>
        <div className="container mx-auto px-4 ">
            
            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                  <div>
                    <img className='rounded-3xl' src={data.profilePic || loginIcon} alt="login-icon" />
                  </div>
                  if(data.profilePic===""){
                    <form action="">
                        <label>
                          <div className='text-xs bg-slate-200 bg-opacity-80 cursor-pointer  text-center pb-4 pt-2 absolute bottom-0 w-full'>
                            Upload Photo
                          </div>
                          <input type="file" className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                  }
                  
                  
                </div>

                <form className='pt-6 gap-2' action="" onSubmit={handelSubmit}>
                    <div className='grid'>
                        <label htmlFor="name">Name : </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="text" 
                                required
                                onChange={handleOnChange}
                                name='name'
                                value={data.name}
                                placeholder='enter your name' 
                                className='w-full h-full outline-none bg-transparent'
                            />
                        </div>
                    </div>
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

                    <div className='grid'>
                        <label htmlFor="password">Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? "text" : "password" } 
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                required
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
                        
                    </div>

                    <div className='grid'>
                        <label htmlFor="password">Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showCPassword ? "text" : "password" } 
                                name='cpassword'
                                value={data.cpassword}
                                required
                                onChange={handleOnChange}
                                placeholder='enter Confirm password' 
                                className='w-full h-full outline-none bg-transparent'
                            />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowCPassword(!showCPassword)}>
                                <span>
                                    {
                                        showCPassword ? (
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
                        
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white p-1 w-full max-w-[110px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>
                <p className='my-5'>alredy have account? <Link to={'/login'} className='hover:text-red-700 hover:underline'>Login</Link></p>
            </div>

        </div>
      </section>
      
    </>
  )
}

export default SignUp
