import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-aeonik">
      <img src="/assets/logo.svg" alt="PathED" className='mb-24'/>
      <h2 className="lg:text-4xl md:text-3xl text-2xl lg:mb-4 mb-3 text-blue-600">Email Verified Successfully</h2>
      <p className="text-gray-700 lg:text-xl md:text-lg text-sm ">You can now log in to your account.</p>
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
