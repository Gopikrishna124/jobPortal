import { setSingleAdminJob } from "@/redux/jobSlice"
import { jobEndPoint } from "@/RequestURLs"
import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"


const useGetSingleAdminJobs=(jobId)=>{
     const dispatch=useDispatch()
    useEffect(()=>{
       const singleJob=async()=>{
          try {
            const response=await axios.get(`${jobEndPoint}/singleJob/${jobId}`,{
                withCredentials:true
            })
            console.log('resposne',response)
            if(response.data.success){
                dispatch(setSingleAdminJob(response.data.data))
            }
            else{
                throw response.data.message
            }
          } catch (err) {
             toast.error(err)
          }
       }
       singleJob()
    },[jobId])
}

export default useGetSingleAdminJobs