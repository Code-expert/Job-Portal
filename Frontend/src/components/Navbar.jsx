import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import USER_API_END_POINT from "../constant";
import { setUser } from "../store/authSlice";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navigateTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        setIsOpen(false);
        setMenuOpen(false);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <li>
        <Link 
          to={to} 
          className={`relative font-semibold px-1 py-2 transition-colors duration-300 group ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
        >
          {children}
          <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
        </Link>
      </li>
    );
  };

  return (
    <div className="fixed top-4 inset-x-0 mx-auto w-[95%] max-w-7xl z-50">
      <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-2xl flex items-center justify-between h-16 px-6 md:px-8 transition-all duration-300">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <svg className="w-8 h-8 drop-shadow-md transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="8" width="18" height="12" rx="3" fill="url(#grad1)" />
              <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="14" r="2" fill="white" />
              <path d="M3 10L21 10" stroke="white" strokeWidth="1" opacity="0.3" />
              <defs>
                <linearGradient id="grad1" x1="3" y1="8" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#C084FC" />
                </linearGradient>
                <linearGradient id="grad2" x1="8" y1="4" x2="16" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#9333EA" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">
              Jobify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hub</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 text-2xl ml-auto mr-2 focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-10">
          <ul className="flex flex-row items-center gap-8">
            {user?.Role === "recruiter" ? (
              <>
                <NavLink to="/admin/companies">Companies</NavLink>
                <NavLink to="/admin/jobs">Jobs</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/browse">Browse</NavLink>
              </>
            )}
          </ul>
        </div>

        {/* User Actions */}
        <div className="hidden md:block">
          {!user ? (
            <div className="flex gap-3 items-center">
              <Link to="/login" className="text-gray-700 font-bold px-5 py-2 rounded-xl hover:bg-gray-100 transition-all">Login</Link>
              <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-2 rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">Register</Link>
            </div>
          ) : (
            <div className="flex items-center gap-5 relative">
              {/* Messages Icon */}
              <div className="relative group flex items-center justify-center">
                <Link to="/messages" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiMessageSquare className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors" />
                </Link>
                <span className="absolute top-12 px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-50">Messages</span>
              </div>

              {/* Profile Avatar */}
              <div className="relative group">
                <img
                  ref={avatarRef}
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-100 hover:ring-indigo-400 cursor-pointer object-cover transition-all"
                  src={user?.Profile?.ProfilePhoto || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"}
                  alt="Profile"
                  onClick={toggleDropdown}
                />
                {!isOpen && (
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-50">
                    {user?.Fullname}
                  </span>
                )}
                <AnimatePresence>
                {isOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-2xl p-2 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-2 border-b border-gray-50 mb-2">
                       <p className="text-sm font-bold text-gray-800 truncate">{user?.Fullname}</p>
                       <p className="text-xs text-gray-500 truncate">{user?.Email}</p>
                    </div>
                    {user?.Role !== "recruiter" && (
                      <Link
                        to="/profile"
                        className="w-full flex items-center gap-3 text-left px-3 py-2.5 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <ImProfile className="text-lg" /> View Profile
                      </Link>
                    )}
                    <button
                      className="w-full flex items-center gap-3 text-left px-3 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors mt-1"
                      onClick={logoutHandler}
                    >
                      <IoIosLogOut className="text-xl" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 h-screen w-screen -top-4 -left-[2.5vw]"
              onClick={() => setMenuOpen(false)}
            ></motion.div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[80%] max-w-sm h-screen bg-white shadow-2xl z-50 flex flex-col -top-4 -mr-[2.5vw] p-6"
            >
              <div className="flex justify-between items-center mb-10 mt-4">
                 <div className="flex items-center gap-2">
                   <svg className="w-8 h-8 drop-shadow-md" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect x="3" y="8" width="18" height="12" rx="3" fill="url(#grad3)" />
                     <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="url(#grad4)" strokeWidth="2" strokeLinecap="round" />
                     <circle cx="12" cy="14" r="2" fill="white" />
                     <path d="M3 10L21 10" stroke="white" strokeWidth="1" opacity="0.3" />
                     <defs>
                       <linearGradient id="grad3" x1="3" y1="8" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#4F46E5" />
                         <stop offset="1" stopColor="#C084FC" />
                       </linearGradient>
                       <linearGradient id="grad4" x1="8" y1="4" x2="16" y2="8" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#4F46E5" />
                         <stop offset="1" stopColor="#9333EA" />
                       </linearGradient>
                     </defs>
                   </svg>
                   <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                     Jobify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hub</span>
                   </h1>
                 </div>
                 <button className="text-gray-500 hover:text-gray-800 text-2xl transition" onClick={() => setMenuOpen(false)}>
                   <FaTimes />
                 </button>
              </div>
              
              <ul className="font-bold text-lg flex flex-col gap-6 text-gray-700">
                {user?.Role === "recruiter" ? (
                  <>
                    <li><button onClick={() => navigateTo("/admin/companies")} className="hover:text-indigo-600 w-full text-left">Companies</button></li>
                    <li><button onClick={() => navigateTo("/admin/jobs")} className="hover:text-indigo-600 w-full text-left">Jobs</button></li>
                    <li><button onClick={() => navigateTo("/messages")} className="hover:text-indigo-600 w-full text-left">Messages</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => navigateTo("/")} className="hover:text-indigo-600 w-full text-left">Home</button></li>
                    <li><button onClick={() => navigateTo("/jobs")} className="hover:text-indigo-600 w-full text-left">Jobs</button></li>
                    <li><button onClick={() => navigateTo("/browse")} className="hover:text-indigo-600 w-full text-left">Browse</button></li>
                    {user && <li><button onClick={() => navigateTo("/messages")} className="hover:text-indigo-600 w-full text-left">Messages</button></li>}
                  </>
                )}
              </ul>

              <div className="mt-auto mb-8 border-t border-gray-100 pt-8 flex flex-col gap-4">
                 {!user ? (
                   <>
                     <button onClick={() => navigateTo("/login")} className="w-full text-center text-gray-700 font-bold px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50">Login</button>
                     <button onClick={() => navigateTo("/signup")} className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-5 py-3 rounded-xl shadow-md">Register</button>
                   </>
                 ) : (
                   <>
                     {user?.Role !== "recruiter" && (
                       <button onClick={() => navigateTo("/profile")} className="w-full flex items-center justify-center gap-2 text-indigo-700 bg-indigo-50 font-bold px-5 py-3 rounded-xl">
                         <ImProfile /> Profile
                       </button>
                     )}
                     <button onClick={logoutHandler} className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 font-bold px-5 py-3 rounded-xl">
                       <IoIosLogOut size={20} /> Logout
                     </button>
                   </>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
