import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobEndPoint } from "@/RequestURLs";
import axios from "axios";
import { es2015 } from "globals";
import { Loader } from "lucide-react";

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateAdminJob() {
    const [loading,setLoading]=useState(false)
  const [data, setData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    positions: "",
    experienceLevel: "",
    company: "",
  });

  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");
  const inputRef4 = useRef("");
  const inputRef5 = useRef("");
  const inputRef6 = useRef("");
  const inputRef7 = useRef("");
  const inputRef8 = useRef("");
  

  console.log("data", data);

  const allCompanies = useSelector((state) => state.company.allCompanies);

  const [Errors, setErrors] = useState({});

  const navigate=useNavigate()
  //.......................................
  const changeFileHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const changeCompanyHandler=async(value)=>{
  console.log('value',value)
     const selectedCompany=allCompanies.find((company)=>company.name.toLowerCase()===value)
     console.log('selectedCOmpany',selectedCompany)
     setData({...data,company:selectedCompany._id})     
  }
  //............................................
  const moveToNextRef = (e, inputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current.focus();
    }
  };



  //...................................................
  const validate = () => {
   
   let errors={}
  
    for (let key in data) {
        if(data[key]===''){
               errors={...errors,[key]:`${key} is missing`}
        }
    }

    console.log("Errors", errors);

     setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  //................................................................
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allCompanies?.length > 0) {
      if (validate()) {
        try {
            setLoading(true)
            const response=await axios.post(`${jobEndPoint}/createJob`,data,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            console.log('response',response)
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/admin/jobs')
            }
            else{
                throw response.data.message
            }
        } catch (err) {
          console.log('err',err)   
         toast.error(err)
        }
        finally{
            setLoading(false)
        }
      }
     else {
      console.log("check comapnies");
    }

}
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-screen items-center justify-center my-5">
        <form
          onSubmit={handleSubmit}
          className="p-8 max-w-5xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                ref={inputRef1}
                name="title"
                value={data.title}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef2)}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
              <p className="text-red-500">{Errors.title && Errors.title}</p>
            </div>

            <div>
              <Label>description</Label>
              <textarea
                type="text"
                ref={inputRef2}
                rows="4"
                cols="55"
                name="description"
                value={data.description}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef3)}
                className=" border focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.description && Errors.description}</p>
            </div>

            <div>
              <Label>requirements</Label>
              <textarea
                rows="4"
                cols="55"
                ref={inputRef3}
                name="requirements"
                value={data.requirements}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef4)}
                className="border focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
              <p className="text-red-500">{Errors.requirements && Errors.requirements}</p> 
            </div>

            <div>
              <Label>salary</Label>
              <Input
                type="text"
                name="salary"
                ref={inputRef4}
                value={data.salary}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef5)}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.salary && Errors.salary}</p>
            </div>

            <div>
              <Label>location</Label>
              <Input
                type="text"
                name="location"
                ref={inputRef5}
                value={data.location}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef6)}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.location && Errors.location}</p>
            </div>

            <div>
              <Label>jobType</Label>
              <Input
                type="text"
                name="jobType"
                ref={inputRef6}
                value={data.jobType}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef7)}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.jobType && Errors.jobType}</p>
            </div>

            <div>
              <Label>positions</Label>
              <Input
                type="number"
                name="positions"
                ref={inputRef7}
                value={data.positions}
                onChange={changeFileHandler}
                onKeyDown={(e) => moveToNextRef(e, inputRef8)}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.positions && Errors.positions}</p>
            </div>

            <div>
              <Label>experienceLevel</Label>
              <Input
                type="text"
                name="experienceLevel"
                ref={inputRef8}
                value={data.experienceLevel}
                onChange={changeFileHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
               <p className="text-red-500">{Errors.experienceLevel && Errors.experienceLevel}</p>
            </div>

            {allCompanies.length > 0 && (
              <Select onValueChange={changeCompanyHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies.map((company) => (
                      <>
                        <SelectItem name="company" value={company?.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      </>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
           
          </div>
          <p className="text-red-500">{Errors.company && Errors.company}</p>
         {
            loading ?  <Button className=" mt-4" type="submit">
            <Loader/> please wait
          </Button> :
            <Button className=" mt-4" type="submit">
            Post New Job
          </Button>
         }
          {allCompanies.length === 0 && (
            <p className="text-red-500 font-semibold my-3">
              Please register a company first
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateAdminJob;
