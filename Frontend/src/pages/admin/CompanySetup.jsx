import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { COMPANY_API_END_POINT } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useGetCompaniesById from "../../hooks/UseGetCompaniesById";

function CompanySetup() {
  const params = useParams();
  useGetCompaniesById(params.id);
  const { singleCompany } = useSelector(store => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {  
      setInput({
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyName.trim() || !input.description.trim()) {
      toast.error("Company Name & Description are required!");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update company.");
    } finally {
      setLoading(false);
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/admin/companies")}
        className="flex items-center gap-2 text-gray-600 font-semibold mb-6 hover:text-gray-800 transition"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Company Setup</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={input.companyName}
              onChange={changeEventHandler}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Logo</label>
          <input
            type="file"
            name="file"
            onChange={changeFileHandler}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
}

export default CompanySetup;
