import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useGetSingleAdminJobs from '@/hooks/useGetSingleAdminJob'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function AdminJobSetup() {
  
  const params=useParams()
  console.log('params',params)

  useGetSingleAdminJobs(params?.id)

  const singleAdminJob=useSelector((state)=>state.job.singleAdminJob)

  //....................................
    useEffect(()=>{
       setData({
        title:singleAdminJob?.title || "",
        description:singleAdminJob.description || "",
        requirements:singleAdminJob.requirements || "",
        salary: singleAdminJob.salary || "",
        location: singleAdminJob.location || "",
        jobType:singleAdminJob.jobType || "",
        positions: singleAdminJob.positions ||"",
        experienceLevel: singleAdminJob.experienceLevel ||"",
        company:singleAdminJob.company || ""
       })
    },[singleAdminJob])


  const allCompanies = useSelector((state) => state.company.allCompanies);
  const navigate=useNavigate()
   const inputRef1 = useRef("");
    const inputRef2 = useRef("");
    const inputRef3 = useRef("");
    const inputRef4 = useRef("");
    const inputRef5 = useRef("");
    const inputRef6 = useRef("");
    const inputRef7 = useRef("");
    const inputRef8 = useRef("");

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

      console.log('data',data)

     const [Errors,setErrors]=useState('')

     const [loading,setLoading]=useState(false)

    //............................................
    const moveToNextRef=(e,inputRef)=>{
       if(e.key==='Enter'){
        e.preventDefault()
        inputRef.current.focus()
       }
    }

     //.......................................
  const changeFileHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeComapnyHandler=async(value)=>{
     const selectedCompany=allCompanies.find((company)=>company.name.toLowerCase()===value)
     setData({...data,company:selectedCompany})     
  }
    
  return (
    <div>
      <Navbar/>
      <div className='flex max-w-xl mx-auto gap-5'>
              <Button  onClick={()=>navigate('/admin/jobs')} variant='outline' className="flex items-center gap-3">
                 <ArrowLeft/>
                 Back
              </Button>
              <h1 className="font-bold text-2xl">Job Setup</h1>
            </div>
        <div className='flex w-screen items-center justify-center my-5'>
              <form className='max-w-5xl p-8 border border-gray-200 shadow-lg rounded-md'>
               
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
              <Select onValueChange={changeComapnyHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies.map((company) => (
                      <>
                        <SelectItem name="companyId" value={company._id}>
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
            Update Job
          </Button>
         }
               
            </form>
            
        </div>
    </div>
  )
}

export default AdminJobSetup