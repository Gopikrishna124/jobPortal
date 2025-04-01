import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


function LatestJobCards({ key, job }) {
  const navigate=useNavigate()
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer
     hover:-translate-y-1 duration-300"  onClick={()=>navigate(`/jobdetails/${job._id}`)}>
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500 mt-2">{job?.location}</p>
      </div>

      <div>
        <h1 className="font-medium text-lg my-3">{job?.title}</h1>
        <p>{job?.description}</p>
      </div>

      <div className=" flex items-center gap-3 mt-4">
        <Badge className={"text-green-500 font-bold "} variant="outline">
          {job?.positions}
        </Badge>
        <Badge className={"text-red-500 font-bold "} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#6A38C2] font-bold"} variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
