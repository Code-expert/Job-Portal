import { useState } from "react";
import { Pen, Mail, Contact } from "lucide-react";
import AppliedJobTable from "../components/AppliedJobTable";
import UpdateProfileDialogue from "../components/UpdateProfileDialogue";
import { useSelector } from "react-redux";

function Profile() {
  const {user} = useSelector(store=>store.auth);
 
  const [open, setOpen] = useState(false); // Controls the update form visibility
  const isResume = true;

  return (
    <div>
      <div className="max-w-4xl mx-auto my-5 bg-white border-gray-200 p-8 shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <img
              className="size-10 ring-2 rounded-full ring-white cursor-pointer h-24 w-24"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />
            <div>
              <h1 className="font-medium text-xl">{user?.Fullname}</h1>
              <p>{user?.Profile?.bio}</p>
            </div>
          </div>
          {/* Open Update Profile Form on Click */}
          <button onClick={() => setOpen(true)} className="text-right cursor-pointer">
            <Pen />
          </button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.Email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.PhoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.Profile?.skills.length !== 0 ? (
              user?.Profile?.skills.map((item, index) => (
                <span key={index} className="bg-black rounded-3xl text-white font-semibold text-sm m-2 p-2">
                  {item}
                </span>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold">Resume</label>
          {isResume ? (
            <a target="blank" href={user?.Profile?.resume} className="text-blue-500 hover:underline cursor-pointer">
              {user?.Profile?.ResumeoriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Modal - Controlled by "open" state */}
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
          
    </div>
  );
}

export default Profile;
    