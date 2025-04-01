import React, { useState,useRef } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from '../ui/button.jsx';
import { Link} from "react-router-dom";
import axios from "axios";
import { userEndPoint } from "@/RequestURLs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setLoading } from "@/redux/userSlice";
import { Loader } from "lucide-react";

function Signup() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "",
    file:""
  });

  console.log('signupData',data)

  const [errData,seterrData]=useState('')

  const navigate=useNavigate()

  const input1=useRef(null)
  const input2=useRef(null)
  const input3=useRef(null)
  const input4=useRef(null)
  const input5=useRef(null)
  const input6=useRef(null)

  const dispatch=useDispatch()
  const loading=useSelector((state)=>state.user.loading)
   //................................................
   function changeInput(e){
    setData((prev)=>{
     return {
       ...prev,
       [e.target.name]:e.target.value
     }
    })
}
//...............................................................
function changeFile(e){
  setData((prev)=>{
    return {
      ...prev,
      file:e.target.files?.[0]
    }
  })
}

 //.................................................
 const  moveToNextRef=(e,inputRef)=>{
  if(e.key==='Enter'){
    e.preventDefault()
    inputRef.current.focus()
  }
 }
 //..................................................
  const validate=()=>{
     let errors={}
     const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
 const mobileRegex = /^[0-9]{10}$/; // 10 digit numbers only

     if(data.fullName===''){
        errors.fullName='fullName is required'
     }
    else if(!nameRegex.test(data.fullName)){
      errors.fullName='name should contain alphabets and spaces and must be mimium 8 characters'
    }

    //email

    if(data.email===''){
      errors.email='email is required'
   }
  else if(!emailRegex.test(data.email)){
    errors.email='enter valid email'
  }

  //phoneNumber

  if(data.phoneNo===''){
    errors.phoneNo='fullName is required'
 }
else if(!mobileRegex.test(data.phoneNo)){
  errors.phoneNo='enter valid phone Number'
}

//password

 if(data.password===''){
  errors.password='password is required'
}

  if(data.role===''){
    errors.role='pls select role'
  }

  seterrData(errors)
  console.log('errors',errors)
   console.log('keys length' ,Object.keys(errors).length)
  return Object.keys(errors).length===0
}


 //....................................................
 const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData= new FormData()
    formData.append('fullName',data.fullName);
    formData.append('email',data.email);
    formData.append('phoneNo',data.phoneNo);
    formData.append('password',data.password);
    formData.append('role',data.role)

    if(data.file){
      formData.append('file',data.file)
    }
     

   if(validate()){
     try {
       dispatch(setLoading(true))
       const response=await axios.post(`${userEndPoint}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
          withCredentials:true
        },
       
       })
         console.log('respsonse',response)
       if(response.data.success){
        navigate('/login')
        toast.success(response.data.message)
       }
     } catch (err) {
        console.log('signupError',err)
        toast.error(response.data.message)
     }
     finally{
      dispatch(setLoading(false))
     }
   }
   else{
    console.log('validate is false')
   }
 }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl  mx-auto text-lg">
        <form onSubmit={handleSubmit} className="w-1/2 border  border-gray-200 rounded-lg p-4  my-10 ">
          <h1 className="font-bold text-2xl mb-10 text-red-500 text-center">SIGN UP</h1>
          <div className="mb-4">
            <Label className="text-lg font-semibold">Full Name</Label>
            <Input
              type="text"
              ref={input1}
              name="fullName"
              value={data.fullName}
              placeholder="James Wood"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input2)}
            />
            <p className='text-red-500'>{errData.fullName && errData.fullName}</p>
          </div>

          <div className="mb-4">
            <Label className="text-lg">Email</Label>
            <Input
              type="email"
              ref={input2}
              name="email"
              value={data.email}
              placeholder="James@124gmail.com"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input3)}
            />
             <p className='text-red-500'>{errData.email && errData.email}</p>
          </div>

          <div className="mb-4">
            <Label className="text-lg">Phone Number</Label>
            <Input
              type="text"
              ref={input3}
              name="phoneNo"
              value={data.phoneNo}
              placeholder="943439333"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input4)}
            />
             <p className='text-red-500'>{errData.phoneNo && errData.phoneNo}</p>
          </div>

          <div className="mb-4">
            <Label className="text-lg">Password</Label>
            <Input
              type="password"
              ref={input4}
              name="password"
              value={data.password}
              placeholder="enter password"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input5)}
            />
             <p className='text-red-500'>{errData.password && errData.password}</p>
          </div>

          <div className="mb-4 flex justify-between">
            <RadioGroup
              defaultValue="option-one"
              className="flex gap-4 items-center"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  ref={input5}
                  onChange={changeInput}
                  onKeyDown={(e)=>moveToNextRef(e,input6)}
                />
                <Label htmlFor="option-one" className="text-lg">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input6)} 
                />
                <Label htmlFor="option-two" className="text-lg">
                  Recruiter
                </Label>

                
              
              </div>
             
            </RadioGroup>
           
            <div className="flex items-center gap-2">
              <Label className="text-lg">Profile</Label>
              <Input accept="image/*" type="file"  ref={input6} className="cursor-pointer"  onChange={changeFile}/>
            </div>
          </div>

          <p className='text-red-500'>{errData.role && errData.role}</p>
          {
             loading ? <Button className='w-full my-4'><Loader className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
           :

           <Button variant='outline' type='submit' className='w-full my-4 bg-black text-white text-lg rounded-xl h-15'>Sign Up</Button>
          }
           <span className="mb-5">Already have an account?<Link to='/login'><span className="text-red-500 ml-2 font-bold">Login</span></Link></span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
