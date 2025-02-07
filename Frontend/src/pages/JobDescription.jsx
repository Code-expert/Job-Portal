
function JobDescription() {
    const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto  my-10">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold text-xl">Frontend Developer</h1>
                <div className="flex items-center gap-2 mt-4">
                <span className=" bg-blue-50 rounded-3xl text-blue-900 font-bold text-sm m-2">12 Positions</span>
                <span className=" bg-blue-50 rounded-3xl text-red-700 font-bold text-sm m-2">24 LPA</span>
                <span className=" bg-blue-50 rounded-3xl text-purple-800 font-bold text-sm m-2">Part Time</span>
                </div>
            </div>
            <button disabled={isApplied} className={`rounded-lg p-2 text-white ${isApplied? 'bg-gray-600 cursor-not-allowed':'bg-purple-700 hover:bg-purple-8   00'}`}>{isApplied?'Already Applied ':'Apply Now'}</button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Pune</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptas tempora dicta aut, quas fugit!</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>24 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>12-02-2025</span></h1>
            </div>
    </div>
  )
}

export default JobDescription