// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
// import React from 'react';

const Login = () => {
  return (
    <div className='flex flex-col md:flex-row justify-around bg-blue-50 h-screen'>
      <div className="flex flex-col justify-center align-center w-full md:w-1/2 p-10">
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer ">Study Leave</p>
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer  text-blue-500">Application</p>
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
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  placeholder="••••••••"
                  required
                />
              </div>
      
              <div>
                <label htmlFor="roles" className="block font-medium text-white">Roles:</label>
                <select
                  id="roles"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="applicant">Applicant</option>
                  <option value="evaluator">Evaluator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-blue-400 hover:bg-blue-500 rounded focus:ring focus:ring-blue-300"
              >
                LogIn
              </button>
              <Link to="../ForgotPassword" className="text-sm mt-2 text-white hover:underline">
                Forgot Password?
              </Link>
              <p className="text-sm text-white">
                Do not have an account? <Link to="../SignUp" className="font-medium text-blue-300 hover:underline">Create Account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200">
      <nav className="w-full bg-yellow-500 px-4 py-2 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src="./images/logo.png" className="h-12 w-8 mr-3 sm:h-9" alt="CU Logo" />
            <span className="text-2xl text-white font-serif font-bold">University Of Chittagong</span>
          </a>
        </div>
      </nav>
      
      <header className="flex flex-col items-center justify-center">
        <h2 className="mt-16 mb-5 text-3xl font-bold text-white">Study Leave Application System</h2>
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="name@site.com" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Your password</label>
            <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="repeat-password" className="block text-gray-700 text-sm font-bold mb-2">Repeat password</label>
            <input type="password" id="repeat-password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
        </form>
        <div className="text-gray-500 text-lg">
          Not registered? <a href="#" className="text-blue-700 hover:underline">Create Account</a>
        </div>
      </header>

      <footer className="w-full bg-gradient-to-r from-white to-yellow-500 py-4 text-center text-gray-700">
        <div className="container mx-auto">
          <p className="text-sm">Copyright © 2023 - All right reserved</p>
          <div className="flex justify-center mt-2">
            <a href="#" className="mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="mx-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="mx-2"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
