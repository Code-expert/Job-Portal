import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";

function Jobs() {
    const { GetAllJobs, searchQuery } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        if (!Array.isArray(GetAllJobs)) {
            console.warn("GetAllJobs is not an array");
            setFilteredJobs([]);
            return;
        }

        if (!searchQuery || typeof searchQuery !== "object") {
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

        setFilteredJobs(filtered);
    }, [searchQuery, GetAllJobs]);

    return (
        <div className="max-w-7xl mx-auto mt-5 px-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4">
                    <FilterCard />
                </div>

                {/* Job Listings */}
                <div className="flex-1 h-[85vh] overflow-y-auto pb-5">
                    {filteredJobs.length <= 0 ? (
                        <span className="text-center text-gray-600 block">No jobs found</span>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job?._id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
