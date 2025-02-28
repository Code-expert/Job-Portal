import { useSelector } from "react-redux";
import Job from "../components/Job";
import useGetAllJobs from "../hooks/UseGetAlljobs";


function Browse() {
    useGetAllJobs();    
    const {GetAllJobs} = useSelector(store => store.job);

  return (
        <div>
            <div className="max-w-7xl mx-auto my-18 ">
                <h1 className="font-bold text-xl my-10">Search Results ({GetAllJobs.length})</h1>
                <div className="grid grid-cols-3 gap-4  ">
                {
                    GetAllJobs.map((job)=>{
                        return (
                            <Job key={job._id} job={job}/>
                        )
                    })
                }
                </div>
            
        </div>
    </div>
  )
}

export default Browse