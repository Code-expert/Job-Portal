import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../../constant";
import { toast } from "react-toastify";

const PostJob = () => {
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "",
        location: "",
        jobtype: "",
        salary: "",
        ExperienceLevel: "",
        companyId: "",
        Position: "0",
    });
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company?.companyName.toLowerCase() === value
        );
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/create`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg flex justify-center items-center w-screen my-5">
            <form
                onSubmit={submitHandler}
                className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-lg"
            >
                <h1 className="text-2xl font-bold text-center mb-4">
                    <Link to="/">
                        Jobify<span className="text-blue-600">Hub</span>
                    </Link>
                </h1>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Title", name: "title" },
                        { label: "Description", name: "description" },
                        { label: "Requirements", name: "requirement" },
                        { label: "Location", name: "location" },
                        { label: "Job Type", name: "jobtype" },
                        { label: "Salary", name: "salary" },
                        { label: "Experience Level", name: "ExperienceLevel" },
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-medium">{label}</label>
                            <input
                                type="text"
                                name={name}
                                value={input[name]}
                                onChange={changeHandler}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-gray-700 font-medium">No. of Positions</label>
                        <input
                            type="number"
                            name="Position"
                            value={input.Position}
                            onChange={changeHandler}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {companies.length > 0 && (
                        <select
                            onChange={(e) => selectChangeHandler(e.target.value)}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a Company
                            </option>
                            {companies.map((company) => (
                                <option key={company?._id} value={company?.companyName?.toLowerCase()}>
                                    {company.companyName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {loading ? (
                    <button className="w-full my-4 flex justify-center items-center bg-blue-600 text-white py-2 rounded disabled:opacity-50">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 mt-4 disabled:opacity-50"
                        disabled={!input.title || !input.description || !input.companyId}
                    >
                        Post a Job
                    </button>
                )}

                {companies.length === 0 && (
                    <p className="text-xs text-red-600 font-bold text-center my-3">
                        *Please register a company first before posting a job.
                    </p>
                )}
            </form>
        </div>
    );
};

export default PostJob;
