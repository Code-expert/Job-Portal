import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompaniesByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(companies)) return;
    const filteredCompany = companies.filter((company) =>
      searchCompaniesByText
        ? company?.companyName?.toLowerCase().includes(searchCompaniesByText.toLowerCase())
        : true
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompaniesByText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpenId && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpenId]);

  const toggleDropdown = (companyId) => {
    setDropdownOpenId((prev) => (prev === companyId ? null : companyId));
  };

  return (
    <div className="p-6 md:p-8 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl overflow-x-auto mt-6">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <caption className="text-gray-500 my-4 text-sm text-left font-medium">
          Recent Registered Companies
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Logo</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Name</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Date</th>
            <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr key={company._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-2">
                <img
                  src={
                    company.logo ||
                    "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"
                  }
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
                />
              </td>
              <td className="py-4 px-2 font-semibold text-gray-800">{company.companyName}</td>
              <td className="py-4 px-2 text-gray-600">{company.createdAt.split("T")[0]}</td>
              <td className="py-4 px-2 text-right relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => toggleDropdown(company._id)}
                  className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
                >
                  <MoreHorizontal />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpenId === company._id && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 z-50 w-40 bg-white border shadow-md rounded-md overflow-hidden"
                    >
                      <button
                        className="flex items-center gap-2 p-3 w-full hover:bg-gray-100 transition"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;
