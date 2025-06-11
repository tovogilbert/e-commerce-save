import React from 'react'
import {FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo1 from '../assets/images/logo/logo1.svg';


const Footer = () => {
  return (
    <div className="bg-black text-white p-6 text-left lg:px-50 lg:h-40">
       <div className='flex flex-row flex-nowrap items-center justify-between'>
        <img src={logo1} alt="" srcSet="" />            
        <div className="flex justify-center space-x-4">
          <FaInstagram className='bg-gray-800 p-1.5 rounded-full' size={25} />
          <FaTwitter className='bg-gray-800 p-1.5 rounded-full' size={25} />
          <FaYoutube className='bg-gray-800 p-1.5 rounded-full' size={25} />
        </div>        
       </div>
        <p className=" text-white flex flex-col text-[13px] mt-4 opacity-80 lg:flex-row">
          <span>© 2023 dot.cards text task. </span>
          <span>All rights reserved</span></p>
    </div>
  )
}

export default Footer