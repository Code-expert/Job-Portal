import { useSelector } from 'react-redux';
import FilterCard from '../components/FilterCard'
import Job from '../components/Job';


function Jobs() {
    const {GetAllJobs} = useSelector(store => store.job)
    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-20'>
                <div className='w-20%'>
                    <FilterCard />
                </div>
                {
                    GetAllJobs.length <= 0 ? <span>Job not found</span> : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    GetAllJobs.map((job)=> (
                                        <div key={job?._id}>
                                            <Job  job={job}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
            </div>
        </div>
    )
}




export default Jobs