import  { useState } from 'react';

const filterData = [
    {
        filterType: "Location",
        key: "location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        key: "industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        key: "salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        location: "",
        industry: "",
        salary: ""
    });

    const changeHandler = (event, key) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: event.target.value
        }));
    };

    return (
        <div className='w-full bg-white p-3 rounded-md shadow-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index} className="mt-3">
                    <h2 className='font-bold'>{data.filterType}</h2>
                    {data.array.map((item, idx) => {
                        const itemId = `${data.key}-${idx}`;
                        return (
                            <div key={itemId} className='flex items-center space-x-2 my-2'>
                                <input
                                    type="radio"
                                    name={data.key}  // Unique name per category
                                    value={item}
                                    id={itemId}
                                    checked={selectedFilters[data.key] === item}
                                    onChange={(e) => changeHandler(e, data.key)}
                                    className="cursor-pointer bg-black"
                                />
                                <label htmlFor={itemId} className="cursor-pointer">{item}</label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
