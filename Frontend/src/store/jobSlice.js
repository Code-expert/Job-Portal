import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        GetAllJobs:[],
        GetAdminJobs:[],
        allAppliedJobs:[],
        SingleJob:null,
        searchjobsByText:"",

    },
    reducers:{
        setGetAllJobs:(state,action) =>{
            state.GetAllJobs=action.payload;
        },
        setSingleJob:(state,action) =>{
            state.SingleJob=action.payload;
        },
        setGetAdminJobs:(state,action) =>{
            state.GetAdminJobs=action.payload;
        },
        setSearchJobsByText:(state,action) =>{
            state.searchjobsByText=action.payload;
        },
        setallAppliedJobs:(state,action) =>{  
        state.allAppliedJobs=action.payload;
        },
    }
})
export const {setGetAllJobs,setSingleJob,setGetAdminJobs,setSearchJobsByText,setallAppliedJobs} = jobSlice.actions;
export default jobSlice.reducer;