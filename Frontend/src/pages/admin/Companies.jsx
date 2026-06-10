import CompaniesTable from "../../components/admin/CompaniesTable";
import { Link } from "react-router-dom";
import useGetAllCompanies from "../../hooks/UseGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompaniesByText } from "../../store/companySlice";

function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompaniesByText(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Search & Button Container */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <input
          className="w-full md:w-96 p-3 shadow-sm bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          placeholder="🔍 Search for Companies"
          onChange={(e) => setInput(e.target.value)}
        />

        {/* New Company Button */}
        <Link to="/admin/companies/create">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all font-medium">
            ➕ New Company
          </button>
        </Link>
      </div>

      {/* Companies Table */}
      <div className="mt-6">
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
