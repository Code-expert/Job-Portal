import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompaniesByText:"",
    },
    reducers:{
        setsingleCompany:(state,action)=>{
            state.singleCompany = action.payload;   
        },
        setCompanies:(state,action)=>{
            state.companies = action.payload;
        },
        setSearchCompaniesByText:(state,action)=>{
            state.searchCompaniesByText = action.payload;
        }
    }
});
export const {setsingleCompany,setCompanies,setSearchCompaniesByText} = companySlice.actions;
export default  companySlice.reducer;