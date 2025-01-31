import { useState } from "react";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = true; // Change this to true when user is logged in

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">Jobs</li>
            <li className="cursor-pointer hover:text-gray-300">Browse</li>
          </ul>

          {/* If user is NOT logged in, show Login & Register buttons */}
          {!user ? (
            <div className="flex gap-4">
              <button className=" text-black px-4 py-2 rounded font-medium">
                Login
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-300">
                Register
              </button>
            </div>
          ) : (
            // If user is logged in, show profile section
            <div className="relative">
              {/* Profile Image */}
              <img
                className="size-10 rounded-full ring-2 ring-white cursor-pointer"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                onClick={toggleDropdown} // Toggle dropdown on click
              />

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-3 z-50">
                  {/* Profile Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">johndoe@email.com</p>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* Profile & Logout Buttons */}
                  
                <button className="w-full flex items-center gap-2 text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    <ImProfile className="text-lg" /> View Profile
                </button>

                <button className="w-full flex items-center gap-2 text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded">
                    <IoIosLogOut className="text-lg" /> Logout
                </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
