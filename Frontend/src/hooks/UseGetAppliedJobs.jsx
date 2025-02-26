import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../constant";
import { setallAppliedJobs } from "../store/jobSlice"; // ✅ Use correct action

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setallAppliedJobs(res.data.application)); // ✅ Correct action
        } else {
          console.error("Error: Failed to fetch applied jobs");
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchJobs();
  }, []); // ✅ Dependency array added (runs only on mount)
};

export default useGetAppliedJobs;
