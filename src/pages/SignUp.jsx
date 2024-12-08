import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', full_name: '', confirm_password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        setSuccessMessage("Account created successfully! Check your email to verify your account. If you don't see the email, please check your spam folder.");
        setErrorMessage('');
      } else {
        setErrorMessage('Registration failed. Try again.');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div>
        <div className="justify-start lg:mt-10 ">
          <img src="/assets/logo.svg" alt="Logo" className="h-8" />
        </div>
        <div className="max-w-xl w-full  p-8 rounded-lg">
          <h1 className="font-aeonik text-2xl lg:text-5xl font-medium text-left mb-4">Signup to start<span className="text-blue-600"> <span className='text-6xl font-sans'>.</span>learning</span></h1>
          <h2 className="text-left text-gray-600 mb-5 mt-3 lg:mb-6 lg:mt-4 text-sm lg:text-base">Welcome to your self-aiding platform. <span className="text-gray-600 underline font-semibold">Sign up today!</span></h2>

          {/* Google Signup */}
          <button className="font-medium flex items-center justify-center w-full py-2 border  rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 mb-4 text-sm lg:text-base">
            <FcGoogle className="mr-2" size={20} />
            Sign up with Google
          </button>

          {/* Separator */}
          <div className="flex items-center my-4 lg:my-9">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {successMessage ? (
            <div className="text-green-600 text-center mb-4">
              {successMessage}
              <button onClick={() => navigate('/login')} className="text-blue-500 underline ml-2">Go to Login</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="full_name"
                placeholder="Full name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full py-3 px-7 font-medium mb-3 lg:mb-5 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full py-3 px-7 font-medium text-gray-900 border rounded-lg focus:outline-none focus:border-blue-500 lg:mb-5 mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-7 font-medium mb-3 border rounded-lg focus:outline-none focus:border-blue-500 lg:mb-5"
                required
              />
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 px-7 font-medium mb-3 border rounded-lg focus:outline-none focus:border-blue-500 lg:mb-5"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mb-3 lg:mb-5"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full py-3 px-7 font-medium mb-6 border rounded-lg focus:outline-none focus:border-blue-500 lg:mb-5"
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
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 font-semibold text-base"
              >
                Continue
              </button>
              {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
            </form>
          )}
          <p className="text-center mt-6 text-gray-600 font-normal text-base">
            Already have an account? <a href="/login" className="font-semibold text-blue-500 hover:text-blue-700 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
