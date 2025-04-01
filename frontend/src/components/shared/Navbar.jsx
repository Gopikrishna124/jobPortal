import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogIn, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { userEndPoint } from "@/RequestURLs";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

function Navbar() {
    // const user=false
    const user=useSelector((state)=>state.user.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    //.......................................................
    const handleLogOut=async()=>{

      try {
         const response=await axios.get(`${userEndPoint}/logOut`,{withCredentials:true})
         console.log('logout',response)
         if(response.data.success){
          dispatch(setUser(''))
        
          navigate('/')
          toast.success(response.data.message)
         }
         else{
          throw response.error.message
         }
      } catch (err) {
        toast.error(err)
      }
    }
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-3xl font-bold">
            Go<span className="text-[#F83002] ml-1">Find</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex  text-xl font-bold items-center gap-5">

           {
            user?.role==='recruiter' ? 
            <>
            <Link to='/admin/companies'><li>Companies</li></Link>
            <Link to='/admin/jobs'><li>Jobs</li></Link>
            </>
            :
             <>
             <Link to='/'><li>Home</li></Link>
            <Link to='/jobs'><li>Jobs</li></Link>
            <Link to='/browse'><li>Browse</li></Link>
             </>
           }
            

          </ul>

          {
            user? 
            <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto ? (user?.profile.profilePhoto) :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}  alt='profileImage'/>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div>
                <div className="flex gap-5 items-center text-lg font-medium">
                  <Avatar className="cursor-pointer">
                    <AvatarImage  src={user?.profile?.profilePhoto ? (user?.profile.profilePhoto) :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}  alt='profileImage' />
                  </Avatar>
                  <div>
                    <h4>{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user?.profile?.bio!=='undefined'? user.profile.bio:''}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start  mt-4">
                  {
                    user&& user.role==='student' && (
                   <Link to='/profile'><Button variant="link" className="text-lg">
                    <User2/>  View profile
                  </Button></Link>
                    )
                 }
                  <Button  onClick={handleLogOut} variant="link" className="text-lg">
                    <LogOut/> LogOut
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover> :
            <div className="flex gap-2">
                <Link to='/login'><Button variant='outline' className='bg-red-500 text-white rounded-xl text-md p-2 h-auto min-w-[100px] '>Login</Button>
                </Link>

                <Link to='/signup'>
                <Button variant='outline' className='bg-black text-white rounded-xl text-md p-2 h-auto min-w-[100px]' >SignUp</Button>
                </Link>
            </div>
          }

         
        </div>
      </div>
    </div>
  );
}

export default Navbar;
