import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setClickOnSearch } from "@/redux/jobSlice";

function FilterCard() {

  const dispatch=useDispatch()

  const filterData = [
    {
      filterType: "Location",
      values: ["Delhi", "Hyderabad", "Bangalore", "Mumbai"],
    },
    {
      filterType: "Industry",
      values: ["FrontEnd Developer", "Backend Developer", "FullStack Developer","Cloud Engineer","Data Scientist"],
    },
    {
      filterType: "Salary",
      values: ["4-8lakhs", "9-12lakhs", "13-25lakhs"],
    },
  ];

  const [click,setClick]=useState('')
  console.log('click',click)

  //...................................................s
   useEffect(()=>{
       dispatch(setClickOnSearch(click))
   },[click])
  return (
  <div className="w-full">
       <h1 className="font-bold text-xl bg-white rounded-md ">Filter Jobs</h1>
       <hr className="mt-3"/>
       <RadioGroup>
           {
            filterData.map((item,index)=>(
                <div>
                    <h2 className="text-lg text-[#F83002] font-bold">{item.filterType}</h2>
                    {
                        item.values.map((data)=>(
                            <div onClick={(e)=>setClick(e.target.value)} className="flex items-center space-x-2 my-2">
                            <RadioGroupItem value={data} />
                            <Label>{data}</Label>
                          </div>
                    
                        ))
                    }
                </div>
                
            ))
           }
       </RadioGroup>
  </div>
  )
}

export default FilterCard;
