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

        const { location, industry, salary, sector } = searchQuery;

        const filtered = GetAllJobs.filter((job) => {
            // Check if arrays exist to be backwards compatible with old state briefly
            const locArr = Array.isArray(location) ? location : (location ? [location] : []);
            const indArr = Array.isArray(industry) ? industry : (industry ? [industry] : []);
            const salArr = Array.isArray(salary) ? salary : (salary ? [salary] : []);
            const secArr = Array.isArray(sector) ? sector : (sector ? [sector] : []);

            return (
                (locArr.length === 0 || locArr.some(loc => job?.location?.toLowerCase().includes(loc.toLowerCase()))) &&
                (indArr.length === 0 || indArr.some(ind => job?.title?.toLowerCase().includes(ind.toLowerCase()))) &&
                (salArr.length === 0 || salArr.some(sal => {
                    const jobLPA = parseFloat(job?.salary?.replace(/[^0-9.]/g, '')) || 0;
                    if (sal === "0-40k") return jobLPA >= 0 && jobLPA < 0.4;
                    if (sal === "40k-1L") return jobLPA >= 0.4 && jobLPA <= 1;
                    if (sal === "1L-5L") return jobLPA > 1 && jobLPA <= 5;
                    if (sal === "5L-10L") return jobLPA > 5 && jobLPA <= 10;
                    if (sal === "10L+") return jobLPA > 10;
                    return false;
                })) &&
                (secArr.length === 0 || secArr.some(sec => job?.sector && job?.sector?.toLowerCase() === sec.toLowerCase()))
            );
        });

        setFilteredJobs(filtered);
    }, [searchQuery, GetAllJobs]);

    return (
        <div className="max-w-7xl mx-auto mt-5 px-4">
            <div className="flex flex-col md:flex-row gap-8 relative items-start">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4 md:sticky md:top-24 self-start">
                    <FilterCard />
                </div>

                {/* Job Listings */}
                <div className="flex-1 pb-5">
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
