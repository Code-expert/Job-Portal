/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LatestjobCards({ job }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/jobs/description/${job?._id}`)}
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer transition hover:shadow-2xl hover:scale-105"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="font-semibold text-lg">{job?.company?.companyName}</h1>
        <p className="text-gray-500 text-sm">India</p>
      </div>
      <div>
        <h1 className="font-bold text-xl my-2">{job?.title}</h1>
        <p className="text-gray-600 text-sm md:text-base">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center mt-4 gap-2">
        <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-900 font-semibold text-xs md:text-sm">{job?.Position} Positions</span>
        <span className="bg-red-100 px-3 py-1 rounded-full text-red-700 font-semibold text-xs md:text-sm">{job?.salary} LPA</span>
        <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-800 font-semibold text-xs md:text-sm">{job?.jobtype}</span>
      </div>
    </motion.div>
  );
}

export default LatestjobCards;
