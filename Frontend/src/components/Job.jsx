import { Bookmark } from 'lucide-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Job({job}) {
const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const diff = currentDate - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));  
    return days;
  };


  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
        <p className='text-gray-400 text-sm'>{daysAgo(job?.createdAt)== 0 ? "Today":`${daysAgo(job?.createdAt)} days ago`}</p>
        <button className='rounded-full' size="icon"><Bookmark/></button>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <button className='p-6 ' size="icon">
            <img
                className="size-10 rounded-full  cursor-pointer left-0"
                src="https://th.bing.com/th?id=OIP.rv6rEXU2wV2cz2Ls4s9UkAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="Profile"
                onClick={toggleDropdown} // Toggle dropdown on click
              />
            </button>
            <div>
                <h1 className='text-lg font-medium'>{job?.company?.companyName}</h1>
                <p className='text-sm text-gray-500 ' >India</p>
            </div>
        </div>
            <div>
                <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 '>{job?.description}</p>
            </div>
            <div className="flex items-center mt-4 gap-2">
        <span className=" bg-blue-50 rounded-3xl text-blue-900 font-bold text-sm m-2">{job?.Position} Positions</span>
        <span className=" bg-blue-50 rounded-3xl text-red-700 font-bold text-sm m-2">{job?.salary} LPA</span>
        <span className=" bg-blue-50 rounded-3xl text-purple-800 font-bold text-sm m-2">{job?.jobtype}</span>
    </div>
    <div className="flex gap-4 mt-4">
             <button  className="text-black px-4 py-2 rounded font-medium"><Link to={`/jobs/description/${job?._id}`}>Details</Link></button> 
             <button className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-300">Save For Later</button>
            </div>
    </div>
  )
}
Job.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.shape({
      companyName: PropTypes.string,
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

export default Job
