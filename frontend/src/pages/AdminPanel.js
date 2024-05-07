import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLL from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state=>state?.user?.user?.user)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role !== ROLL.ADMIN){
      navigate("/")
    }
  },[user])
  console.log(user);
  return (
    <>
      <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full  w-full max-w-60 customShadow'>
          <div className='h-32 flex justify-center flex-col'>
              <div className='text-5xl cursor-pointer relative flex justify-center'>
                {
                  user?.profilePic ? (
                    <img className='w-20 h-20 rounded-full' src={user.profilePic} alt="" />
                    ) : (
                    <FaRegUserCircle/>
                  )
                }
              </div>
              <center>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='capitalize text-sm '>{user?.role}</p>
              </center>
          </div>
          {/* navigation */}
          <div>
            <nav className='grid p-4'>
              <Link to={"all_users"} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
              <Link to={"product"} className="px-2 py-1 hover:bg-slate-100">Products</Link>
            </nav>
          </div>
        </aside>

        <main className=' w-full h-full'>
            <Outlet/>
        </main>
      </div>
    </>
  )
}

export default AdminPanel
