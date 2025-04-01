import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import { jobEndPoint } from '@/RequestURLs'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs=async()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllAdminJobs=async()=>{
            try {
                
                const response=await axios.get(`${jobEndPoint}/allAdminJobs`,{
                    withCredentials:true   
                   }) 
                   console.log('AdminjobsData',response)
                   if(response.data.success){
                      dispatch(setAllAdminJobs(response.data.data))
                   }

            } catch (err) {
                console.log('jobError',err)
            }
         
        }
        fetchAllAdminJobs()
    },[])
}

export default useGetAllAdminJobs