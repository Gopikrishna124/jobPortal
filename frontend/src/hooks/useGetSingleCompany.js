import { setSingleCompany } from "@/redux/companySlice"
import { companyEndPoint } from "@/RequestURLs"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const useGetSingleCompany=async(companyId)=>{
  console.log('companyID',companyId)
     const dispatch=useDispatch()
    useEffect(()=>{
        const getCompany=async()=>{
          console.log('companyID2',companyId)
        try {
           const response=await axios.get(`${companyEndPoint}/SingleCompany/${companyId}`,{withCredentials:true}) 
          console.log('hookresponse',response)
          if(response.data.success){
            dispatch(setSingleCompany(response.data.data))
            toast.success(response.data.message)
          }
          else{
            throw response.data.message
          }
        } catch (err) {

            toast.error(err)
        }
    }
    getCompany()
    },[companyId,dispatch])
}
export default useGetSingleCompany