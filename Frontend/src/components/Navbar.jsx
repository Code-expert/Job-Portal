import axios from "axios";
import { useState } from "react";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import USER_API_END_POINT from "../constant";
import { setUser } from "../store/authSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useSelector(store => store.auth); 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const logoutHandler = async ()=>{
  try {
    const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
    if (res.data.success) {
      dispatch(setUser(null))
      navigate("/");
      toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.reponse.data.message)
  }
 }

  return (
    <div className="">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold cursor-pointer"> 
            <Link to="/">Job<span className="text-red-500">Portal</span></Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {/* If user is NOT logged in, show Login & Register buttons */}
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login" className="text-black px-4 py-2 rounded font-medium">Login</Link>
              <Link to="/signup" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-300">Register</Link>
            </div>
          ) : (
            // If user is logged in, show profile section
            <div className="relative">
              {/* Profile Image */}
              <img
                className="size-10 rounded-full ring-2 ring-white cursor-pointer"
                src={user?.Profile?.ProfilePhoto} 
                alt="Profile"
                onClick={toggleDropdown} // Toggle dropdown on click
              />

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-3 z-50">
                  {/* Profile Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.Profile?.ProfilePhoto} 
                      alt="User"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">{user?.Fullname}</p>
                      <p className="text-sm text-gray-500">{user?.Email}</p>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* Profile & Logout Buttons */}
                  <Link to="/profile" className="w-full flex items-center gap-2 text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    <ImProfile className="text-lg" /> View Profile
                  </Link>

                  <button className="w-full flex items-center gap-2 text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded" onClick={logoutHandler}>
                    <IoIosLogOut className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
