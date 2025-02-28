import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        GetAllJobs:[],
        GetAdminJobs:[],
        SingleJob:null,
        searchjobsByText:"",
        allAppliedJobs:[],
        searchQuery:""

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
    setsearchQuery:(state,action) =>{
        state.searchQuery=action.payload;
    },
}

})
export const {setGetAllJobs,setSingleJob,setGetAdminJobs,setSearchJobsByText,setallAppliedJobs,setsearchQuery} = jobSlice.actions;
export default jobSlice.reducer;