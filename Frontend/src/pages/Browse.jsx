import { useSelector } from "react-redux";
import Job from "../components/Job";
import useGetAllJobs from "../hooks/UseGetAlljobs";

function Browse() {
  useGetAllJobs();
  const { GetAllJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-bold text-2xl mb-6 text-gray-800">
        Search Results ({GetAllJobs.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GetAllJobs.length > 0 ? (
          GetAllJobs.map((job) => <Job key={job._id} job={job} />)
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Browse;
