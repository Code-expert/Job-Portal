import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "../store/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Cloud Engineer"],
  },
  {
    filterType: "Salary",
    key: "salary",
    array: ["0-40k", "40k-1L", "1L-5L", "5L-10L", "10L+"],
  },
  {
    filterType: "Sector",
    key: "sector",
    array: ["Formal", "Informal"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    industry: [],
    salary: [],
    sector: [],
  });

  const dispatch = useDispatch();

  const changeHandler = (key, item) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[key].includes(item);
      const newArr = isSelected 
        ? prev[key].filter((val) => val !== item) 
        : [...prev[key], item];
      return { ...prev, [key]: newArr };
    });
  };

  // Debounced filter update to Redux
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setsearchQuery(selectedFilters));
    }, 300); // Prevents excessive dispatch calls

    return () => clearTimeout(timeout);
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
        <button 
          onClick={() => setSelectedFilters({ location: [], industry: [], salary: [], sector: [] })}
          className="text-sm text-indigo-600 font-semibold hover:underline"
        >
          Clear All
        </button>
      </div>
      <hr className="mt-3 border-gray-100" />
      
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="font-semibold text-lg text-gray-700">{data.filterType}</h2>
          {data.array.map((item, idx) => {
            const itemId = `${data.key}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-3 my-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name={data.key}
                  value={item}
                  id={itemId}
                  checked={selectedFilters[data.key].includes(item)}
                  onChange={() => changeHandler(data.key, item)}
                  className="w-4 h-4 cursor-pointer accent-indigo-600 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={itemId} className="cursor-pointer text-gray-700 w-full font-medium text-sm">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
