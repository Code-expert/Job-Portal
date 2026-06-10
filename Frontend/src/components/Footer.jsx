import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100 pt-16 pb-8 mt-auto overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-b from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-t from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Description (Spans 4 cols) */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 group inline-flex mb-6">
              <svg className="w-8 h-8 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="8" width="18" height="12" rx="3" fill="url(#gradFooter1)" />
                <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="url(#gradFooter2)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="14" r="2" fill="white" />
                <path d="M3 10L21 10" stroke="white" strokeWidth="1" opacity="0.3" />
                <defs>
                  <linearGradient id="gradFooter1" x1="3" y1="8" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#C084FC" />
                  </linearGradient>
                  <linearGradient id="gradFooter2" x1="8" y1="4" x2="16" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
              </svg>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Jobify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hub</span>
              </h2>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              Your premium gateway to exciting opportunities. Connecting top talent with top employers in both formal and informal sectors seamlessly.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links (Spans 2 cols) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-indigo-600 transition-colors"></span> Home</Link></li>
              <li><Link to="/jobs" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-indigo-600 transition-colors"></span> Jobs</Link></li>
              <li><Link to="/browse" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-indigo-600 transition-colors"></span> Browse</Link></li>
              <li><Link to="/messages" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-indigo-600 transition-colors"></span> Messages</Link></li>
            </ul>
          </div>

          {/* Resources (Spans 2 cols) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-6 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span> Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span> Career Advice</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span> Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span> Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter (Spans 4 cols) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-6 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </h3>
            <p className="text-gray-500 mb-4">Subscribe to our newsletter to get the latest job alerts and career advice.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm group-hover:shadow-md">
                <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Jobify<span className="text-indigo-500">Hub</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <span className="text-sm text-gray-400 hover:text-indigo-600 cursor-pointer font-medium transition-colors">English (US)</span>
             <span className="text-sm text-gray-400 hover:text-indigo-600 cursor-pointer font-medium transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
