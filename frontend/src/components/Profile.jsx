import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import {  Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

function Profile() {


  
   const [open,setOpen]=useState(false)

   const user=useSelector((state)=>state.user.user)


  //  useEffect(()=>{
     
  //   const getAppliedJobs=async()=>{
    
  //     try {
  //       const response=await axios.get(`${applicationEndPoint}/allApplications`,{withCredentials:true})
       
  //       if(response.data.success){
  //          dispatch(setApplications(response.data.data))
  //       }
  //       else{
  //          throw response.data.message
  //       }
  //     } catch (err) {
  //       console.log('err',err)
  //       toast.error(err)
  //     }
  //   }
  //   getAppliedJobs()
  // },[dispatch,params?.id,user?._id])


  return (
    <div>
      <Navbar />
      <div className="max-w-4xl  mx-auto shadow-lg bg-white border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.logodesign.org/wp-content/uploads/2022/12/Screenshot_20221221_124119.png"
                alt="profile-iamge"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(!open)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-4 my-3">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-4 my-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
      
         <div className="my-5">
           <h1 className="font-bold text-lg">Skills</h1>
           <div className="flex items-center gap-3 mt-2">
           {
               user?.profile?.skills?.length==0 ? <span>NA</span>:
               user?.profile?.skills?.map((item,index)=>{
                 return <Badge key={index}>{item}</Badge>
              })
            }
           </div>
           
         </div>
 
         <div className="grid w-full max-w-sm items-center gap-1.5">
           <Label className='text-md font-bold'>Resume</Label>
           {
            user?.profile?.resumeOriginalName ?<a target="blank" href={user?.profile.resume} className="underline text-red-500 hover:underline font-bold">{user.profile.resumeOriginalName}</a> : <span>NA</span>
           }
         </div>

         
      </div>

        
      <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-10">
             <h1 className="font-bold text-lg mb-3">Applied Jobs</h1>
             {/* applied jobs table */}
             <AppliedJobsTable/>
         </div>
           {
            open && <UpdateProfileDialog open={open} setOpen={setOpen} />
           }
          
    </div>
  );
}

export default Profile;
