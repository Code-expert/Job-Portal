import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "../store/jobSlice";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobSearchHandler = () => {
    if (query.trim() !== "") {
      dispatch(setsearchQuery(query));
      navigate("/browse");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      jobSearchHandler();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center justify-center h-[500px] w-full text-center px-6 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-700 to-pink-600"
    >
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl"
      >
        <span className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-semibold text-sm shadow-lg">
          🚀 #1 Job Hunt Platform
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
          Find Your <span className="text-yellow-300">Dream Job</span> <br /> Effortlessly
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Search and apply for jobs that align with your skills and career goals. Start your journey today!
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-full max-w-lg mt-8 bg-white shadow-lg rounded-full overflow-hidden"
      >
        <input
          type="text"
          placeholder="Find your dream job..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 text-gray-800 outline-none"
        />
        <button
          onClick={jobSearchHandler}
          className="bg-yellow-500 px-6 flex items-center justify-center text-gray-900 font-semibold hover:bg-yellow-600 transition duration-300"
        >
          <Search className="h-6 w-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
