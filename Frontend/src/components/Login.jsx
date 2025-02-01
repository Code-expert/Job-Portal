import { useState } from "react";

function LoginForm() {
  const [userType, setUserType] = useState("employee");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-md py-10">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
        
        <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
      
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        
        <div className="flex justify-center gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="userType" 
              value="employee" 
              checked={userType === "employee"} 
              onChange={() => setUserType("employee")} 
            />
            Employee
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="userType" 
              value="recruiter" 
              checked={userType === "recruiter"} 
              onChange={() => setUserType("recruiter")} 
            />
            Recruiter
          </label>
        </div>
        
        <form className="mt-4">
          {userType === "recruiter" && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">Login</button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
      </div>
    </div>
  );
}

export default LoginForm;
