import { setAllJobs } from '@/redux/jobSlice'
import { jobEndPoint } from '@/RequestURLs'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs=async()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                
                const response=await axios.get(`${jobEndPoint}/alljobs`,{
                    withCredentials:true   
                   }) 
                   console.log('jobsData',response)
                   if(response.data.success){
                      dispatch(setAllJobs(response.data.data))
                   }

            } catch (err) {
                console.log('jobError',err)
            }
         
        }
        fetchAllJobs()
    },[])
}

export default useGetAllJobs