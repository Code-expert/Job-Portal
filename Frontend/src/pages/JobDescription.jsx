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
      <div className="bg-blue-300 shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{SingleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {SingleJob?.Position} Positions
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                {SingleJob?.salary} LPA
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                {SingleJob?.jobtype}
              </span>
            </div>
          </div>
          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`mt-4 md:mt-0 px-5 py-2 rounded-lg text-white font-semibold transition-all ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Job Description</h2>
        <p className="text-gray-700">{SingleJob?.description}</p>
      </div>

      {/* Job Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Job Details</h2>
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
