import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllCompanies from "@/hooks/useGetAllComapnies";

import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyTable() {
   
  const allCompanies=useSelector((store)=>store.company.allCompanies)
   console.log('allCompanies',allCompanies)
      
  const [searchCompany,setSearchCompany]=useState(allCompanies)

 
  console.log('filterCompany',searchCompany)

  const searchCompanyByText=useSelector((state)=>state.company.searchCompanyByText)

  const navigate=useNavigate()


  useEffect(()=>{
    const filteredCompanies=allCompanies.length>=0  && allCompanies.filter((company)=>{
      if(!searchCompanyByText){
         return true 
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
  })
  setSearchCompany(filteredCompanies)
  },[searchCompanyByText,allCompanies])

//..........................................................................
const handleEdit=(id)=>{
     
     navigate(`/admin/companies/${id}`)
     
}
  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
          searchCompany?.length<0 ?<p>No Companies registered Yet</p>
            :searchCompany?.map((company)=>(

              <TableRow>
                  <TableCell>
            <Avatar>
              <AvatarImage src={company?.logo? company.logo :"https://www.logodesign.org/wp-content/uploads/2022/12/Screenshot_20221221_124119.png" }/>
            </Avatar>
          </TableCell>
          <TableCell>{company?.name}</TableCell>
          <TableCell>{company?.createdAt.split('T')[0]}</TableCell>
          <TableCell className='text-right'>
            <Popover>
              <PopoverTrigger ><MoreHorizontal/></PopoverTrigger>
              <PopoverContent className='w-32'>
                   <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4"/>
                    <span onClick={()=>handleEdit(company._id)}>Edit</span>
                   </div>
              </PopoverContent>
            </Popover>
          </TableCell>
              </TableRow>
            ))
          }
        
        </TableBody>
      </Table>
    </div>
  );
}

export default CompanyTable;
