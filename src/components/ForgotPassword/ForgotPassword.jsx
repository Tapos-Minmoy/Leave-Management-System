/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div>
           <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white mb-4">Forgot Password</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-white">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-orange-300"
              placeholder="name@company.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-orange-400 hover:bg-orange-500 rounded focus:ring focus:ring-orange-300"
          >
            Reset Password
          </button>
          <p className="text-sm text-white">
            Remember your password?
             <Link to="/login" className="font-medium hover:underline">Log In</Link>
          </p>
        </form>
      </div>
    </div> 
        </div>
    );
};

export default ForgotPassword;