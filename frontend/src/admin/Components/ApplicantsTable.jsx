import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicationEndPoint } from "@/RequestURLs";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ApplicantsTable() {
  const ShortlistingStatus = ["Accepted", "rejected"];
  const allApplications = useSelector(
    (state) => state.application.allApplications
  );
  //...............................................
  const changeStatusColor=(status)=>{
   switch(status){
     case 'pending':
        return ' text-black'
    case 'accepted':
        return ' text-green-500'
    case 'rejected':
        return 'text-red-500'
   }
  }
  //........................................
  const changeStatus=async(status,id)=>{
    try {
        const response=await axios.post(`${applicationEndPoint}/updateStatus/${id}`,{status},{
             headers:{
                'Content-Type':'application/json'
             },
             withCredentials:true
        })
        console.log('response',response)
        if(response.data.success){
            toast.success(response.data.message)
            window.location.reload()
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
      <Table>
        <TableCaption>A list of your recently applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allApplications?.length > 0 ? (
            allApplications.map((application) => (
              <TableRow>
                <TableCell>{application?.applicant?.fullName}</TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNo}</TableCell>
                <TableCell>
                    {
                        application?.applicant?.profile?.resume? (<a
                        className="underline text-blue-500"
                        href={application?.applicant?.profile?.resume}
                      >
                        {application?.applicant?.profile?.resumeOriginalName}
                      </a> ):<span>NA</span>
                    }
                
                </TableCell>
                <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                 <TableCell className={`${changeStatusColor(application?.status)}   text-xl  w-4 h-1   rounded-xl text-center `}>{application?.status}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {/* <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='status'></SelectValue>
                        </SelectTrigger>
                       
                        <SelectContent>
                            <SelectGroup>
                      
                            </SelectGroup>
                        </SelectContent>

                      </Select> */}
                     
                      {
                      ShortlistingStatus.map((status, index) => (
                          <div onClick={()=>changeStatus(status,application?._id)}  className="cursor-pointer p-1 hover:bg-black hover:text-white">
                              <span value={status}>{status}</span>
                          </div>
                         
                        ))}
                     
                    </PopoverContent>
                  
                  </Popover>
                  
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>No user Applied yet</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
