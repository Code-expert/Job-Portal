import CompaniesTable from "../../components/admin/CompaniesTable"
import { Link } from "react-router-dom"
import useGetAllCompanies from "../../hooks/UseGetAllCompanies"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompaniesByText } from "../../store/companySlice";

function Companies() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompaniesByText(input));
  }, [input]);

  useGetAllCompanies(); 
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <input
        className="w-fit p-3 shadow-2xl bg-gray-200 rounded-2xl"
        placeholder="Search for Companies"
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-gray-800 text-white p-3 rounded-xl"><Link to="/admin/companies/create">New Company</Link></button>
      </div>
      <CompaniesTable />
    </div>
  )
}

export default Companies