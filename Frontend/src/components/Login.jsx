import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [knobClicked, setKnobClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
        role
      });

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        
        if (res.data.user.role === "student") {
          navigate('/student-dashboard');
        } else {
          navigate('/course');
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKnobClick = () => {
    setKnobClicked(true);
    setTimeout(() => {
      setDoorOpen(true);
      setKnobClicked(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Door Container */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-out ${doorOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{zIndex: 20}}
      >
        <div className="text-center mb-8 transform transition-transform duration-700 hover:scale-105">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xl text-gray-300 mb-2">Your journey continues here</p>
          <p className="text-lg text-cyan-300 animate-pulse">Turn the knob to enter</p>
        </div>
        
        {/* Animated Door */}
        <div className="relative w-72 h-96 mx-auto">
          <div className={`absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 transition-all duration-1000 ease-out ${doorOpen ? 'opacity-0 -translate-y-20 rotate-5' : 'opacity-100'}`}>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-cyan-400 rounded-full"></div>
            
            {/* Door Knob */}
            <div 
              className={`absolute top-1/2 right-6 w-8 h-8 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full shadow-lg cursor-pointer transition-transform duration-300 ease-out ${knobClicked ? 'scale-90 rotate-12' : 'hover:scale-110'}`}
              onClick={handleKnobClick}
            >
              <div className="absolute top-1/2 left-1 w-3 h-1 bg-yellow-700 rounded-l-full"></div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-cyan-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Login Form */}
      <div 
        className={`relative bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-cyan-500/30 transition-all duration-1000 ease-out ${doorOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{zIndex: 10}}
      >
        <button 
          onClick={() => setDoorOpen(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 text-2xl font-bold transition-colors duration-300"
        >
          &times;
        </button>
        
        <div className="text-center mb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Login</h2>
          <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-6">
          {/* Role Selector */}
          <div className="mb-5">
            <label className="block text-cyan-300 mb-2 font-medium">Login as</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            >
              <option value="user">User</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-cyan-300 mb-2 font-medium">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" 
              required 
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-cyan-300 mb-2 font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" 
              required 
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : 'Log In'}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-gray-700/50">
          <p className="text-gray-400">
            Not registered?{" "}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium underline transition-colors duration-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;