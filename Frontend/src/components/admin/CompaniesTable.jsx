import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompaniesByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(companies)) return;
    const filteredCompany = companies.filter((company) => {
      if (!searchCompaniesByText) return true;
      return company?.companyName?.toLowerCase().includes(searchCompaniesByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompaniesByText]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (companyId) => {
    setDropdownOpenId(prev => (prev === companyId ? null : companyId));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full ">
        <caption className="text-gray-600 my-2">
          A list of your recent registered companies
        </caption>
        <thead>
          <tr className="bg-white ">
            <th className="p-2 text-left">Logo</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr key={company._id} className="border-0 hover:bg-gray-50">
              <td className="p-2">
                <img
                  src={company.logo || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"}
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="p-2">{company.companyName}</td>
              <td className="p-2">{company.createdAt.split("T")[0]}</td>
              <td className="p-2 text-right relative">
                <button onClick={() => toggleDropdown(company._id)} className="cursor-pointer">
                  <MoreHorizontal />
                </button>

                {dropdownOpenId === company._id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-1/2 translate-y-[-50%] z-50 w-24 bg-white border shadow-md rounded-md"
                  >
                    <button
                      className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
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

export default CompaniesTable;
