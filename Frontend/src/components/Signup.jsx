import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [doorOpen, setDoorOpen] = useState(false);
    const [knobClicked, setKnobClicked] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const newUser = { fullname, email, password, role };

        try {
            const res = await axios.post('http://localhost:5000/api/user/signup', newUser);
            if (res.data) {
                alert(`${role === "student" ? "Student" : "User"} Signup successful! You can now log in.`);
                navigate('/login');
            }
        } catch (err) {
            if (err.response) {
                alert("Error: " + err.response.data.message);
            }
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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 text-white overflow-hidden relative">
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
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Join Our Community
                    </h2>
                    <p className="text-xl text-gray-300 mb-2">Begin your learning journey with us</p>
                    <p className="text-lg text-purple-300 animate-pulse">Turn the knob to enter</p>
                </div>
                
                {/* Animated Door */}
                <div className="relative w-72 h-96 mx-auto">
                    <div className={`absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20 transition-all duration-1000 ease-out ${doorOpen ? 'opacity-0 translate-y-20 -rotate-5' : 'opacity-100'}`}>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-purple-400 rounded-full"></div>
                        
                        {/* Door Knob */}
                        <div 
                            className={`absolute top-1/2 right-6 w-8 h-8 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full shadow-lg cursor-pointer transition-transform duration-300 ease-out ${knobClicked ? 'scale-90 -rotate-12' : 'hover:scale-110'}`}
                            onClick={handleKnobClick}
                        >
                            <div className="absolute top-1/2 left-1 w-3 h-1 bg-yellow-700 rounded-l-full"></div>
                        </div>
                        
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Signup Form */}
            <div 
                className={`relative bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/30 transition-all duration-1000 ease-out ${doorOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{zIndex: 10}}
            >
                <button 
                    onClick={() => setDoorOpen(false)} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 text-2xl font-bold transition-colors duration-300"
                >
                    &times;
                </button>
                
                <div className="text-center mb-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Sign Up</h2>
                    <p className="text-gray-400 mt-2">Create your account to get started</p>
                </div>
                
                <form onSubmit={handleSignup} className="mt-6">
                    {/* Role Selector */}
                    <div className="mb-5">
                        <label className="block text-purple-300 mb-2 font-medium">Register as</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        >
                            <option value="user">User</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label className="block text-purple-300 mb-2 font-medium" htmlFor="fullname">Full Name</label>
                        <input 
                            id="fullname" 
                            type="text" 
                            value={fullname} 
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                            required 
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-purple-300 mb-2 font-medium" htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                            required 
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-purple-300 mb-2 font-medium" htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                            required 
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-cyan-600 font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center mt-6 pt-5 border-t border-gray-700/50">
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium underline transition-colors duration-300">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;