import { Bookmark } from 'lucide-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Job() {
const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  const JobId = "123345owfn";

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
        <p className='text-gray-400 text-sm'>2 days ago</p>
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
                <h1 className='text-lg font-medium'>Company Name</h1>
                <p className='text-sm text-gray-500 ' >India</p>
            </div>
        </div>
            <div>
                <h1 className='text-lg font-bold my-2'>Title</h1>
                <p className='text-sm text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="flex items-center mt-4 gap-2">
        <span className=" bg-blue-50 rounded-3xl text-blue-900 font-bold text-sm m-2">12 Positions</span>
        <span className=" bg-blue-50 rounded-3xl text-red-700 font-bold text-sm m-2">24 LPA</span>
        <span className=" bg-blue-50 rounded-3xl text-purple-800 font-bold text-sm m-2">Part Time</span>
    </div>
    <div className="flex gap-4 mt-4">
             <button  className="text-black px-4 py-2 rounded font-medium"><Link to={`/jobs/description/:${JobId}`}>Details</Link></button> 
             <button className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-300">Save For Later</button>
            </div>
    </div>
  )
}

export default Job