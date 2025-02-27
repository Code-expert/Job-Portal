import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  JOB_API_END_POINT } from "../constant";
import { setGetAllJobs } from "../store/jobSlice";


const useGetAllJobs = ()=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true}  );
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setGetAllJobs(res.data.jobs));

        } 
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllJobs();
  })
}
export default useGetAllJobs;