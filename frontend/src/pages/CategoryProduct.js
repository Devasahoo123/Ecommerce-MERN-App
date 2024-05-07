import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const parms = useParams();
    console.log(parms);
  return (
    <div>
        
      {parms?.categoryName}
    </div>
  )
}

export default CategoryProduct
