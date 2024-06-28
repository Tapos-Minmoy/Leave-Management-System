// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = role === 'applicant' ? { teacher_id: teacherId, password } : { email, password };

    const endpoint = role === 'applicant' ? '/api/login/teacher' : '/api/login/';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // Cache the session ID, user, and role
        localStorage.setItem('session_id', result.session_id);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('role', result.role);

        // Redirect to a protected route or dashboard
        navigate('/noc/leaveApplication'); // Adjust the route as necessary
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex flex-col md:flex-row justify-around bg-blue-50 h-screen'>
      <div className="flex flex-col justify-center align-center w-full md:w-1/2 p-10 ps-28">
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer ">Study Leave</p>
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer text-blue-500">Application</p>
      </div>

      <div>
        <div className="w-full mt-20 md:mt-40 ms-10 md:ms-0 me-0 md:me-52">
          <div className="max-w-md p-10 bg-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">Log in</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="roles" className="block font-medium text-white">Roles:</label>
                <select
                  id="roles"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="applicant">Teachers</option>
                  <option value="evaluator">Officials</option>
                </select>
              </div>

              {role === 'applicant' ? (
                <div>
                  <label htmlFor="teacherId" className="block font-medium text-white">Teacher ID:</label>
                  <input
                    type="number"
                    id="teacherId"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter your Teacher ID"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="email" className="block font-medium text-white">Your Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block font-medium text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-blue-400 hover:bg-blue-500 rounded focus:ring focus:ring-blue-300"
              >
                Log In
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
};

export default Login;
