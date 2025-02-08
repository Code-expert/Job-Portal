import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState} from "react";
import {  setSingleJob } from "../store/jobSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JobDescription() {
    const {SingleJob} = useSelector(store => store.job);
    const {user} = useSelector(store => store.auth);
    const initiallyApplied = SingleJob?.applications?.some(application => application.Applicant== user._id)||false;
    const [isApplied, setIsApplied] = useState(initiallyApplied);
    const params = useParams();
    const jobId = params.id
    const dispatch = useDispatch();

    const applyJobHandler = async()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true}  );
            if (res.data.success) {
                setIsApplied(true);
                const newJob = {...SingleJob,applications:[...SingleJob.applications,{Applicant:user?._id}]};
                dispatch(setSingleJob(newJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(()=>{
        const fetchSingleJobs = async () => {
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true}  );
            console.log(res);
            if (res.data.success) {
              dispatch(setSingleJob(res.data.job));
              setIsApplied(res.data.job.applications.some(application => application.Applicant== user?._id)||false);
    
            } 
          } catch (error) {
            console.log(error)
          }
        }
        fetchSingleJobs();
      },[jobId,user?._id,dispatch])

  return (
    <div className="max-w-7xl mx-auto  my-10">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="font-bold text-xl">{SingleJob?.title}</h1>
                <div className="flex items-center gap-2 mt-4">
                <span className=" bg-blue-50 rounded-3xl text-blue-900 font-bold text-sm m-2">{SingleJob?.Position} Positions</span>
                <span className=" bg-blue-50 rounded-3xl text-red-700 font-bold text-sm m-2">{SingleJob?.salary} LPA</span>
                <span className=" bg-blue-50 rounded-3xl text-purple-800 font-bold text-sm m-2">{SingleJob?.jobtype}</span>
                </div>
            </div>
            <button 
            onClick={isApplied?null:applyJobHandler}
            disabled={isApplied} className={`rounded-lg p-2 text-white ${isApplied? 'bg-gray-600 cursor-not-allowed':'bg-purple-700 hover:bg-purple-8   00'}`}>{isApplied?'Already Applied ':'Apply Now'}</button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{SingleJob?.description}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.ExperienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{SingleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
    </div>
  )
}

export default JobDescription