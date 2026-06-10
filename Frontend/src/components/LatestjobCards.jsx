/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LatestjobCards({ job }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/jobs/description/${job?._id}`)}
      className="p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="font-semibold text-lg">{job?.company?.companyName || "Individual Client"}</h1>
        <p className="text-gray-500 text-sm">India</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <h1 className="font-bold text-xl">{job?.title}</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${job?.sector === 'informal' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
          {job?.sector === 'informal' ? 'Informal Sector' : 'Formal Sector'}
        </span>
      </div>
      <div className="my-2">
        <p className="text-gray-600 text-sm md:text-base line-clamp-3">{job?.description}</p>
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
