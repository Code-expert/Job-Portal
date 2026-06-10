import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "../store/jobSlice";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [activeSector, setActiveSector] = useState("formal");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { GetAllJobs } = useSelector((store) => store.job);
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions when query changes
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const filtered = GetAllJobs.filter((job) => 
      (job.title.toLowerCase().includes(query.toLowerCase()) || 
       (job.company?.companyName && job.company.companyName.toLowerCase().includes(query.toLowerCase()))) &&
      job.sector === activeSector
    ).slice(0, 5); // limit to 5 suggestions
    
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query, GetAllJobs, activeSector]);

  const jobSearchHandler = () => {
    if (query.trim() !== "") {
      dispatch(setsearchQuery(query));
      navigate("/browse");
    }
  };

  const handleSuggestionClick = (jobId) => {
    navigate(`/jobs/description/${jobId}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      jobSearchHandler();
      setShowSuggestions(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center justify-center min-h-[600px] w-full text-center px-6 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-600"
    >
      {/* Sector Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 flex bg-white/10 backdrop-blur-md p-1 rounded-full mb-8 shadow-lg border border-white/20 mt-10"
      >
        <button
          onClick={() => { setActiveSector("formal"); setQuery(""); }}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeSector === "formal" ? "bg-white text-indigo-900 shadow-md" : "text-white hover:text-indigo-200"}`}
        >
          Corporate & Tech
        </button>
        <button
          onClick={() => { setActiveSector("informal"); setQuery(""); }}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeSector === "informal" ? "bg-white text-indigo-900 shadow-md" : "text-white hover:text-indigo-200"}`}
        >
          Skilled Trades
        </button>
      </motion.div>

      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 leading-tight tracking-tight">
          Find Your Next <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Opportunity</span>
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 mt-6 max-w-2xl mx-auto font-light">
          {activeSector === "formal" 
            ? "Discover top roles in engineering, product, marketing, and finance."
            : "Connect with clients directly for plumbing, electrical, and other trades."}
        </p>
      </motion.div>

      {/* Search Bar Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-30 flex flex-col w-full max-w-2xl mt-10"
        ref={searchRef}
      >
        <div className="flex w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-full overflow-hidden border border-white/50 p-2 relative z-20">
          <input
            type="text"
            placeholder={activeSector === "formal" ? "Search software engineer, marketing..." : "Search plumber, electrician, carpenter..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if(query.trim() !== '') setShowSuggestions(true); }}
            className="w-full px-6 py-3 text-gray-800 outline-none bg-transparent text-lg placeholder-gray-500"
          />
          <button
            onClick={jobSearchHandler}
            className="bg-indigo-600 px-8 flex items-center justify-center text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            <Search className="h-5 w-5 mr-2" /> Search
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left z-10"
            >
              <ul>
                {suggestions.map((job) => (
                  <li 
                    key={job._id}
                    onClick={() => handleSuggestionClick(job._id)}
                    className="px-6 py-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-gray-800">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.company?.companyName || "Individual Client"} • {job.location}</p>
                    </div>
                    <span className="text-indigo-600 bg-indigo-100 px-2 py-1 rounded text-xs font-semibold">
                      {job.jobtype}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
