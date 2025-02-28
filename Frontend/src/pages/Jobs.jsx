import { useSelector } from "react-redux";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";
import { useEffect, useState } from "react";

function Jobs() {
    const { GetAllJobs, searchQuery } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        console.log("GetAllJobs:", GetAllJobs); // Debugging
        console.log("searchQuery:", searchQuery); // Debugging

        if (!Array.isArray(GetAllJobs)) {
            console.warn("GetAllJobs is not an array");
            setFilteredJobs([]);
            return;
        }

        if (!searchQuery || typeof searchQuery !== "object") {
            console.warn("searchQuery is not a valid object");
            setFilteredJobs(GetAllJobs);
            return;
        }

        const { location, industry, salary } = searchQuery;

        const filtered = GetAllJobs.filter((job) => {
            return (
                (!location || job?.location?.toLowerCase().includes(location.toLowerCase())) &&
                (!industry || job?.title?.toLowerCase().includes(industry.toLowerCase())) &&
                (!salary || job?.salary?.toLowerCase().includes(salary.toLowerCase()))
            );
        });

        console.log("Filtered Jobs:", filtered);
        setFilteredJobs(filtered);
    }, [searchQuery, GetAllJobs]);

    return (
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex gap-20">
                <div className="w-20%">
                    <FilterCard />
                </div>
                {filteredJobs.length <= 0 ? (
                    <span>Job not found</span>
                ) : (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
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
