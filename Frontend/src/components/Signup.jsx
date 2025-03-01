import { useEffect, useState } from "react";
import axios from 'axios';
import USER_API_END_POINT from "../constant.js"
import {useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";


function SignUp() {
  const [formData, setFormData] = useState({ Fullname: "", Email: "", PhoneNumber: "", Password: "", Role: "employee",file:"",
     companyName: "", companyWebsite: "", companyLogo: null 
  });
  const {loading,user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (formData.Role === "employee") {
      setFormData({ ...formData, ProfilePhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, companyLogo: e.target.files[0] });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
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
    console.log("FormData:", formData); // Debugging

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`,formDataToSend,{
        headers:{'Content-Type':"multipart/form-data"},
        withCredentials:true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("sign up error",error);
      toast.error(error.response.data.message);
    }
    
  };
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-md py-10">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold">
        Job<span className="text-blue-400">Portal</span>
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Full Name</label>
            <input type="text" name="Fullname" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Email Address</label>
            <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Phone Number</label>
            <input type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Password</label>
            <input type="password" name="Password" value={formData.Password} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
            
          </div>
          {formData.Role === "employee" && (
          <div>
                <label className="block text-gray-600 text-sm">Profile Photo</label>
                <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" accept="image/*" required />
              </div>
          )}
          <div className="mb-4">
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
          {formData.Role === "recruiter" && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-600 text-sm">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Company Website</label>
                <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Company Logo</label>
                <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" accept="image/*" required />
              </div>
            </div>
          )}
 {
              loading? <button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</button>:<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">Sign up</button>
            }       
             </form>
        <p className="text-center text-gray-600 text-sm mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
      </div>
    </div>
  );
}

export default SignUp;
