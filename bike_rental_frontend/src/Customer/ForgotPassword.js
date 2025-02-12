import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerNavbar from '../Components/CustomerNavbar';

function ForgotPassword() {
  const { userId } = useParams();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/auth/forgot-password?email=${email}`
      );
      toast.success("Password reset link sent successfully!", {
        autoClose: 5000, // Close after 5 seconds
        closeOnClick: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Email.",
        {
          autoClose: 5000, // Close after 5 seconds
          closeOnClick: true,
        }
      );
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{margin:"10%", width:"50%",}}>
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter your email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600" style={{backgroundColor:"blue"}}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default ForgotPassword;
