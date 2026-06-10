import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSingleJob } from "../store/jobSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JobDescription() {
  const { SingleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const initiallyApplied =
    SingleJob?.applications?.some(
      (application) => application.Applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(initiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const newJob = {
          ...SingleJob,
          applications: [...SingleJob.applications, { Applicant: user?._id }],
        };
        dispatch(setSingleJob(newJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.Applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, user?._id, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Job Header */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{SingleJob?.title}</h1>
            <p className="text-lg text-gray-500 mt-1 font-medium">{SingleJob?.company?.companyName || "Individual Client"} • {SingleJob?.location}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${SingleJob?.sector === 'informal' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                {SingleJob?.sector === 'informal' ? 'Informal Sector' : 'Formal Sector'}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
                {SingleJob?.Position} Positions
              </span>
              <span className="px-3 py-1 bg-red-50 text-red-700 text-sm font-semibold rounded-full border border-red-100">
                {SingleJob?.salary} LPA
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-semibold rounded-full border border-purple-100">
                {SingleJob?.jobtype}
              </span>
            </div>
          </div>
          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`mt-6 md:mt-0 px-8 py-3 rounded-xl text-white font-bold transition-all shadow-md ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Job Description</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{SingleJob?.description}</p>
      </div>

      {/* Job Info Section */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Key Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-700">
            <span className="font-semibold">Role:</span> {SingleJob?.title}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Location:</span> {SingleJob?.location}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Experience:</span> {SingleJob?.ExperienceLevel} yrs
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Salary:</span> {SingleJob?.salary} LPA
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Total Applicants:</span> {SingleJob?.applications?.length}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Posted Date:</span>{" "}
            {SingleJob?.createdAt?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
