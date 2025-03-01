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
    array: ["0-40k", "40k-1L", "1L-5L", "5L-10L"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (event, key) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  // Debounced filter update to Redux
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setsearchQuery(selectedFilters));
    }, 300); // Prevents excessive dispatch calls

    return () => clearTimeout(timeout);
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <hr className="mt-3 border-gray-300" />
      
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="font-semibold text-lg text-gray-700">{data.filterType}</h2>
          {data.array.map((item, idx) => {
            const itemId = `${data.key}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-3 my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition">
                <input
                  type="radio"
                  name={data.key} // Unique name per category
                  value={item}
                  id={itemId}
                  checked={selectedFilters[data.key] === item}
                  onChange={(e) => changeHandler(e, data.key)}
                  className="cursor-pointer accent-blue-600"
                />
                <label htmlFor={itemId} className="cursor-pointer text-gray-800">
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
