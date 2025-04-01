import { createSlice } from "@reduxjs/toolkit";

const initialState={
    singleCompany:'',
    allCompanies:[],
    searchCompanyByText:'',
    
}
console.log('initailState',initialState)
const companySlice=createSlice({
    name:'company',
    initialState,
    reducers:{
        setSingleCompany:(state,action)=>{
             state.singleCompany=action.payload
        },
        setAllCompanies:(state,action)=>{
            state.allCompanies=action.payload
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText=action.payload
        }
    }

})

export const {setSingleCompany,setAllCompanies,setSearchCompanyByText}=companySlice.actions
export default companySlice.reducer