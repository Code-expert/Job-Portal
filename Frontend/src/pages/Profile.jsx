import { useState } from "react";
import { Pen, Mail, Contact } from "lucide-react";
import AppliedJobTable from "../components/AppliedJobTable.jsx";
import UpdateProfileDialogue from "../components/UpdateProfileDialogue.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/UseGetAppliedJobs.jsx";

const isResume = true;

function Profile() {
  useGetAppliedJobs(); // Fetches the applied jobs
  const [open, setOpen] = useState(false); // Controls the update form visibility
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full">
            <img
              className="rounded-full border-4 border-blue-500 shadow-md w-28 h-28 object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
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
            className="mt-4 md:mt-0 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
          >
            <Pen className="text-gray-600" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-5 space-y-3 text-center md:text-left">
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
        <div className="mt-6">
          <h2 className="font-bold text-lg text-gray-800 text-center md:text-left">Skills</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {user?.Profile?.skills.length !== 0 ? (
              user?.Profile?.skills.map((skill, index) => (
                <span key={index} className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-5">
          <h2 className="font-bold text-lg text-gray-800 text-center md:text-left">Resume</h2>
          {isResume && user?.Profile?.resume ? (
            <div className="text-center md:text-left">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.Profile?.resume}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                {user?.Profile?.ResumeoriginalName || "Download Resume"}
              </a>
            </div>
          ) : (
            <span className="text-gray-500 text-center md:text-left block">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-200">
        <h2 className="font-bold text-xl text-gray-800 mb-4 text-center md:text-left">Applied Jobs</h2>
        
        {/* Scrollable Table on Small Screens */}
        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </div>

      {/* Update Profile Modal - Controlled by "open" state */}
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
