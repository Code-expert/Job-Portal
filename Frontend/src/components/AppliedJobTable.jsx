import { useSelector } from "react-redux";

const AppliedJobTable = () => {
    // Extract applied jobs from Redux state safely
    const allAppliedJobs = useSelector(store => store.job.allAppliedJobs || []);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="border-b-2 border-gray-100">
                        <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Date</th>
                        <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Job Role</th>
                        <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm">Company</th>
                        <th className="py-4 px-2 font-semibold text-gray-500 uppercase tracking-wider text-sm text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.length > 0 ? (
                        allAppliedJobs.map((appliedJob) => (
                            <tr key={appliedJob._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-2 text-gray-600 font-medium">
                                    {appliedJob.createdAt?.split("T")[0] || "N/A"}
                                </td>
                                <td className="py-4 px-2">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-gray-800 font-semibold">{appliedJob.job?.title || "N/A"}</span>
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide ${appliedJob.job?.sector === 'informal' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                                            {appliedJob.job?.sector || 'Formal'}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 text-gray-600">{appliedJob.job?.company?.companyName || "Individual Client"}</td>
                                <td className="py-4 px-2 text-right">
                                    <span
                                        className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide
                                        ${appliedJob.status === "Rejected" ? "bg-red-100 text-red-700 border border-red-200"
                                            : appliedJob.status === "pending" ? "bg-amber-100 text-amber-700 border border-amber-200"
                                                : "bg-green-100 text-green-700 border border-green-200"}`}
                                    >
                                        {appliedJob.status ? appliedJob.status.toUpperCase() : "PENDING"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-gray-500 text-center py-10 font-medium">
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
