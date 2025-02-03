import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Dummy job categories
  const categories = ["Engineering", "Marketing", "Finance", "IT", "Healthcare", "Education"];
  
  // Dummy latest jobs
  const latestJobs = [
    { title: "Software Engineer", company: "TechCorp", location: "Remote", id: 1 },
    { title: "Marketing Specialist", company: "AdWorld", location: "New York, NY", id: 2 },
    { title: "Data Analyst", company: "FinanceHub", location: "San Francisco, CA", id: 3 },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="mt-3 text-lg">Explore thousands of job listings in various industries.</p>
        <button 
          className="mt-5 bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-200"
          onClick={() => navigate("/jobs")}
        >
          Browse Jobs
        </button>
      </section>
      
      {/* Category Section */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Explore Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white shadow-md px-6 py-3 rounded-lg text-gray-800 font-semibold cursor-pointer hover:bg-blue-500 hover:text-white transition">
              {category}
            </div>
          ))}
        </div>
      </section>
      
      {/* Latest Jobs Section */}
      <section className="py-10 px-5">
        <h2 className="text-3xl font-bold text-center mb-6">Latest Job Listings</h2>
        <div className="max-w-4xl mx-auto">
          {latestJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-lg p-5 rounded-md mb-4">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
