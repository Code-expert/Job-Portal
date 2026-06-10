import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import AdminJobTable from "../../components/admin/AdminJobTable";
import { setSearchJobsByText } from "../../store/jobSlice";
import UseGetAllAdminJobs from "../../hooks/UseGetAllAdminJobs";
import { debounce } from "lodash";

function AdminJob() {
  UseGetAllAdminJobs();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  // Debounced search function to avoid excessive state updates
  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchJobsByText(query));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex justify-between items-center gap-4">
        {/* Search Bar */}
        <input
          className="flex-grow p-3 shadow-sm bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          placeholder="Search by job title or role..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* New Job Button */}
        <Link
          to="/admin/job/create"
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all font-medium"
        >
          New Job
        </Link>
      </div>

      {/* Job Table */}
      <AdminJobTable />
    </div>
  );
}

export default AdminJob;
