import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/companySlice'
import { companyEndPoint } from '@/RequestURLs'

import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function CreateCompany() {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    console.log('companyName',name)
    const dispatch=useDispatch()
  //...................................................
  const registerNewCompany=async()=>{
    try {
        const response=await axios.post(`${companyEndPoint}/registerCompany`,{name},{
            headers:{
               "Content-Type":"application/json"
            },
            withCredentials:true
        })
        console.log('response',response)
        if(response?.data?.success){
           dispatch(setSingleCompany(response?.data?.data))
           const companyId=response.data.data._id
           navigate(`/admin/companies/${companyId}`)
           toast.success(response.data.message)
        }
        else{
            throw response.data.message
        }
    } catch (err) {
        toast.error(err)
    }
  } 
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>

            <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>what would you like to give your Company Name? You can change later</p>
           </div> 
           
           <Label>Company Name</Label>
           <Input placeholder='Go Find Microsoft' className='my-2' value={name} onChange={(e)=>setName(e.target.value)}/>

        <div className='flex items-center gap-2 my-10'>
             <Button variant='outline' onClick={()=>navigate('/admin/companies')}>Cancel</Button>
             <Button onClick={registerNewCompany}>Continue</Button>
        </div>
        </div>
    </div>
  )
}

export default CreateCompany