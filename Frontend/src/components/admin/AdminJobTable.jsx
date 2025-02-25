import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const AdminJobTable = () => {
  const navigate = useNavigate();
  const { searchjobsByText } = useSelector(store => store.job);
  const { GetAdminJobs } = useSelector(store => store.job);
  const [filterjob, setFilterjob] = useState(GetAdminJobs);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRefs = useRef({}); 

  useEffect(() => {
    if (!Array.isArray(GetAdminJobs)) return;
    const filteredjob = GetAdminJobs.filter((job) => {
      if (!searchjobsByText) return true;
      return job?.company?.companyName?.toLowerCase().includes(searchjobsByText.toLowerCase());
    });
    setFilterjob(filteredjob);
  }, [GetAdminJobs, searchjobsByText]);

  // Handle outside click
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
  }, [dropdownOpenId]); // ✅ Ensure effect runs when dropdownOpenId changes

  const toggleDropdown = (jobId) => {
    setDropdownOpenId(prev => (prev === jobId ? null : jobId));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full">
        <caption className="text-gray-600 my-2">
          A list of your recent registered companies
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
              <td className="p-2">{job?.Role}</td>
              <td className="p-2">{job?.createdAt.split("T")[0]}</td>
              <td className="p-2 text-right relative">
                <button onClick={() => toggleDropdown(job._id)} className="cursor-pointer">
                  <MoreHorizontal />
                </button>

                {dropdownOpenId === job._id && (
                  <div
                    ref={(el) => (dropdownRefs.current[job._id] = el)} // ✅ Assign ref dynamically
                    className="absolute right-0 top-1/2 translate-y-[-50%] z-50 w-24 bg-white border shadow-md rounded-md"
                  >
                    <button
                      className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobTable;
