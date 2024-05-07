import React, { useEffect, useState } from 'react'
import image1 from  "../assest/banner/img1.webp";
import image2 from  "../assest/banner/img2.webp";
import image3 from  "../assest/banner/img3.jpg";
import image4 from  "../assest/banner/img4.jpg";
import image5 from  "../assest/banner/img5.webp";
import img1_mobile from '../assest/banner/img1_mobile.jpg'
import img2_mobile from '../assest/banner/img2_mobile.webp';
import img3_mobile from '../assest/banner/img3_mobile.jpg'
import img4_mobile from '../assest/banner/img4_mobile.jpg'
import img5_mobile from '../assest/banner/img5_mobile.png'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {

    const [currentImage, setcurrentImage] =useState(0);
    const desktopImages = [image1, image2, image3, image4, image5];
    const mobileImages = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile];
    const nextImage = () =>{
      if(currentImage < desktopImages.length-1){
        setcurrentImage(prev=>prev+1)
      }
    } 
    const prevImage = () =>{
      if(currentImage > 0){
        setcurrentImage(prev=>prev-1)
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        if(currentImage < desktopImages.length-1){
          nextImage();
        }else{
          setcurrentImage(0);
        }
      }, 3000);
      return () => clearInterval(interval);

    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='h-56 md:h-72 w-full  bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-3xl hover:cursor-pointer'>
            <button onClick={prevImage} className='bg-white rounded-full'><FaAngleLeft/></button>
            <button onClick={nextImage} className='bg-white rounded-full'><FaAngleRight/></button>
          </div>
        </div>

      {/* in desktop and tablet version */}

        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {
              desktopImages.map((imageURL, index) => {
                  return(
                      <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                        
                          <img src={imageURL} alt=""  className='w-full h-full'/>
                      </div>
                  )
              })
          }
        </div>

        {/* in mobile version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
          {
              mobileImages.map((imageURL, index) => {
                  return(
                      <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                        
                          <img src={imageURL} alt=""  className='w-full h-full object-cover'/>
                      </div>
                  )
              })
          }
        </div>
       
      </div>
    </div>
  )
}

export default BannerProduct
