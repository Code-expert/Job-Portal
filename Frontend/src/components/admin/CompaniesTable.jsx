import { useEffect, useState } from "react";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const { companies, searchCompaniesByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(()=>{
      const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
          if(!searchCompaniesByText){
              return true
          };
          return company?.name?.toLowerCase().includes(searchCompaniesByText.toLowerCase());

      });
      setFilterCompany(filteredCompany);
  },[companies,searchCompaniesByText])

  // State to track which company's dropdown is open
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const toggleDropdown = (companyId) => {
    setDropdownOpenId((prev) => (prev === companyId ? null : companyId)); // Toggle based on company ID
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse">
        <caption className="text-gray-600 my-2">
          A list of your recent registered companies
        </caption>
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Logo</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filterCompany?.map((company) => (
              <tr key={company._id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <img
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt="Company Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-2">{company.companyName}</td>
                <td className="p-2">{company.createdAt.split("T")[0]}</td>
                <td className="p-2 text-right relative">
                  <button
                    onClick={() => toggleDropdown(company._id)}
                    className="cursor-pointer"
                  >
                    <MoreHorizontal />
                  </button>

                  {/* Show dropdown only for the selected company */}
                  {dropdownOpenId === company._id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border shadow-md rounded-md">
                      <button
                        className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                        onClick={() => alert(`Edit ${company.companyName}`)}
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
