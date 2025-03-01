import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import USER_API_END_POINT from "../constant.js";
import { setUser } from "../store/authSlice.js";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        Fullname: user?.Fullname || "",
        Email: user?.Email || "",
        PhoneNumber: user?.PhoneNumber || "",
        bio: user?.Profile?.bio || "",
        skills: user?.Profile?.skills?.join(", ") || "",
        file: user?.Profile?.resume || "",
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
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
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        setOpen(false);
    };

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center  bg-opacity-40 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()} 
            >
                
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer text-xl"
                    aria-label="Close"
                >
                    ✖
                </button>

               
                <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

            
                <form onSubmit={submitHandler} className="space-y-4">
                    {[
                        { label: "Full Name", name: "Fullname", type: "text" },
                        { label: "Email", name: "Email", type: "email" },
                        { label: "Phone Number", name: "PhoneNumber", type: "text" },
                        { label: "Bio", name: "bio", type: "text" },
                        { label: "Skills (comma-separated)", name: "skills", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="space-y-1">
                            <label htmlFor={name} className="text-gray-700 font-medium">
                                {label}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={input[name]}
                                onChange={changeEventHandler}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ))}

                 
                    <div className="space-y-1">
                        <label htmlFor="file" className="text-gray-700 font-medium">
                            Upload Resume
                        </label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            accept="/*"
                            onChange={fileChangeHandler}
                            className="w-full p-3 border rounded-md"
                        />
                    </div>

                   
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

UpdateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;
