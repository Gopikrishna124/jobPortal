import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogClose } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FastForward, Loader, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userEndPoint } from "@/RequestURLs";
import { setUser,setLoading } from "@/redux/userSlice";
import { toast } from "sonner";


function UpdateProfileDialog({ open, setOpen }) {
  // const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.user.user)
  // console.log('userData',user)

  const loading=useSelector((state)=>state.user.loading)

  const [data,setData]=useState({
     name:user?.fullName,
     email:user?.email,
     number:user?.phoneNumber,
     bio:user?.profile?.bio,
     skills:user?.profile?.skills?.map(skill=>skill),
     file:user?.profile?.resume,
     file2:user?.profile?.profilePhoto
  })
  console.log('inputData',data)

  const input1=useRef('')
  const input2=useRef('')
  const input3=useRef('')
  const input4=useRef('')
  const input5=useRef('')
  const input6=useRef('')
  const input7=useRef('')
  //.....................................................
  const close = () => {
    setOpen(false);
  };

  //......................................................
  const changeInput=(e)=>{
    setData((prev)=>{
        return {
            ...prev,
            [e.target.name]:e.target.value
        }
    })
  }
  //..............................................................
  const changeFile=(e)=>{
    const files=e.target.files?.[0]
    console.log('files',files)
    setData((prev)=>{
        return{
            ...prev,
            [e.target.name]:files
        }
    })
  }
  //................................................
   //.................................................
 const  MoveToNext=(e,inputRef)=>{
    if(e.key==='Enter'){
      e.preventDefault()
      inputRef.current.focus()
    }
   }

  //.................................................................
   const handleUpdate=async(e)=>{
    e.preventDefault()
    
       const formData=new FormData()
        formData.append('fullName',data.name)
        formData.append('email',data.email)
        formData.append('phoneNo',data.number)
       formData.append('bio',data.bio)
       formData.append('skills',data.skills)
       if(data.file){
        formData.append('file',data.file)
        }
        if(data.file2){
          formData.append('file2',data.file2)
        }
       
        try {
         dispatch(setLoading(true))
            const response=await axios.post(`${userEndPoint}/profile/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            console.log(response)
            if(response.data.sucess){
                dispatch(setUser(response.data.data))
                toast.success(response.data.message)
                setOpen(false)
            }
        } catch (err) {
            console.log('updateErr',err)
        }
        finally{
          dispatch(setLoading(false))
        }
       
   } 

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogClose onClick={close} />
          </DialogHeader>

          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" ref={input1} className="col-span-3" value={data.name} onChange={changeInput} onKeyDown={(e)=>MoveToNext(e,input2)}/>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email"  type='email' ref={input2} name="email" className="col-span-3" value={data.email}  onChange={changeInput} onKeyDown={(e)=>MoveToNext(e,input3)} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input id="number" name="number" ref={input3} className="col-span-3" value={data.number} onChange={changeInput} onKeyDown={(e)=>MoveToNext(e,input4)} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input id="bio" name="bio" className="col-span-3" ref={input4} value={data.bio} onChange={changeInput} onKeyDown={(e)=>MoveToNext(e,input5)}/>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input id="skills" name="skills" ref={input5} className="col-span-3" value={data.skills} onChange={changeInput} onKeyDown={(e)=>MoveToNext(e,input6)}/>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  ref={input6}
                  accept="application/pdf"
                  className="col-span-3 cursor-pointer"
                  onChange={changeFile}
                />

              </div>

              
              <div className="grid grid-cols-4 items-center gap-5">
                <Label htmlFor="file" className="text-right">
                   Profile Photo
                 
                </Label>
                <Input
            
                  type="file"
                  name="file2"
                  ref={input7}
                  className="col-span-3 cursor-pointer"
                  onChange={changeFile}
                  
                />
              </div>


              {loading ? (
                <Button className="w-full my-4">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full my-4 bg-black text-white text-lg rounded-xl h-15"
                  onClick={handleUpdate}
              >
                  Update
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
