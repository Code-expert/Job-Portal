
function LatestjobCards() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
    <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-gray-500 text-sm">India</p>
    </div>
    <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div className="flex items-center mt-4 gap-2">
        <span className=" bg-blue-50 rounded-3xl text-blue-900 font-bold text-sm m-2">12 Positions</span>
        <span className=" bg-blue-50 rounded-3xl text-red-700 font-bold text-sm m-2">24 LPA</span>
        <span className=" bg-blue-50 rounded-3xl text-purple-800 font-bold text-sm m-2">Part Time</span>
    </div>
    </div>
  )
}

export default LatestjobCards