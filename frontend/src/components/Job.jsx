import { Bookmark, SaveOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Save } from "lucide-react";
import axios from "axios";
import { jobEndPoint } from "@/RequestURLs";
import { useDispatch } from "react-redux";



function Job({job}) {
    const [savedJob,setSavedJob]=useState(job?.saved)
    const dispatch=useDispatch()
  
  //.............................
  const daysAgo=(mongoTime)=>{
      const createdAt=new Date(mongoTime)
      const currentTime=new Date()
      const timeDiff=currentTime-createdAt
      // console.log('timeDiff',timeDiff)
       return Math.floor(timeDiff/(1000*24*60*60))

  }


  return (
    <div className=" p-5 rounded-md shadow-lg bg-white  border border-gray-200 hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-center ">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)===0 ? 'Today':`${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex  items-center gap-2 my-2">
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
        {job?.description}
        </p>
      </div>

      <div className=' flex items-center gap-3 mt-4'>
             <Badge className={'text-green-500 font-bold '} variant='outline'>{job?.positions}</Badge>
             <Badge className={'text-red-500 font-bold '} variant='ghost'>{job?.jobType}</Badge>
             <Badge className={'text-[#6A38C2] font-bold'} variant='ghost'>{job?.salary} LPA</Badge>
        </div>

        <div className='flex items-center gap-4 mt-4'>
                <Link to={`/jobdetails/${job?._id}`}>
                <Button variant='outline'>Details</Button></Link>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
    </div>
  );
}

export default Job;
