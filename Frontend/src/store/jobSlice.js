import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        GetAllJobs:[],
        SingleJob:null,
    },
    reducers:{
        setGetAllJobs:(state,action) =>{
            state.GetAllJobs=action.payload;
        },
        setSingleJob:(state,action) =>{
            state.SingleJob=action.payload;
        },
    }

})
export const {setGetAllJobs,setSingleJob} = jobSlice.actions;
export default jobSlice.reducer;