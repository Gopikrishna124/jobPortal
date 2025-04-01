import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

function LatestJobs() {
    const randomJobs=[1,2,3,4,5,6,7,8]
    const jobs=useSelector((state)=>state.job.allJobs)
    console.log('jobs',jobs)
    
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-red-500 font-semibold'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-3 gap-3 my-7'>
        {
          jobs.length<=0? <span>No jobs available</span> :
            jobs.slice(0,6).map((job,index)=>(
                <LatestJobCards key={job._id} job={job}/>
                
            ))
        } 
        </div>
     
    </div>
  )
}

export default LatestJobs