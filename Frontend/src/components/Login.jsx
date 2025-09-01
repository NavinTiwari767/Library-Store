import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 👈 default role = user
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = { email, password, role }; // 👈 send role too

    try {
      const res = await axios.post('http://localhost:5000/api/user/login', userInfo);
      if (res.data) {
        alert(`${role === "student" ? "Student" : "User"} Login successful!`);
        localStorage.setItem("user", JSON.stringify(res.data));
        
        // Navigate based on role
        if (role === "student") {
          navigate('/student-dashboard');
        } else {
          navigate('/course');
        }
      }
    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Close button */}
        <Link to="/" className="absolute top-2 right-4 text-gray-400 hover:text-white text-2xl font-bold">
          &times;
        </Link>
        
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Role Selector */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Login as</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="user">User</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition">
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Not registered?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
