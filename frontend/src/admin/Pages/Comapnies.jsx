import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompanyTable from '../Components/CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllComapnies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

function Comapnies() {
  
  const navigate=useNavigate();
  useGetAllCompanies();
  const [filter,setFilter]=useState('')
  console.log('filter',filter)
  const dispatch=useDispatch()
  //.................................................

    useEffect(()=>{
         dispatch(setSearchCompanyByText(filter))
    },[filter])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex justify-between items-center my-8'>
            <Input className="w-fit" placeholder="Filter By Name" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
            </div>

           <CompanyTable/>
        </div>
    </div>
  )
}

export default Comapnies