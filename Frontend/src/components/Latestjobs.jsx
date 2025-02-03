// JobListings.jsx
import { JobCard } from "./LatestjobCards";
export function JobListings() {
    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            position: "Remote",
            description: "Develop and maintain responsive web applications...",
            salary: "$120k - $150k",
            duration: "Full Time",
            type: "Tech"
        },
        // ... more job objects
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Latest Job Openings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
}