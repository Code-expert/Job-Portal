import  { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react"; // Importing the cross icon
import {  useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from "react-toastify";
import USER_API_END_POINT from "../constant";
import { Loader2 } from "lucide-react";

const UpdateProfileDialogue = ({Open,onClose}) => {
    if (!open) return null;
    
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    Fullname: user?.Fullname || "",
    Email: user?.Email || "",
    PhoneNumber: user?.PhoneNumber || "",
    bio: user?.Profile?.bio || "",
    skills: user?.Profile?.skills?.map(skill => skill) || "",
    file: user?.Profile?.resume || ""
});





  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, resume: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("Fullname", input.Fullname);
        formData.append("Email", input.Email);
        formData.append("PhoneNumber", input.PhoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                    toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        onClose(false);
        console.log(input);
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
      {/* Form Container */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-lg">
        {/* Close Button */}
        <button
          onClick={()=>onClose(true)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="name" className="text-right">Name</label>
                                <input
                                    id="name"
                                    name="Fullname"
                                    type="text"
                                    value={input.Fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="email" className="text-right">Email</label>
                                <input
                                    id="email"
                                    name="Email"
                                    type="email"
                                    value={input.Email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="number" className="text-right">Number</label>
                                <input
                                    id="number"
                                    name="PhoneNumber"
                                    value={input.PhoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="bio" className="text-right">Bio</label>
                                <input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="skills" className="text-right">Skills</label>
                                <input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor="file" className="text-right">Resume</label>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            disabled={loading}
          >
                                       {
                                loading ? <button className="w-full"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className="w-full">Update</button>
                            }

          </button>
        </form>
      </div>
    </div>
  );
};
UpdateProfileDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UpdateProfileDialogue;
