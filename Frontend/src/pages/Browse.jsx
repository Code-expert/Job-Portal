import Job from "../components/Job";

const randomJobs = [1,2,3];

function Browse() {
  return (
        <div>
            <div className="max-w-7xl mx-auto my-18 ">
                <h1 className="font-bold text-xl my-10">Search Results ({randomJobs.length})</h1>
                <div className="grid grid-cols-3 gap-4">
                {
                    randomJobs.map((items,index)=>{
                        return (
                            <Job key={index}/>
                        )
                    })
                }
                </div>
            
        </div>
    </div>
  )
}

export default Browse