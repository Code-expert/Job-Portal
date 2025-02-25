import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobTable from "../../components/admin/AdminJobTable";
import { setSearchJobsByText } from "../../store/jobSlice";
import UseGetAllAdminJobs from "../../hooks/UseGetAllAdminJobs";

function AdminJob() {
  UseGetAllAdminJobs();
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobsByText(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <input
        className="w-fit p-2 shadow-2xl bg-gray-200 rounded-2xl"
        placeholder="Search for Companies"
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-gray-800 text-white p-2 rounded-xl"><Link to="/admin/companies/create">New Job</Link></button>
      </div>
      <AdminJobTable />
    </div>
  )
}

export default AdminJob