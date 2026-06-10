import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import USER_API_END_POINT from '../constant';
import { setUser } from '../store/authSlice';
import { toast } from 'react-toastify';

function Job({ job }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const isSaved = user?.Profile?.savedJobs?.includes(job?._id);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const diff = currentDate - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const handleSaveJob = async () => {
        if(!user) {
            toast.error("Please login to save jobs");
            return;
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/job/save/${job._id}`, {}, {
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
                // Update redux state
                dispatch(setUser({
                    ...user,
                    Profile: {
                        ...user.Profile,
                        savedJobs: res.data.savedJobs
                    }
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to save job");
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/80 backdrop-blur-xl border border-white/60 transition-all duration-500 relative overflow-hidden group"
        >
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-between">
                <p className="text-gray-400 text-sm font-medium">
                    {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
                </p>
                <button 
                  onClick={handleSaveJob} 
                  className={`rounded-full p-2 transition-all duration-300 ${isSaved ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50'}`}
                >
                    {isSaved ? <BookmarkCheck className="fill-indigo-100" size={20} /> : <Bookmark size={20} />}
                </button>
            </div>
            <div className="relative z-10 flex items-center gap-4 my-4">
                <img
                    className="w-14 h-14 rounded-2xl shadow-sm border border-gray-100 cursor-pointer object-cover"
                    src={job?.company?.logo || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons"}
                    alt="Profile"
                    onClick={toggleDropdown}
                />
                <div>
                    <h1 className="text-lg font-bold text-gray-800">{job?.company?.companyName || "Individual Client"}</h1>
                    <p className="text-sm text-gray-500 font-medium">{job?.location || "India"}</p>
                </div>
            </div>
            <div className="relative z-10 flex items-start flex-col gap-2 my-2">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">{job?.title}</h1>
                <span className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase ${job?.sector === 'informal' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                    {job?.sector === 'informal' ? 'Informal Sector' : 'Formal Sector'}
                </span>
            </div>
            <p className="relative z-10 text-sm text-gray-600 line-clamp-2 mt-3 leading-relaxed">{job?.description}</p>

            {/* Job Details */}
            <div className="relative z-10 flex flex-wrap mt-5 gap-2">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold px-3 py-1.5 rounded-xl text-sm transition hover:bg-indigo-100">
                    {job?.Position} Positions
                </span>
                <span className="bg-rose-50 text-rose-700 border border-rose-100 font-semibold px-3 py-1.5 rounded-xl text-sm transition hover:bg-rose-100">
                    {job?.salary} {job?.sector === 'informal' ? 'LPA Eq' : 'LPA'}
                </span>
                <span className="bg-purple-50 text-purple-700 border border-purple-100 font-semibold px-3 py-1.5 rounded-xl text-sm transition hover:bg-purple-100">
                    {job?.jobtype}
                </span>
            </div>

            {/* Buttons */}
            <div className="relative z-10 flex gap-4 mt-6">
                <Link to={`/jobs/description/${job?._id}`} className="flex-1">
                    <button className="w-full text-indigo-700 bg-white px-4 py-2.5 rounded-xl font-bold border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300">
                        Details
                    </button>
                </Link>
                <button 
                  onClick={handleSaveJob}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 text-white shadow-md hover:shadow-lg ${isSaved ? 'bg-gray-400 hover:bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'}`}
                >
                    {isSaved ? 'Saved' : 'Save'}
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
        sector: PropTypes.string,
        createdAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default Job;
