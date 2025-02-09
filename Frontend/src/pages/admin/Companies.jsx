import CompaniesTable from "../../components/admin/CompaniesTable"
import { Link } from "react-router-dom"

function Companies() {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <input
        className="w-fit p-3 shadow-2xl bg-gray-200 rounded-2xl"
        placeholder="Search for Companies"
        />
        <button className="bg-gray-800 text-white p-3 rounded-xl"><Link to="/admin/companies/create">New Company</Link></button>
      </div>
      <CompaniesTable />
    </div>
  )
}

export default Companies