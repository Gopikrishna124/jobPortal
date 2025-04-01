import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";
import { companyEndPoint } from "@/RequestURLs";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CompanySetUp() {

  const params=useParams()
  console.log('params',params.id)
   
  useGetSingleCompany(params.id)

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: "",
  });
  console.log("input", input);

  const inputRef1=useRef('')
  const inputRef2=useRef('')
  const inputRef3=useRef('')
  const inputRef4=useRef('')
  const inputRef5=useRef('')
  

  const [Errors,setErrors]=useState({})
  const [loading,setLoading]=useState()

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const singleCompany=useSelector((state)=>state.company.singleCompany)
  //..........................................
  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //.........................................................
  const changeFile=(e)=>{
    const file=e.target.files?.[0]
    setInput({...input,file})
  }

  //.......................................................
  const moveToNextRef=(e,inputRef)=>{
    if(e.key==='Enter'){
      e.preventDefault()
      inputRef.current.focus()
    }
  }
  //.........................................................
  const validate=()=>{
      let errors={}

      //check companyName
      if(input.name===''){
        errors.name='Company Name is required'
      }

      //check description
      if(input.description===''){
        errors.description='description is required'
      }

      //check location

      if(input.location===''){
        errors.location='location is required'
      }

      setErrors(errors)

      return Object.keys(errors).length==0

  }
  
  //...........................................................
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData=new FormData()
   formData.append('name',input.name)
   formData.append('description',input.description)
   formData.append('website',input.website)
   formData.append('location',input.location)
    if(input.file){
      formData.append('file',input.file)
    }


    if(validate()){
       try {
       setLoading(true)
         const response=await axios.put(`${companyEndPoint}/update/${params?.id}`,formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true
         })
         console.log('response',response)
         if(response.data.success){
           toast.success(response.data.message)
           navigate('/admin/companies')
         }
         else{
          throw response.data.message
         }
       } catch (err) {
          toast.error(err)
       }
       finally{
         setLoading(false)
       }
    }
        else{
            toast.error('fill required fields')
        }
  
    
  }
 
   //.................................................
   
    useEffect(()=>{
     
      setInput({
        name:singleCompany?.name || '',
        description:singleCompany?.description || '',
        website:singleCompany?.website || '',
        location:singleCompany?.location || '',
        file:singleCompany?.file || ''
      })
    
   
    },[params,dispatch,singleCompany])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl  mx-auto my-10">
        
          <div className="flex items-center gap-10 p-8">
            <Button onClick={()=>navigate('/admin/companies')} variant="outline" className="flex items-center gap-3">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                ref={inputRef1}
                value={input.name}
                onChange={changeInput}
                onKeyDown={(e)=>moveToNextRef(e,inputRef2)}
              />
              <p className="text-red-400">{Errors.name && Errors.name}</p>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                ref={inputRef2}
                name="description"
                value={input.description}
                onChange={changeInput}
                onKeyDown={(e)=>moveToNextRef(e,inputRef3)}
              />
               <p className="text-red-400">{Errors.description && Errors.description}</p>
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="text"
                ref={inputRef3}
                name="website"
                value={input.website}
                onChange={changeInput}
                onKeyDown={(e)=>moveToNextRef(e,inputRef4)}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                ref={inputRef4}
                name="location"
                value={input.location}
                onChange={changeInput}
                onKeyDown={(e)=>moveToNextRef(e,inputRef5)}
              />
               <p className="text-red-400">{Errors.location && Errors.location}</p>
            </div>

            <div>
              <Label>Logo</Label>
              <Input
                 ref={inputRef5}
                type="file"
                accept='image/*'
                onChange={changeFile}
              />
            </div>

          </div>
          {
             loading ? <Button className='w-full my-4'><Loader className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
           :

           <Button variant='outline' type='submit' className='w-full my-4 bg-black text-white text-lg rounded-xl h-15'>update</Button>
          }
        </form>
      </div>
      </div>
    
  );
}

export default CompanySetUp;
