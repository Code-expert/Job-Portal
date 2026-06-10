import { useEffect, useState } from "react";
import axios from "axios";
import USER_API_END_POINT from "../constant.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

function SignUp() {
  const [formData, setFormData] = useState({
    Fullname: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    Role: "employee",
    ProfilePhoto: null,
    companyName: "",
    companyWebsite: "",
    companyLogo: null,
  });
  
  const [passwordError, setPasswordError] = useState("");
  
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    
    if (e.target.name === "Password") {
      setPasswordError("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (formData.Role === "employee") {
      setFormData({ ...formData, ProfilePhoto: file });
    } else {
      setFormData({ ...formData, companyLogo: file });
    }
  };
  
  const validatePassword = (password) => {
    
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
   
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter";
    }
    
   
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return "Password must contain at least one special character";
    }
    
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password before submission
    const passwordValidationError = validatePassword(formData.Password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      toast.error(passwordValidationError);
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append("Fullname", formData.Fullname);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("PhoneNumber", formData.PhoneNumber);
    formDataToSend.append("Password", formData.Password);
    formDataToSend.append("Role", formData.Role);

    if (formData.Role === "employee") {
      formDataToSend.append("file", formData.ProfilePhoto);
    } else {
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("companyWebsite", formData.companyWebsite);
      formDataToSend.append("file", formData.companyLogo);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Sign up error", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-600 py-10 mt-16">
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            <a href="/">Jobify<span className="text-indigo-600">Hub</span></a>
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">Full Name</label>
            <input type="text" name="Fullname" value={formData.Fullname} onChange={handleChange} className="w-full p-3 bg-white/60 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Email Address</label>
            <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="w-full p-3 bg-white/60 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Phone Number</label>
            <input type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} className="w-full p-3 bg-white/60 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Password</label>
            <input 
              type="password" 
              name="Password" 
              value={formData.Password} 
              onChange={handleChange} 
              className={`w-full p-3 bg-white/60 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all ${passwordError ? 'border-red-500' : 'border-gray-200'}`} 
              required 
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long, contain at least one capital letter and one special character.
            </p>
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Role</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="Role" value="employee" checked={formData.Role === "employee"} onChange={handleChange} />
                Employee
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="Role" value="recruiter" checked={formData.Role === "recruiter"} onChange={handleChange} />
                Recruiter
              </label>
            </div>
          </div>

          {formData.Role === "employee" && (
            <div>
              <label className="block text-gray-600 text-sm">Profile Photo</label>
              <input type="file" name="file" onChange={handleFileChange} className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400" accept="image/*" required />
            </div>
          )}

          {formData.Role === "recruiter" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Company Website</label>
                <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Company Logo</label>
                <input type="file" name="file" onChange={handleFileChange} className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400" accept="image/*" required />
              </div>
            </div>
          )}

          {loading ? (
            <button className="w-full bg-blue-500 text-white py-3 rounded flex justify-center items-center gap-2" disabled>
              <Loader2 className="h-5 w-5 animate-spin" />
              Please wait...
            </button>
          ) : (
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-500/30 font-semibold">
              Sign up
            </button>
          )}
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;