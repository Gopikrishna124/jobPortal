import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Job from '../Job'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { jobEndPoint } from '@/RequestURLs'
import { setSearchJobHomePage } from '@/redux/jobSlice'


function Browse() {
  const SearchJobHomePage=useSelector((state)=>state.job.SearchJobHomePage)
  
  const [filterJob,setFilterJob]=useState([])
  const dispatch=useDispatch()
 

  useEffect(() => {
    const filterSearch = async () => {
      try {
        
        const response = await axios.get(
          `${jobEndPoint}/filterJobs?keyword=${SearchJobHomePage}`,
          { withCredentials: true }
        );
        console.log("response", response);
        if (response.data.data.length>0) {
          setFilterJob(response.data.data);      
        }
      
      } catch (err) {
        console.log(err);
      }
    }

    filterSearch();
  }, [filterJob?.length]);


 
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-7'>
            <h1 className='text-xl font-bold my-8'>Search Results ({filterJob.length})</h1>
            <div className='grid grid-cols-3 gap-4 my-3'>
                 
            {
                filterJob.map((job)=>(
                    <Job job={job} /> 
                ))
            }

            </div>
          
        </div>
    </div>
  )
}

export default Browse