import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from '../Components/ApplicantsTable'
import axios from 'axios'
import { applicationEndPoint } from '@/RequestURLs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplications } from '@/redux/applicationSlice'

function Applicants() {
     const params=useParams()
     const dispatch=useDispatch()
     const allApplications=useSelector((state)=>state.application.allApplications)
    
     ///......................................................
    useEffect(()=>{
       const fetchAllApplicants=async()=>{
        try {
          const resposne=await axios.get(`${applicationEndPoint}/noOfUsersApplied/${params.id}`,{withCredentials:true})
          console.log('response',resposne)
          if(resposne.data.success){
             dispatch(setApplications(resposne.data.data.applications))

          }
          else{
            throw resposne.data.message
          }
        } catch (err) {
          toast.error(err)   
        }
       }
       fetchAllApplicants()
    },[params?.id])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
           <h1 className='font-bold text-xl my-5'>Applicants ({allApplications?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants