import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import USER_API_END_POINT from "../constant";
import { setUser } from "../store/authSlice";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // New function to handle navigation safely
  const navigateTo = (path) => {
    // Close menu first
    setMenuOpen(false);
    // Navigate to the path
    navigate(path);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Debug current user state
  useEffect(() => {
    console.log("Current user state:", user);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target) // Ensures clicking avatar doesn't close dropdown
      ) {
        console.log("Closing dropdown");
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer text-white">
          <Link to="/">
            Job<span className="text-blue-400">Portal</span>
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl ml-auto" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-2/3 h-full bg-gray-900 text-white flex flex-col items-center justify-center gap-6 z-50 shadow-lg"
            >
              <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </button>
              <ul className="font-medium flex flex-col items-center gap-6">
                {user && user.Role === "recruiter" ? (
                  <>
                    <li className="hover:text-blue-300">
                      <button
                        onClick={() => navigateTo("/admin/companies")}
                        className="text-white hover:text-blue-300"
                      >
                        Companies
                      </button>
                    </li>
                    <li className="hover:text-blue-300">
                      <button
                        onClick={() => navigateTo("/admin/jobs")}
                        className="text-white hover:text-blue-300"
                      >
                        Jobs
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:text-blue-300">
                      <button
                        onClick={() => navigateTo("/")}
                        className="text-white hover:text-blue-300"
                      >
                        Home
                      </button>
                    </li>
                    <li className="hover:text-blue-300">
                      <button
                        onClick={() => navigateTo("/jobs")}
                        className="text-white hover:text-blue-300"
                      >
                        Jobs
                      </button>
                    </li>
                    <li className="hover:text-blue-300">
                      <button
                        onClick={() => navigateTo("/browse")}
                        className="text-white hover:text-blue-300"
                      >
                        Browse
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          </>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <ul className="font-medium flex flex-row items-center gap-6 text-white">
            {user && user.Role === "recruiter" ? (
              <>
                <li className="hover:text-blue-300">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-blue-300">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-blue-300">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-blue-300">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-blue-300">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Profile and Login/Register Section */}
        {!user ? (
          <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="text-white px-4 py-2 rounded font-medium hover:bg-blue-400 hover:text-gray-900 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            <img
              ref={avatarRef}
              className="size-10 rounded-full ring-2 ring-blue-400 cursor-pointer"
              src={
                user?.Profile?.ProfilePhoto ||
                "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"
              }
              alt="Profile"
              onClick={toggleDropdown}
            />
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-50"
              >
                <div className="flex items-center gap-3 p-2">
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
                {user && user.Role === "employee" && (
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <ImProfile className="text-lg" /> View Profile
                  </Link>
                )}
                <button
                  className="w-full flex items-center gap-2 text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded"
                  onClick={logoutHandler}
                >
                  <IoIosLogOut className="text-lg" /> Logout
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;