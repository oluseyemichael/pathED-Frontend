// src/pages/EmailVerified.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Email Verified Successfully</h2>
      <p className="text-gray-700 text-lg">You can now log in to your account.</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Login Here
      </button>
    </div>
  );
};

export default EmailVerified;
