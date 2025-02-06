import { useState } from "react";
import { Pen, Mail, Contact } from "lucide-react";
import AppliedJobTable from "../components/AppliedJobTable";
import UpdateProfileDialogue from "../components/UpdateProfileDialogue";

function Profile() {
  const Skills = ["HTML", "CSS", "JavaScript", "React"];
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
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
            <span>Harshraj@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>1234567890</span>
          </div>
        </div>

        <div>
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {Skills.length !== 0 ? (
              Skills.map((item, index) => (
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
            <a target="blank" href="https://youtube.com" className="text-blue-500 hover:underline cursor-pointer">
              Harsh
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
      <UpdateProfileDialogue open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Profile;
    