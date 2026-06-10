import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const AdminJobTable = () => {
  const navigate = useNavigate();
  const { searchjobsByText, GetAdminJobs } = useSelector(store => store.job);
  const [filterjob, setFilterjob] = useState(GetAdminJobs);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (!Array.isArray(GetAdminJobs)) return;
    const filteredjob = GetAdminJobs.filter((job) =>
      searchjobsByText
        ? job?.company?.companyName?.toLowerCase().includes(searchjobsByText.toLowerCase())
        : true
    );
    setFilterjob(filteredjob);
  }, [GetAdminJobs, searchjobsByText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpenId &&
        dropdownRefs.current[dropdownOpenId] &&
        !dropdownRefs.current[dropdownOpenId].contains(event.target)
      ) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpenId]);

  const toggleDropdown = (jobId) => {
    setDropdownOpenId(prev => (prev === jobId ? null : jobId));
  };

  return (
    <div className="p-6 md:p-8 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl overflow-x-auto mt-6">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <caption className="text-gray-500 my-4 text-sm text-left">
          A list of your recent job postings
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Company Name</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Role</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Sector</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Date</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterjob?.map((job) => (
            <tr key={job._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-2 font-medium text-gray-800">{job?.company?.companyName || "N/A"}</td>
              <td className="py-4 px-2 text-gray-600">{job?.title}</td>
              <td className="py-4 px-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job?.sector === 'informal' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  {job?.sector === 'informal' ? 'Informal' : 'Formal'}
                </span>
              </td>
              <td className="py-4 px-2 text-gray-600">{job?.createdAt.split("T")[0]}</td>
              <td className="py-4 px-2 text-right relative">
                <button
                  onClick={() => toggleDropdown(job._id)}
                  className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
                >
                  <MoreHorizontal />
                </button>

                <AnimatePresence>
                  {dropdownOpenId === job._id && (
                    <motion.div
                      ref={(el) => (dropdownRefs.current[job._id] = el)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 z-50 w-40 bg-white border shadow-md rounded-md overflow-hidden"
                    >
                      <button
                        className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/admin/job/create`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate(`/admin/job/${job._id}/applicants`)}
                      >
                       
                        <Users className="w-4" /><span>View Applicants</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobTable;
