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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full">
        <caption className="text-gray-600 my-2">
          A list of your recent job postings
        </caption>
        <thead>
          <tr className="bg-white">
            <th className="p-2 text-left">Company Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterjob?.map((job) => (
            <tr key={job._id} className="border-0 hover:bg-gray-50">
              <td className="p-2">{job?.company?.companyName}</td>
              <td className="p-2">{job?.title}</td>
              <td className="p-2">{job?.createdAt.split("T")[0]}</td>
              <td className="p-2 text-right relative">
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
