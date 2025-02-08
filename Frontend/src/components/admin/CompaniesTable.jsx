import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

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
          {filterCompany?.map((company) => (
            <tr key={company._id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="p-2">{company.name}</td>
              <td className="p-2">{company.createdAt.split("T")[0]}</td>
              <td className="p-2 text-right relative">
                <div className="group inline-block">
                  <MoreHorizontal className="cursor-pointer" />
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-24 bg-white border shadow-md rounded-md">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
