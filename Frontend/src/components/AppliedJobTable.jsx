const AppliedJobTable = () => {
    const jobs = [
        { id: 1, date: "2024-02-05", role: "Frontend Developer", company: "Google", status: "pending" },
        { id: 2, date: "2024-01-20", role: "Backend Developer", company: "Microsoft", status: "accepted" },
        { id: 3, date: "2024-01-15", role: "Full Stack Developer", company: "Amazon", status: "rejected" },
    ]; // Replace this with actual data

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-2">A list of your applied jobs</h2>
            {jobs.length === 0 ? (
                <p className="text-gray-600">You haven't applied for any job yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Job Role</th>
                            <th className="border border-gray-300 px-4 py-2">Company</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2">{job.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.role}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.company}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    <span className={`px-2 py-1 rounded-3xl text-white text-sm font-bold 
                                        ${job.status === "rejected" ? 'bg-red-500' 
                                        : job.status === 'pending' ? 'bg-gray-500' 
                                        : 'bg-green-500'}`}>
                                        {job.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppliedJobTable;
