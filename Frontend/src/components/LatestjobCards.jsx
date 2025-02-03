// JobCard.jsx
import { Briefcase, Clock, DollarSign } from "lucide-react";

export function JobCard() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Title</h3>
                    <p className="text-gray-600 mt-1 flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        Position
                    </p>
                </div>
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    Type
                </span>
            </div>

            <p className="text-gray-600 mb-5 line-clamp-3">
               description
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>24 LPA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Time</span>
                </div>
            </div>

            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
            </button>
        </div>
    );
}