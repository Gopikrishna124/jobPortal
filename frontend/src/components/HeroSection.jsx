import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchJobHomePage } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
   const[searchQuery,setSearchQuery]=useState('')
   const dispatch=useDispatch()
   const navigate=useNavigate()
   
   const handleSearch=async()=>{
       dispatch(setSearchJobHomePage(searchQuery))
       navigate('/browse')
   }

   
  return (
    <div className='text-center mt-7 mb-5'>
        <div className='flex flex-col gap-7 my-10'>
        <span className='bg-slate-100 px-4 py-2 text-md tracking-wider rounded-full text-black font-semibold mx-auto'>Come And Find Your Dream Job in No 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search , Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1> 
        <p className='text-justify mx-auto italic'>A user-friendly job application platform that connects job seekers with employers, streamlining <br/>
         the application process with personalized profiles, job listings, and seamless application submissions.</p>       
         <div className='flex w-[30%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4  mx-auto'>
            <input type='text' placeholder='Find your Dream Job ' className='outline-none border-none w-full' onChange={(e)=>setSearchQuery(e.target.value)}/>
            <Button className='rounded-r-full bg-[#6A38C2]'  onClick={()=>handleSearch(searchQuery)}><Search className='w-5 h-5'/></Button>
          </div>
       </div>
     </div>
  )
}

export default HeroSection