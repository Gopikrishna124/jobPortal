import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "../FilterCard";
import Job from "../Job";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { jobEndPoint } from "@/RequestURLs";
import { setClickOnSearch } from "@/redux/jobSlice";

function Jobs() {
  const jobs = useSelector((state) => state.job.allJobs);

  const [filterJob, setFilterJob] = useState(jobs);


  const clickedSearch = useSelector((state) => state.job.clickOnSearch);
  console.log("clickedSearch", clickedSearch);
   
   useEffect(() => {
    const filterSearch = async () => {
    
      try {
      
        const response = await axios.get(
          `${jobEndPoint}/filterJobs?keyword=${clickedSearch}`,
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
  }, [clickedSearch,filterJob]);


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-30% max-w-[20%] ">
            <FilterCard />
          </div>

          {jobs.length <= 0 ? (
            <span>No job Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-5">
                {filterJob?.map((job, index) => (
                  <div>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
