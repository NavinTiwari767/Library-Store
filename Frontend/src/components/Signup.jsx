import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 👈 default role = user
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const newUser = { fullname, email, password, role }; // 👈 role bhejna

        try {
            const res = await axios.post('http://localhost:5000/api/user/signup', newUser);
            if (res.data) {
                alert(`${role === "student" ? "Student" : "User"} Signup successful! You can now log in.`);
                navigate('/login'); // Signup ke baad login pe bhejna
            }
        } catch (err) {
            if (err.response) {
                alert("Error: " + err.response.data.message);
            }
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignup}>

                    {/* Role Selector */}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2">Register as</label>
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
                        <label className="block text-gray-400 mb-2" htmlFor="fullname">Full Name</label>
                        <input id="fullname" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
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
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-cyan-400 hover:underline cursor-pointer">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
