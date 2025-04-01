import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const UserProtectingRoutes=({children})=>{
  const navigate=useNavigate()
  const user=useSelector((state)=>state.user.user)

    useEffect(()=>{
       if(!user){
           navigate('/login')
          
       }
    },[])

    return (
        <>
        {children}
         </>
    )
};

export default UserProtectingRoutes