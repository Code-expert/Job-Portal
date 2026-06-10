import { useSelector } from "react-redux";
import LatestjobCards from "./LatestjobCards";

function Latestjobs() {
  const { GetAllJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-24 px-4 md:px-8 lg:px-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Latest & Top </span> Job Openings
      </h1>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-lg">Explore the most recently posted opportunities tailored to your skills and interests.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GetAllJobs.length <= 0 ? (
          <div className="col-span-full flex justify-center py-10">
            <span className="text-center text-gray-500 bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">No Jobs Available at the moment.</span>
          </div>
        ) : (
          GetAllJobs.slice(0, 6).map((job) => <LatestjobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default Latestjobs;