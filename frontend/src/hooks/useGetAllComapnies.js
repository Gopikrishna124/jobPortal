
import { setAllCompanies } from "@/redux/companySlice"
import { companyEndPoint } from "@/RequestURLs"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const useGetAllCompanies=async()=>{
     const dispatch=useDispatch()
     
     useEffect(()=>{
        const getAllCompanies=async()=>{
        try {
           const response=await axios.get(`${companyEndPoint}/allCompanies`,{withCredentials:true}) 
          console.log('hookresponse',response)
          if(response.data.success){
            dispatch(setAllCompanies(response.data.data))     
          }
          else{
            throw response.data.message
          }
        } catch (err) {

            toast.error(err)
        }
    }
    getAllCompanies()
    },[])
}
export default useGetAllCompanies