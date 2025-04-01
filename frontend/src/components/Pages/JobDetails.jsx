import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { applicationEndPoint, jobEndPoint } from "@/RequestURLs";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { setApplications } from "@/redux/applicationSlice";

function JobDetails() {
  const params = useParams();
  console.log("params", params);

  const singleJob = useSelector((state) => state.job.SingleJob);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // const initialApplied =
  //   singleJob?.applications?.some(
  //     (application) => application.applicant === user?._id
  //   ) || false;

  // console.log("initialAPplid", initialApplied);

  // const applications=useSelector((state)=>state.application.applications)
  // console.log('applications',applications)

  //   const matching=applications?.some((item)=>(
  //      item.job._id===params.id
  //  )) ||false

  //  console.log('matching',matching)

  const [isApplied, setisApplied] = useState('');
  console.log("isApplied", isApplied);

  //..............................................................................

  const applyJob = async () => {
    try {
      const response = await axios.get(
        `${applicationEndPoint}/applyJob/${params?.id}`,
        {
          withCredentials: true,
        }
      );
      console.log("response", response);
      if (response.data.success) {
        setisApplied(true); //update local state

        //update total applications in single Job
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));

        toast.success(response.data.message, {
          className: "text-xl p-6 max-w-lg",
        });
      } else {
        throw response.data.message;
      }
    } catch (err) {
      console.log("err", err);
      toast.error(err, {
        className: "text-xl  p-6 max-w-lg",
      });
    }
  };

  //..................................................................................
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const response = await axios.get(
          `${jobEndPoint}/singleJob/${params.id}`,
          {
            withCredentials: true,
          }
        );
        console.log("response", response);
        if (response.data.success) {
          dispatch(setSingleJob(response.data.data));
          console.log("fetchsingleJob", response);
          //update setApplied while feching single job
          setisApplied(
            response.data.data.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          throw response.data.message;
        }
      } catch (err) {
        toast.error(err);
      }
    };
    getSingleJob();
  }, [params?.id, user?._id, dispatch]);

  console.log("singleJob", singleJob);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-lg font-bold">{singleJob?.title}</h1>
        <div className="flex justify-between items-center">
          <div className=" flex items-center gap-3 mt-4">
            <Badge className={"text-green-500 font-bold "} variant="outline">
              {singleJob?.positions} positions
            </Badge>
            <Badge className={"text-red-500 font-bold "} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#6A38C2] font-bold"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>

          <Button
            onClick={isApplied ? null : applyJob}
            disabled={isApplied}
            className={`rounded-lg  ${
              isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#6A38C2]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <h1 className="border-b-2 border-b-gray-300 font-medium  mt-5 py-3">
          Job Description
        </h1>
        <div>
          <h1 className="font-bold my-1">
            Role :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}.
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}Lpa
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Date Posted :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
