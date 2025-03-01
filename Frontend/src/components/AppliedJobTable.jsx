import { useSelector } from "react-redux";

const AppliedJobTable = () => {
    // Extract applied jobs from Redux state safely
    const allAppliedJobs = useSelector(store => store.job.allAppliedJobs || []);

    return (
        <div className="p-5 overflow-x-auto">
            <table className="w-full border border-gray-300 min-w-[600px]">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Job Role</th>
                        <th className="border border-gray-300 px-4 py-2">Company</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.length > 0 ? (
                        allAppliedJobs.map((appliedJob) => (
                            <tr key={appliedJob._id} className="border border-gray-300 text-sm md:text-base">
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {appliedJob.createdAt?.split("T")[0] || "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{appliedJob.job?.title || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">{appliedJob.job?.company?.companyName || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-xs md:text-sm font-semibold 
                                        ${appliedJob.status === "Rejected" ? "bg-red-500"
                                            : appliedJob.status === "pending" ? "bg-gray-500"
                                                : "bg-green-500"}`}
                                    >
                                        {appliedJob.status ? appliedJob.status.toUpperCase() : "PENDING"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-gray-600 text-center py-6 text-sm md:text-base">
                                {allAppliedJobs.length === 0 ? "You haven't applied for any jobs yet." : "Loading..."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobTable;
