import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-white">
            Jobify<span className="text-blue-500">Hub</span>
          </h2>
          <p className="mt-2 text-gray-400">Your gateway to exciting job opportunities.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-red-400 transition">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-red-400 transition">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-red-400 transition">Browse</Link></li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p className="mt-2 text-gray-400">Email: support@jobportal.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          
          {/* Social Media Links */}
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 transition">
              <FaLinkedin size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
