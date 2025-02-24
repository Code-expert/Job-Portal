import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../constant";
import { setGetAdminJobs } from "../store/jobSlice";


const UseGetAllAdminJobs = ()=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/admin/job`,{withCredentials:true}  )
        if (res.data.success) {
          dispatch(setGetAdminJobs(res.data.jobs));

        } 
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllAdminJob();
  })
}
export default UseGetAllAdminJobs;