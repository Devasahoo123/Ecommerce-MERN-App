import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummarApi from '../common/SummarApi'
import VerticalCard from '../components/VerticalCard'

const SearchPages = () => {
    const query= useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummarApi.searchProduct.url+query.search)
        const dataresponse = await response.json()
        
        setLoading(false)
        console.log(dataresponse)
        setData(dataresponse)
    }

    useEffect(()=>{
        // const timeout = setTimeout(() => {
          fetchProduct()
        // }, 1000);
        // return () => clearTimeout(timeout);
    },[query.search])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loding.....</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
      {
        data.length === 0 && !loading &&(
          <p className='text-lg text-center'>No Product Found</p>
        )
      }
      {
        data.length !== 0 && !loading &&(
          <VerticalCard loading={loading} data={data.data}/>  
          )
      }
    </div>
  )
}

export default SearchPages
