import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../constant";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRefs = useRef({});

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

  const toggleDropdown = (applicantId) => {
    setDropdownOpenId((prev) => (prev === applicantId ? null : applicantId));
  };

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
      <table className="w-full border border-gray-200 min-w-[600px]">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Resume</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.map((item) => (
            <tr
              key={item._id}
              className="border-b hover:bg-gray-100 transition-all"
            >
              <td className="p-3">{item?.Applicant?.Fullname}</td>
              <td className="p-3">{item?.Applicant?.Email}</td>
              <td className="p-3">{item?.Applicant?.PhoneNumber}</td>
              <td className="p-3">
                {item?.Applicant?.Profile?.resume ? (
                  <a
                    className="text-blue-600 hover:underline"
                    href={item?.Applicant?.Profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.Applicant?.Profile?.ResumeoriginalName}
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </td>
              <td className="p-3">{item?.Applicant.createdAt.split("T")[0]}</td>
              <td className="p-3 text-right relative">
                <button
                  onClick={() => toggleDropdown(item._id)}
                  className="p-2 rounded-full hover:bg-gray-300 transition"
                >
                  <MoreHorizontal />
                </button>

                <AnimatePresence>
                  {dropdownOpenId === item._id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      ref={(el) => (dropdownRefs.current[item._id] = el)}
                      className="absolute right-0 top-full mt-2 w-40 bg-white border shadow-lg rounded-md overflow-hidden z-10"
                    >
                      {shortlistingStatus.map((status, index) => (
                        <button
                          key={index}
                          onClick={() => statusHandler(status, item._id)}
                          className="block w-full text-left p-3 hover:bg-gray-100 transition"
                        >
                          {status}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-600 text-center mt-4">
        A list of your recently applied users
      </p>
    </div>
  );
};

export default ApplicantsTable;
