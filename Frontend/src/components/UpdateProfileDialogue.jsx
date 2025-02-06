import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import USER_API_END_POINT from '../constant.js';
import { setUser } from '../store/authSlice';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        Fullname: user?.Fullname || "",
        Email: user?.Email || "",
        PhoneNumber: user?.PhoneNumber || "",
        bio: user?.Profile?.bio || "",
        skills: user?.Profile?.skills?.join(', ') || "",
        file: user?.Profile?.resume || ""
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
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    };

    if (!open) return null; // Prevent rendering when dialog is closed

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm "
            onClick={() => setOpen(false)} // Clicking outside closes dialog
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                    aria-label="Close"
                >
                    ✖
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-center mb-4">Update Profile</h2>

                {/* Form */}
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <label htmlFor="fullname" className="text-right font-medium">Full Name</label>
                            <input
                                id="fullname"
                                name="Fullname"
                                type="text"
                                value={input.Fullname}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-right font-medium">Email</label>
                            <input
                                id="email"
                                name="Email"
                                type="email"
                                value={input.Email}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="text-right font-medium">Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="PhoneNumber"
                                type="text"
                                value={input.PhoneNumber}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-right font-medium">Bio</label>
                            <input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="skills" className="text-right font-medium">Skills</label>
                            <input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="file" className="text-right font-medium">Resume</label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="/*"
                                onChange={fileChangeHandler}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                                loading ? <button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> : <button type="submit" className="w-full my-4">Update</button>
                            }
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
