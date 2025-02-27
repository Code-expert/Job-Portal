import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../constant";
import { setallAppliedJobs } from "../store/jobSlice"; // ✅ Ensure correct action is used
import axios from "axios";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
        console.log("API Response:", res.data); // ✅ Check API response
        if (res.data.success) {
          dispatch(setallAppliedJobs(res.data.application)); // ✅ Ensure correct dispatch
          console.log("Dispatched applied jobs:", res.data.application); // Debug dispatch data
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchJobs();
  }, []); // ✅ Run only once on mount
};

export default useGetAppliedJobs;
