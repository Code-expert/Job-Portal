import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Job from "../components/Job";
import useGetAllJobs from "../hooks/UseGetAlljobs";
import { setsearchQuery } from "../store/jobSlice";
import { Search } from "lucide-react";

function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { GetAllJobs, searchQuery } = useSelector((store) => store.job);
  
  // Initialize input with current query if it's a string
  const [query, setQuery] = useState(typeof searchQuery === 'string' ? searchQuery : "");

  // Update input if global searchQuery changes (e.g. from Hero section)
  useEffect(() => {
    if(typeof searchQuery === 'string') setQuery(searchQuery);
  }, [searchQuery]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setsearchQuery(query));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="font-extrabold text-3xl text-gray-900">
          Search Results <span className="text-indigo-600">({GetAllJobs.length})</span>
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={searchHandler} className="flex w-full md:w-auto bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg border border-gray-200 hover:border-indigo-200 rounded-full overflow-hidden p-1 transition-all duration-300">
          <input 
            type="text" 
            placeholder="Search jobs by title..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-80 px-5 py-2 outline-none text-gray-700 bg-transparent font-medium"
          />
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Search size={18} /> Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GetAllJobs.length > 0 ? (
          GetAllJobs.map((job) => <Job key={job._id} job={job} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No jobs found</h2>
            <p className="text-gray-500 text-center max-w-md">We couldn&apos;t find any jobs matching your search criteria. Try adjusting your keywords or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
