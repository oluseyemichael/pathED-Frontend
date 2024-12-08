import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract uid and token from the URL
  const query = new URLSearchParams(location.search);
  const uid = query.get('uid');
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await resetPassword(uid, token, newPassword);
      if (response.status === 200) {
        setMessage("Password reset successfully.");
        navigate('/login');
      } else {
        setMessage("Failed to reset password.");
      }
    } catch (error) {
      setMessage("An error occurred. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="max-w-xl w-full p-8 rounded-lg">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-6">Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full py-3 px-7 font-medium mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-3 px-7 font-medium mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none font-semibold text-base"
          >
            Reset Password
          </button>
          <p className="text-sm text-green-600 mt-4">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
