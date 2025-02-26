import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../../constant";
import { toast } from "react-toastify";

const PostJob = () => {
    const  naviagte = useNavigate();
    const { companies } = useSelector(store => store.company);
    const [input, setinput] = useState({
        title: "",
        description: "",
        requirement: "",
        location: "",
        jobtype: "",
        salary: "",
        ExperienceLevel: "",
        companyId: "",
        Position: "0",

    })
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company?.companyName.toLowerCase() === value);
        if (selectedCompany) {
            setinput({ ...input, companyId: selectedCompany._id });
        }
    };

    const sumbitHandler =async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res =await axios.post(`${JOB_API_END_POINT}/create`,input,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                naviagte('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response?.data?.message );
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg flex justify-center items-center w-screen my-5">
            <form action="" onSubmit={sumbitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg '>
                <h1 className="text-2xl font-bold cursor-pointer flex justify-center items-centers mb-2">
                    <Link to="/">Job<span className="text-red-500">Portal</span></Link>

                </h1>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Requirements</label>
                        <input
                            type="text"
                            name="requirement"
                            value={input.requirement}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">location</label>
                        <input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Job Type</label>
                        <input
                            type="text"
                            name="jobtype"
                            value={input.jobtype}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Experence Level</label>
                        <input
                            type="text"
                            name="ExperienceLevel"
                            value={input.ExperienceLevel}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">No. of Position</label>
                        <input
                            type="number"
                            name="Position"
                            value={input.Position}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
                    </div>
                    {companies.length > 0 && (
                        <select onChange={(e) => selectChangeHandler(e.target.value)} className="w-full border p-2 rounded " defaultValue="">
                            <option value="" disabled >Select a Company</option>
                            {companies.map((company) => (
                                <option key={company?._id} value={company?.companyName?.toLowerCase()}>
                                    {company.companyName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {
                    loading ? <button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</button> : <button type="submit" className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-700 mt-4">Post a Job</button>
                }
                {
                    companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                }
            </form>
        </div>
    )
}

export default PostJob
