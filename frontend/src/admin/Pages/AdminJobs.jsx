import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from '../Components/AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

function AdminJobs() {
   useGetAllAdminJobs()
  const navigate=useNavigate();
  const [filter,setFilter]=useState('')
  console.log('filter',filter)
  const dispatch=useDispatch()
  
  //.................................................

    useEffect(()=>{
         dispatch(setSearchJobByText(filter))
    },[filter])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex justify-between items-center my-8'>
            <Input className="w-fit" placeholder="Filter By Name" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            <Button onClick={()=>navigate('/admin/jobs/create')}>New Job</Button>
            </div>

           <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs