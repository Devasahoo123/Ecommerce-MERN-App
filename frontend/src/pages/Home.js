import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct.js'
import HorizontalCardProduct from '../components/HorizontalCardProduct.js'
import VerticalCardProduct from '../components/VerticalCardProduct.js'

function Home() {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"top's Airpods"}/>
      <HorizontalCardProduct category={"earphones"} heading={"top's Earphone"}/>
      <HorizontalCardProduct category={"watches"} heading={"top's Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"top's Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"top's Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"top's TVs"}/>
      <VerticalCardProduct category={"camera"} heading={"top's Camers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home
