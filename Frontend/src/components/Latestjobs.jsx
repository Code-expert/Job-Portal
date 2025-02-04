import  LatestjobCards  from "./LatestjobCards";

const randomsJobs = [1,2,3,4,5,6,7,8];
function Latestjobs() {
  return (
    <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold"><span className="text-purple-600">Latest & Top </span> Job Openings</h1>
        <div className="grid grid-cols-3 gap-4 my-5">
            {
                randomsJobs.slice(0,6).map((items,index)=> <LatestjobCards key={index}/>)
            }
        </div>
    </div>
  )
}

export default Latestjobs