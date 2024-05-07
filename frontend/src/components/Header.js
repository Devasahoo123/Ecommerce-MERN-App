import React, {  useState } from 'react'
import logoimg from '../assest/banner/e-commerce.png'
import { RiSearchLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummarApi from '../common/SummarApi';
import {toast} from 'react-toastify';
import ROLL from '../common/role';

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  // Accessing user data from Redux store
  const user = useSelector(state => state?.user?.user?.user);

  // useEffect(() => {
  //   console.log()
  //   setUser(selectedUser);
  // }, []);

  const handleLogout=async()=>{
    // localStorage.removeItem("token")
    // window.location.reload()
    const fetchData = await fetch(SummarApi.logout_user.url,{
      credentials : 'include'
    })
    const data = await fetchData.json();

    if(data.success){
      toast.success(data.message)
      localStorage.removeItem("token")
      window.location.reload()
    }else{
      toast.error(data.message)
    }
  }

  return (
    <>
      {/* Header section */}
      <header className='h-18 shadow-md bg-white w-full fixed z-40'>
        {/* Container for header content */}
        <div className="h-full container  flex items-center w-full mx-auto justify-between ">
          {/* Logo */}
          <div className='flex items-center'>
            {/* Link to home page */}
            <Link href="/"> <img className='logoimg11 cursor-pointer' src={logoimg} alt="" /></Link>
          </div>

          {/* Search bar */}
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            {/* Input for search */}
            <input type="text"  placeholder='Search product here....' className='w-full outline-none '/>
            {/* Search icon */}
            <div className='text-lg h-8 min-w-[50px] bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <RiSearchLine/>
            </div>
          </div>

          {/* User icons and cards */}
          <div className='flex item-center gap-7 '>
            {/* Profile picture or default user icon */}
            <div className='relative flex justify-center'>
              {
                user?._id && ( 
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>{if (user) setMenuDisplay(p=>!p)}}>
                    {
                      user?.profilePic ? (
                        <>
                          <img className='w-10 h-10 rounded-full' src={user.profilePic} alt="" />
                        </>
                        ) : (
                        <FaRegUserCircle/>
                      )
                    }
                  </div>
                )
              }
              {
                user && menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                    <nav>
                      {
                        user?.role === ROLL.ADMIN &&(
                          <Link to={"admin-pannel/product"} className='whitespace-nowrap md:block hover:bg-slate-100 p-2'onClick={()=>setMenuDisplay(p=>!p)}>Admin Panel</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }
              
            </div>
            
            {/* Shopping cart icon with item count */}
            <div className='text-3xl cursor-pointer relative'>
              <span><GiShoppingCart/> </span> 
              {/* Cart item count */}
              <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                <p className='text-sm'>0</p>
              </div>
            </div>
            {/* Login button */}
            <div>
              {/* console.log(user) */}
              {
                user?._id ? (
                  <button onClick={handleLogout} className='px-4 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 justify-center '>Logout</button>
                )
                :(
                  <Link to="/login" className='px-4 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 justify-center '>Login</Link>
                )
              }
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
