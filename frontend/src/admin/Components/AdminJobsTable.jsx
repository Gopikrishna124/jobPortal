import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
   
  const allAdminJobs=useSelector((store)=>store.job.allAdminJobs)
   console.log('allAdminJobs',allAdminJobs)
      
  const [searchJob,setSearchJob]=useState(allAdminJobs)

 
  console.log('filterJob',searchJob)

  const searchJobByText=useSelector((state)=>state.job.searchJobByText)
  console.log('searchJobByText',searchJobByText)

  const navigate=useNavigate()


  useEffect(()=>{
    const filteredJob=allAdminJobs.length>=0  && allAdminJobs.filter((job)=>{
      if(!searchJobByText){
         return true 
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
      job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
  })
  setSearchJob(filteredJob)
  },[searchJobByText,allAdminJobs])

//..........................................................................
const handleEdit=(id)=>{
     
     navigate(`/admin/jobs/${id}`)
     
}
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
          searchJob?.length<0 ?<p>No Companies registered Yet</p>
            :searchJob?.map((job)=>(

              <TableRow>
             
          <TableCell>{job?.company.name}</TableCell>
          <TableCell>{job?.title}</TableCell>
          <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
          <TableCell className='text-right'>
            <Popover>
              <PopoverTrigger ><MoreHorizontal/></PopoverTrigger>
              <PopoverContent className='w-32'>
                   <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4"/>
                    <span onClick={()=>handleEdit(job._id)}>Edit</span>
                   </div>
                   <div className="flex items-center gap-2 cursor-pointer mt-2">
                    <Eye className="w-7"/>
                    <span onClick={()=>navigate(`/admin/jobs/${job?._id}/applicants`)}>Applicants</span>
                   </div>
              </PopoverContent>
            </Popover>
          </TableCell>
              </TableRow>
            ))
          }
        
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
