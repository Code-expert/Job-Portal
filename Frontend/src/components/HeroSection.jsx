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
      className="text-center"
    >
      <div className="flex flex-col gap-5 my-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg"
        >
          🚀 No. 1 Job Hunt Website
        </motion.span>

        <h1 className="text-5xl font-bold leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-purple-700">Dream Jobs</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the perfect job that matches your skills and aspirations. Your
          dream career is just a search away!
        </p>

        {/* Search Bar */}
        <div className="relative flex w-full max-w-lg mx-auto shadow-md border border-gray-300 rounded-full items-center gap-4 bg-white">
          <input
            type="text"
            placeholder="Find your dream job..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none border-none w-full px-4 py-3 text-gray-700 rounded-full"
          />
          <button
            onClick={jobSearchHandler}
            className="rounded-full bg-purple-700 p-4 cursor-pointer hover:bg-purple-800 transition duration-300"
          >
            <Search className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
