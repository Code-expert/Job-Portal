import  { useState } from "react";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Company Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
            </td>
            <td className="p-2">Company Name</td>
            <td className="p-2">18-07-2024</td>
            <td className="p-2 text-right relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer"
              >
                <MoreHorizontal />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border shadow-md rounded-md">
                  <button
                    className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Edit clicked!")}
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
