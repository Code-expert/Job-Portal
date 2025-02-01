import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white">Job<span className="text-red-500">Portal</span></h2>
          <p className="mt-2 text-gray-400">
            Your gateway to exciting job opportunities. Connecting talents with top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-red-400">Home</a></li>
            <li><a href="#" className="hover:text-red-400">Jobs</a></li>
            <li><a href="#" className="hover:text-red-400">Browse</a></li>
            <li><a href="#" className="hover:text-red-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p className="mt-2 text-gray-400">Email: support@jobportal.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          
          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600"><FaLinkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaInstagram size={20} /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

