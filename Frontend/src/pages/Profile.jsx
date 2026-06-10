import { useState } from "react";
import { Pen, Mail, Contact, Bookmark, Briefcase } from "lucide-react";
import AppliedJobTable from "../components/AppliedJobTable.jsx";
import UpdateProfileDialogue from "../components/UpdateProfileDialogue.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/UseGetAppliedJobs.jsx";
import useGetAllJobs from "../hooks/UseGetAlljobs.jsx";
import Job from "../components/Job.jsx";
import { motion } from "framer-motion";

const isResume = true;

function Profile() {
  useGetAppliedJobs(); // Fetches the applied jobs
  useGetAllJobs(); // Fetches all jobs to filter saved ones
  
  const [open, setOpen] = useState(false); // Controls the update form visibility
  const [activeTab, setActiveTab] = useState("applied"); // "applied" | "saved"
  
  const { user } = useSelector((store) => store.auth);
  const { GetAllJobs } = useSelector((store) => store.job);

  const savedJobsList = GetAllJobs?.filter(job => user?.Profile?.savedJobs?.includes(job._id)) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6">

      {/* Profile Card */}
      <div className="bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-6 md:p-10 border border-gray-100 relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between">

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full">
            <img
              className="rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-32 h-32 object-cover cursor-pointer transition-transform duration-300 hover:scale-105 ring-4 ring-indigo-50"
              src={
                user?.Profile?.ProfilePhoto ||
                "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"
              }
              alt="Profile"
            />
            <div className="text-center md:text-left">
              <h1 className="font-semibold text-2xl text-gray-800">{user?.Fullname}</h1>
              <p className="text-gray-600">{user?.Profile?.bio || "No bio available"}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-4 md:mt-0 bg-indigo-50 p-3 rounded-full shadow-sm hover:bg-indigo-100 hover:shadow-md transition duration-300 group z-10"
          >
            <Pen className="text-indigo-600 group-hover:scale-110 transition-transform" size={20} />
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-5 space-y-3 text-center md:text-left relative z-10">
          <div className="flex items-center gap-3 justify-center md:justify-start text-gray-700">
            <Mail className="text-blue-600" />
            <span>{user?.Email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start text-gray-700">
            <Contact className="text-green-600" />
            <span>{user?.PhoneNumber || "Not provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8 relative z-10">
          <h2 className="font-bold text-lg text-gray-800 text-center md:text-left">Skills</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            {user?.Profile?.skills?.length !== 0 ? (
              user?.Profile?.skills.map((skill, index) => (
                <span key={index} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-100 transition-colors">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-8 relative z-10">
          <h2 className="font-bold text-lg text-gray-800 mb-2">Resume</h2>
          {isResume && user?.Profile?.resume ? (
            <div className="text-center md:text-left">
              <a
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.Profile?.resume)}&embedded=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl mt-2 inline-block shadow-md hover:shadow-lg transition-all font-medium"
              >{user?.Profile?.ResumeoriginalName || "View Resume"}
              </a>
            </div>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Tabs for Applied & Saved Jobs */}
      <div className="mt-10 flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("applied")}
          className={`flex items-center gap-2 pb-3 px-2 font-semibold transition-colors border-b-2 ${activeTab === "applied" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Briefcase size={20} />
          Applied Jobs
        </button>
        <button 
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 pb-3 px-2 font-semibold transition-colors border-b-2 ${activeTab === "saved" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Bookmark size={20} />
          Saved Jobs <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{savedJobsList.length}</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "applied" && (
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-10 border border-gray-100">
            <h2 className="font-bold text-2xl text-gray-800 mb-6 text-center md:text-left">Applied Jobs</h2>
            <div className="overflow-x-auto">
              <AppliedJobTable />
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-10 border border-gray-100">
            <h2 className="font-bold text-2xl text-gray-800 mb-6 text-center md:text-left">Saved Jobs</h2>
            {savedJobsList.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium">You haven't saved any jobs yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobsList.map((job) => (
                  <motion.div key={job._id} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Update Profile Modal - Controlled by "open" state */}
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
