import { useSelector } from "react-redux";
import LatestjobCards from "./LatestjobCards";

function Latestjobs() {
  const { GetAllJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        <span className="text-purple-600">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {GetAllJobs.length <= 0 ? (
          <span className="text-center text-gray-500">No Jobs Available</span>
        ) : (
          GetAllJobs.slice(0, 6).map((job) => <LatestjobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default Latestjobs;