import React, { useContext, useEffect, useState } from 'react'
import SummarApi from '../common/SummarApi';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data,setData]= useState([]);
  const [loading,setloading]= useState(false);
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)
  const navigate = useNavigate();

  const fetchData = async() =>{
    
    const response = await fetch(SummarApi.addToCartProductView.url,{
      method : SummarApi.addToCartProductView.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      }
    })

    const responseData = await response.json()
    if(responseData.success){
      setData(responseData.data)
    }
  }

  const handleLoaging=async()=>{
    await fetchData();
  }
  useEffect(()=>{
    setloading(true);
    handleLoaging()
    setloading(false);
  },[])

  const increaseQty =async (id,qty,e)=>{
    e.stopPropagation();
    const response = await fetch(SummarApi.updateCartProduct.url,{
      method : SummarApi.updateCartProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      },
      body : JSON.stringify({
        id : id,
        quantity : qty+1
      })
    })
    const responseData = await response.json()
    if(responseData.success){
      fetchData()
    }
  }

  const decreaseQty =async (id,qty,e)=>{
    e.stopPropagation();
   if(qty>1){
    const response = await fetch(SummarApi.updateCartProduct.url,{
      method : SummarApi.updateCartProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      },
      body : JSON.stringify({
        id : id,
        quantity : qty-1
      })
    })
    const responseData = await response.json()
    if(responseData.success){
      fetchData()
    }
   }
  }

  const deleteCartProduct = async (id, e)=>{
    e.stopPropagation();
    const response = await fetch(SummarApi.deleteAddToCartProduct.url,{
      method : SummarApi.deleteAddToCartProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      },
      body : JSON.stringify({
        id : id,
      })
    })
    const responseData = await response.json()
    if(responseData.success){
      fetchData()
      context.fetchUserAddToCart();
    }
  }

  const totalQty = data.reduce((previousValue,currentValue)=>previousValue+currentValue?.quantity,0)
  const totalPrice = data.reduce((previousValue,currentValue)=>previousValue+(currentValue?.quantity * currentValue?.productId?.sellingPrice),0)
  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className='bg-slate-200 py-32'>Nothing Added in Cart</p>
          )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>
        {/* view product */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el,index)=>{
                <div key={el +"Add to Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-30 animate-pulse rounded'>

                </div>
              })
            ):( 
              data.map((product,index)=>{
               return( 
                <div key={"/product/"+product?._id +"Add to Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-30 rounded grid grid-cols-[128px,1fr] cursor-pointer' onClick={() => navigate("/product/"+product?.productId?._id)}>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} alt="product" className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>
                    <div className='px-4 py-2 relative'>
                      <div className='absolute right-0 text-red-600 rounded-full text-2xl mx-2 hover:bg-red-600 hover:text-white hover:cursor-pointer' onClick={(e)=>deleteCartProduct(product?._id, e)}>
                        <MdDelete/>
                      </div>
                      <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500' > {product?.productId?.category} </p>
                      <div className='flex items-center justify-between'>
                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                        <p className='text-slate-500 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice* product?.quantity)}</p>
                      </div>
                      <div className='flex items-center gap-3 mt-1'>
                        <button className='border border-red-600 text-red-600 w-10 h-6 flex justify-center hover:bg-red-600 hover:text-white items-center rounded-full text-4xl pb-2' onClick={(e)=>decreaseQty(product?._id,product?.quantity, e)}>-</button>
                        <span>{product?.quantity}</span>
                        <button className='border border-red-600 text-red-600 w-10 h-6 flex justify-center hover:bg-red-600 hover:text-white items-center rounded-full text-3xl pb-2' onClick={(e)=>increaseQty(product?._id,product?.quantity, e)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
        {/* toal product summery */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                Total
              </div>
            ):(
              <div className='h-36 bg-slate-200'>
                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Total</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button className='bg-blue-600 p-2 mt-4 mb-0 w-full text-white'>Pyment</button>
              </div>
            )
          }
        </div>
        
      </div>
    </div>
  )
}

export default Cart
