import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import USER_API_END_POINT from "../constant.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "../store/authSlice.js";

function LoginForm() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Role: "employee",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Login error", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Jobify<span className="text-blue-400">Hub</span>
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Email Address</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Role</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="Role"
                  value="employee"
                  checked={formData.Role === "employee"}
                  onChange={handleChange}
                />
                Employee
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="Role"
                  value="recruiter"
                  checked={formData.Role === "recruiter"}
                  onChange={handleChange}
                />
                Recruiter
              </label>
            </div>
          </div>

         

          {loading ? (
            <button
              className="w-full bg-blue-500 text-white py-3 rounded mt-4 flex justify-center items-center gap-2"
              disabled
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 mt-4"
            >
              Login
            </button>
          )}
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don&apos;t have an Account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
