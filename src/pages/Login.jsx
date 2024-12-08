import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);

      // Store tokens in localStorage for persistent login
      localStorage.setItem('access_token', data.tokens.access);
      localStorage.setItem('refresh_token', data.tokens.refresh);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  // Automatically redirect to dashboard if a token exists
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div>
        <div className="justify-start lg:mt-10 ">
          <img src="/assets/logo.svg" alt="Logo" className="h-8" />
        </div>
        <div className="max-w-xl w-full p-8 rounded-lg">
          <h1 className="font-aeonik text-2xl lg:text-4xl font-medium text-left mb-4 justify-start">
            Login to continue<span className="text-blue-600"> <span className='text-6xl font-sans'>.</span>learning</span>
          </h1>
          <h2 className="text-left text-gray-600 mb-5 mt-3 lg:mb-6 lg:mt-4 text-sm lg:text-base">
            Welcome back! Login to continue learning.
          </h2>
          
          {/* Google Signup */}
          <button className="font-medium flex items-center justify-center w-full py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 mb-4 text-sm lg:text-base">
            <FcGoogle className="mr-2" size={20} />
            Sign up with Google
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full py-3 px-7 font-medium mb-3 lg:mb-5 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full py-3 px-7 font-medium mb-3 lg:mb-5 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mb-3 lg:mb-5"
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </span>
            </div>

            <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 font-semibold text-base mt-4"
              >
                Continue
            </button>
            <p className="text-sm text-red-600 mt-2">{message}</p>
          </form>
          <p className="text-center mt-6 text-gray-600 font-normal text-base">
            Don’t have an account? <a href="/signup" className="font-semibold text-blue-500 hover:text-blue-700 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
