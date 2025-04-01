import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allApplications:[], //all applications or all users applied for job seen by admin
    allAppliedJobsByUser:[],
   
}

const applicationSlice=createSlice({
    name:'application',
    initialState,
    reducers:{
        setApplications:(state,action)=>{
            state.allApplications=action.payload
        },
        setAllAppliedJobsByUser:(state,action)=>{
            state.allAppliedJobsByUser=action.payload
        },
        
    }


})
 
export const {setApplications,setAllAppliedJobsByUser} =applicationSlice.actions

export default applicationSlice.reducer