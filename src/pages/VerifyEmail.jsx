// src/pages/VerifyEmail.jsx
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
          // Navigate to the EmailVerified page upon success
          setTimeout(() => {
            navigate('/email-verified');
          }, 1500); // Delay for user experience
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
    <div className="verify-email">
      {status === 'success' && <p>Email successfully verified. Redirecting...</p>}
      {status === 'failure' && <p>Verification failed. The link may have expired.</p>}
      {!status && <p>Verifying your email...</p>}
    </div>
  );
}

export default VerifyEmail;
