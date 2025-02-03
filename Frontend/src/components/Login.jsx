import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  USER_API_END_POINT from "../constant.js";
import  {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../store/authSlice.js";

function LoginForm() {

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Role:"employee",
  
  });
  const {loading,user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`,formData,{
        headers:{'Content-Type':"application/json"},
        withCredentials:true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("sign up error",error);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  },[])

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-md py-10">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">
              Job<span className="text-red-500">Portal</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          <form onSubmit={handleSubmit} className="mt-4">
           
            <div className="mb-4">
              <label className="block text-gray-600 text-sm">Email Address</label>
              <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-600 text-sm">Password</label>
              <input type="password" name="Password" value={formData.Password} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
              
            </div>
           
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
               
              </div>
            )}
            {
              loading? <button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</button>:<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">Login</button>
            }
            
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">Don&apos;t have an Account? <a href="/signup" className="text-blue-500">Signup</a></p>
        </div>
      </div>
    );
  }  

export default LoginForm;
