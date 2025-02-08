import { useSelector } from "react-redux";
import  LatestjobCards  from "./LatestjobCards";


function Latestjobs() {

  const {GetAllJobs} = useSelector(store => store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold"><span className="text-purple-600">Latest & Top </span> Job Openings</h1>
        <div className="grid grid-cols-3 gap-4 my-5">
            {
               GetAllJobs.length <= 0 ? <span>No Jobs Available</span> : GetAllJobs.slice(0,6).map((job)=> <LatestjobCards key={job._id} job={job}/>)
            }
        </div>
    </div>
  )
}

export default Latestjobs