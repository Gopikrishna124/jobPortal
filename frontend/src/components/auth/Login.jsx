import React, { useState,useRef } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { userEndPoint } from "@/RequestURLs";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import { Loader } from "lucide-react";


function Login() {
  const [data, setData] = useState({
    email: "",
   password: "",
    role: "",
  });
  
  const input1=useRef(null)
  const input2=useRef(null)
  const input3=useRef(null)

  const [errData,seterrData]=useState('')

  const navigate=useNavigate()

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

  console.log('LoginData',data)
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
  
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format


  
   //email

   if(data.email===''){
     errors.email='email is required'
  }
 else if(!emailRegex.test(data.email)){
   errors.email='enter valid email'
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
 async function handleSubmit(e){
  e.preventDefault()
  if(validate()){
    try {
      dispatch(setLoading(true))
      const response=await axios.post(`${userEndPoint}/login`,data,{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
      })
        console.log('respsonse',response)
      if(response.data.success){
        dispatch(setUser(response.data.data))
       navigate('/')
       toast.success(response.data.message,{
         className: 'text-xl p-6 max-w-lg'
       })
      }
      else{
        throw response.data.message
      }
    } catch (err) {
       console.log('signupError',err)
       toast.error(err,{
         className: 'text-xl p-6 max-w-lg'
       })
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
        <form className="w-1/2 border  border-gray-200 rounded-lg p-4  my-10" onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl mb-10 text-red-500 text-center">
            LOGIN
          </h1>
        

          <div className="mb-4">
            <Label className="text-lg">Email</Label>
            <Input
              type="email"
              name="email"
              ref={input1}
              value={data.email}
              placeholder="James@124gmail.com"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input2)}
              className="focus:outline-none box-shadow:none"
            />
            <p className='text-red-500'>{errData.email && errData.email}</p>
          </div>

          <div className="mb-4">
            <Label className="text-lg">Password</Label>
            <Input
              type="password"
              name="password"
              ref={input2}
              value={data.password}
              placeholder="enter password"
              onChange={changeInput}
              onKeyDown={(e)=>moveToNextRef(e,input3)}

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
                  ref={input3}
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  onChange={changeInput}
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

                />
                <Label htmlFor="option-two" className="text-lg">
                  Recruiter
                </Label>
              </div>

             
            </RadioGroup>
           
          </div>
          <p className='text-red-500'>{errData.role && errData.role}</p>

          {
            loading ? <Button className='w-full my-4'><Loader className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
            :
          <Button
            variant="outline"
            type="submit"
            className="w-full my-4 bg-black text-white text-lg rounded-xl h-15"
          >
            Login
          </Button>
}
          <span className="mb-5">
            Don't have an account?
            <Link to="/signup">
              <span className="text-red-500 ml-2 font-bold">Sign Up</span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
