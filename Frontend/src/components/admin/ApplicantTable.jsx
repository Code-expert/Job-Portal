import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../constant";
import { toast } from "react-toastify";


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const {applicants} = useSelector(store => store.application)
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
    console.log('called');
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Full Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Contact</th>
            <th className="p-2 border border-gray-300">Resume</th>
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants && applicants?.applications?.map((item) => (
            <tr key={item._id} className="border border-gray-200 hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{item?.Applicant?.Fullname}</td>
              <td className="p-2 border border-gray-300">{item?.Applicant?.Email}</td>
              <td className="p-2 border border-gray-300">{item?.Applicant?.PhoneNumber}</td>
              <td className="p-2 border border-gray-300">
                {item?.Applicant?.Profile?.resume ? (
                  <a
                    className="text-blue-600 underline"
                    href={item?.Applicant?.Profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.Applicant?.Profile?.ResumeoriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </td>
              <td className="p-2 border border-gray-300">{item?.Applicant.createdAt.split("T")[0]}</td>
              <td className="p-2 border border-gray-300 text-right relative">
                <button
                  onClick={() => toggleDropdown(item._id)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <MoreHorizontal />
                </button>

                {dropdownOpenId === item._id && (
                  <div
                    ref={(el) => (dropdownRefs.current[item._id] = el)}
                    className="absolute right-0 top-full mt-2 w-40 bg-white border shadow-md rounded-md overflow-hidden"
                  >
                    {shortlistingStatus.map((status, index) => (
                      <button
                        key={index}
                        onClick={() => statusHandler(status, item._id)}
                        className="block w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <caption className="text-gray-600 my-2 ">
          A list of your recently applied users
        </caption>
      </table>
    </div>
  );
};

export default ApplicantsTable;
