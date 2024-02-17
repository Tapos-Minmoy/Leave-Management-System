// import React from 'react';

// eslint-disable-next-line no-unused-vars
import React from 'react';

const Login = () => {
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