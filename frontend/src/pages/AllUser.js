import React, { useEffect, useState } from 'react'
import SummarApi from "../common/SummarApi";
import '../App.css';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
  const [allUser,setAllUser] = useState([]);
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id  : ""
})
  const fetchAllUsers = async()=>{
    const fetchData = await fetch(SummarApi.allUser.url,{
      method : SummarApi.allUser.method,
      credentials : 'include'
    })
    const dataResponse = await fetchData.json();
    
    if(dataResponse.success){
      setAllUser(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message);
    }


  }
  useEffect(()=>{
    fetchAllUsers();
  },[])
  return (
    <>
    <div className='bg-white pb-4 ml-2'>
      <table className='w-full usertable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>sno.</th>
            <th>name</th>
            <th>email</th>
            <th>Roll: </th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
          
        </thead>
        <tbody className='pb-4'>
          {
            allUser.map((el,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt.date).format('LL')}</td>
                  <td> 
                    {
                      <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                      onClick={()=>{
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                    }}
                    >
                        <MdModeEditOutline/>
                      </button>                     
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    {
      openUpdateRole && (
      <ChangeUserRole 
        onClose={()=>setOpenUpdateRole(false)}
        name={updateUserDetails.name}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        callFunc={fetchAllUsers}
      />
      )
    }
    </>
  )
}

export default AllUser
