// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { requestPasswordReset } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      if (response.status === 200) {
        setMessage('Password reset link sent to your email.');
      } else {
        setMessage('Error sending password reset link.');
      }
    } catch (error) {
      setMessage('An error occurred. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="max-w-xl w-full p-8 rounded-lg">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-7 font-medium mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none font-semibold text-base"
          >
            Send Reset Link
          </button>
          <p className="text-sm text-green-600 mt-4">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
