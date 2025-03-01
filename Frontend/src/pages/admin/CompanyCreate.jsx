import axios from "axios";
import { Link } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../constant";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsingleCompany } from "../../store/companySlice";

function CompanyCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setsingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create company. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <div className="mb-6">
                <h1 className="font-bold text-2xl">Your Company Name</h1>
                <p className="text-gray-500">
                    What would you like to name your company? You can change this later.
                </p>
            </div>

            {/* Input Field */}
            <label className="block font-medium text-gray-700 mb-1">Company Name</label>
            <input
                type="text"
                className="p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                placeholder="e.g., Job Hunt, Microsoft..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-6">
                <Link to="/admin/companies" className="text-gray-500 hover:text-gray-700 transition">
                    Cancel
                </Link>
                <button
                    onClick={registerNewCompany}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                        companyName.trim()
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!companyName.trim() || loading}
                >
                    {loading ? "Creating..." : "Continue"}
                </button>
            </div>
        </div>
    );
}

export default CompanyCreate;
