import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/Carousel";
import Latestjobs from "../components/Latestjobs";
import useGetAllJobs from "../hooks/UseGetAlljobs";
import { motion } from "framer-motion";

function Home() {
  useGetAllJobs();

  return (
    <main className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <HeroSection />
      </motion.div>

      <motion.section
        className="py-12 bg-gray-50 rounded-lg  max-w-7xl mx-auto px-4 md:px-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CategoryCarousel />
      </motion.section>

      <motion.section
        className="py-12 max-w-7xl mx-auto px-4 md:px-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Latestjobs />
      </motion.section>
    </main>
  );
}

export default Home;
