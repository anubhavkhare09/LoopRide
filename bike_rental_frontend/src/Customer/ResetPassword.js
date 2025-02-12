import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      toast.error('Email parameter is missing in the URL.');
    }
  }, [searchParams]);

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error('Password is required.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/reset-password`,
        null,
        {
          params: {
            email: email,
            newPassword: newPassword,
          },
        }
      );
      toast.success(response.data, {
        autoClose: 3000,
        onClose: () => navigate('/'), // Redirect after toast
      });
    } catch (error) {
      toast.error(
        error.response?.data || 'Failed to reset the password.',
        { autoClose: 3000 }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-400"  style={{margin:"10%", width:"50%"}}>
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below to reset your account.
        </p>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200" style={{backgroundColor:"blue"}}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
