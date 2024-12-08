import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

function VerifyEmail() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const uid = params.get('uid');
      const token = params.get('token');

      try {
        const response = await api.get(`/verify-email/?uid=${uid}&token=${token}`);
        if (response.status === 200) {
          setStatus('success');
          setTimeout(() => {
            navigate('/email-verified');
          }, 1500);
        } else {
          setStatus('failure');
        }
      } catch (error) {
        setStatus('failure');
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/assets/logo.svg" alt="Logo" className="h-8" />
        </div>
        {status === 'success' && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-6">
            Email successfully verified. Redirecting...
          </div>
        )}
        {status === 'failure' && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-6">
            Verification failed. The link may have expired.
          </div>
        )}
        {!status && (
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-md mb-6">
            Verifying your email...
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;