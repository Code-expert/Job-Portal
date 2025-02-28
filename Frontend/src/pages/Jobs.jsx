import { useSelector } from 'react-redux';
import FilterCard from '../components/FilterCard';
import Job from '../components/Job';
import { useEffect, useState } from 'react';

function Jobs() {
    const { GetAllJobs, searchQuery } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
            const filtered = (GetAllJobs || []).filter(job => 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.salary.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(GetAllJobs || []); // Ensure it's always an array
        }
    }, [searchQuery, GetAllJobs]);

    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-20'>
                <div className='w-20%'>
                    <FilterCard />
                </div>
                {filteredJobs.length === 0 ? (
                    <span>Job not found</span>
                ) : (
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        <div className='grid grid-cols-3 gap-4'>
                            {filteredJobs.map((job) => (
                                <div key={job?._id}>
                                    <Job job={job} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Jobs;
