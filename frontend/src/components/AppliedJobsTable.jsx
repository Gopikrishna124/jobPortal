import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import axios from 'axios'
import { applicationEndPoint } from '@/RequestURLs'
import { setAllAppliedJobsByUser, setApplications } from '@/redux/applicationSlice'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'

function AppliedJobsTable() {
     
     const appliedJobsByUser=useSelector((state)=>state.application.allAppliedJobsByUser)
      console.log('appliedJobs',appliedJobsByUser)
      const dispatch=useDispatch()
     //............................................................
     const changeStatusColor=(status)=>{
        switch(status){
          case 'pending':{
            return ''
          }
          case 'accepted':{
            return 'bg-green-500'
          }
          case 'rejected':{
            return 'bg-red-500'
          }
        }
     }
      //.............................................................................
   useEffect(()=>{
     
     const getAppliedJobs=async()=>{
     
       try {
         const response=await axios.get(`${applicationEndPoint}/allApplications`,{withCredentials:true})
         console.log('response',response)
         if(response.data.success){
            dispatch(setAllAppliedJobsByUser(response.data.data))
         }
         else{
            throw response.data.message
         }
       } catch (err) {
         console.log('err',err)
         toast.error(err)
       }
     }
     getAppliedJobs()
   },[])
    
  return (
    <div>
        <Table>
            <TableCaption>A list of your recently Applied Jobs</TableCaption>
            <TableHeader>
                 <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                 </TableRow>
            </TableHeader>
            <TableBody>
                 
                     {
                        appliedJobsByUser?.length>0 ?appliedJobsByUser.map((item)=>{
                            if(item.job){
                            return <TableRow>
                                 <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                 <TableCell>{item?.job?.title}</TableCell>
                                 <TableCell>{item?.job?.company?.name}</TableCell>
                                 <TableCell className='text-right'><Badge className={`${changeStatusColor(item?.status)}`}>{item.status}</Badge></TableCell>
                             </TableRow>
                            }
                        }) 
                        :<p>No jobs applied</p>
                     }
                 
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobsTable