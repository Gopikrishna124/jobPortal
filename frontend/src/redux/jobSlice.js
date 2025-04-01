
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    allJobs:[],
    SingleJob:'',
    allAdminJobs:[],
    searchJobByText:"",
    singleAdminJob:'',
    clickOnSearch:'',
    SearchJobHomePage:''
   
}

const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setSingleJob:(state,action)=>{
            state.SingleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload
        },
        setSingleAdminJob:(state,action)=>{
            state.singleAdminJob=action.payload
        },
        setClickOnSearch:(state,action)=>{
            state.clickOnSearch=action.payload
        },
       setSearchJobHomePage:(state,action)=>{
         state.SearchJobHomePage=action.payload
       }

    }

    
})

export  const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setSingleAdminJob,setClickOnSearch,setSearchJobHomePage} = jobSlice.actions
export default jobSlice.reducer

