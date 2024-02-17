// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col md:flex-row justify-around bg-orange-50 h-screen'>
      <div className="flex flex-col justify-center align-center w-full md:w-1/2 p-10">
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer ">Study Leave</p>
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer  text-orange-500">Application</p>
      </div>

      <div>
        <div className="w-full mt-20 md:mt-40 ms-10 md:ms-0 me-0 md:me-52">
          <div className="max-w-md p-10 bg-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">Log in</h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium text-white">Your Email:</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="RepeatPassword" className="block font-medium text-white">Repeat password:</label>
                <input
                  type="password"
                  id="RepeatPassword"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="roles" className="block font-medium text-white">Roles:</label>
                <select
                  id="roles"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="applicant">Applicant</option>
                  <option value="evaluator">Evaluator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-orange-400 hover:bg-orange-500 rounded focus:ring focus:ring-yellow-300"
              >
                LogIn
              </button>
              <Link to="../ForgotPassword" className="text-sm mt-2 text-white hover:underline">
                Forgot Password?
              </Link>
              <p className="text-sm text-white">
                Do not have an account? <Link to="../SignUp" className="font-medium text-orange-300 hover:underline">Create Account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
