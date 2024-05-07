import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummarApi from '../common/SummarApi.js'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async ()=>{
    const response = await fetch(SummarApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
  <div className='w-full items-center'>
  
    <div className='border-2 bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All products</h2>
      <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Products</button>
    </div>

    {/* all products */}

    <div className='flex items-center flex-wrap gap-5 py-4 px-4 h-[calc(100vh-190px)] overflow-y-scroll'>
      {
        allProduct.map((product,index)=>{
          return (
            <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            
          )
        })
      }
    </div>



    {/* upload products */}
    {
      openUploadProduct && (
        <UploadProduct onClose={()=>{
          setOpenUploadProduct(false)
        }} fetchData={fetchAllProduct}/>
      )
    }
    
  </div>
  )
}

export default AllProducts
