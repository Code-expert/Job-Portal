import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Job({ job }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const diff = currentDate - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-lg shadow-lg bg-white border border-gray-200 transition-all"
        >
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">
                    {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
                </p>
                <button className="rounded-full hover:text-gray-500 transition-all">
                    <Bookmark />
                </button>
            </div>
            <div className="flex items-center gap-3 my-3">
                <img
                    className="size-12 rounded-full border cursor-pointer"
                    src={job?.company?.logo || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons"}
                    alt="Profile"
                    onClick={toggleDropdown}
                />
                <div>
                    <h1 className="text-lg font-semibold">{job?.company?.companyName}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <h1 className="text-xl font-bold my-2">{job?.title}</h1>
            <p className="text-sm text-gray-600">{job?.description}</p>

            {/* Job Details */}
            <div className="flex flex-wrap mt-4 gap-2">
                <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm">
                    {job?.Position} Positions
                </span>
                <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full text-sm">
                    {job?.salary} LPA
                </span>
                <span className="bg-purple-100 text-purple-800 font-semibold px-3 py-1 rounded-full text-sm">
                    {job?.jobtype}
                </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                <Link to={`/jobs/description/${job?._id}`}>
                    <button className="text-black px-4 py-2 rounded font-medium border border-gray-300 hover:bg-gray-100 transition">
                        Details
                    </button>
                </Link>
                <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition">
                    Save For Later
                </button>
            </div>
        </motion.div>
    );
}

Job.propTypes = {
    job: PropTypes.shape({
        company: PropTypes.shape({
            companyName: PropTypes.string,
            logo: PropTypes.string,
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        Position: PropTypes.string,
        salary: PropTypes.string,
        jobtype: PropTypes.string,
        createdAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default Job;
