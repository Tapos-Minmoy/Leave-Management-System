import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import capImage from '../images/cap.png';
import processingImage from '../images/color_processing.webp';
import Progress from '../images/progress.jpg';
import './LeaveApplication.css';

function LeaveApplication() {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [role, setRole] = useState('');
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve values from cookies
    const firstName = Cookies.get('user_first_name') || '';
    const lastName = Cookies.get('user_last_name') || '';
    const userRole = Cookies.get('role_role') || '';
    const sessionId = Cookies.get('session_id') || '';

    // Set state with retrieved values
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setRole(userRole);
    setSessionId(sessionId);
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionId}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.message === 'Logged out successfully') {
        // Clear all cookies
        Object.keys(Cookies.get()).forEach(cookieName => {
          Cookies.remove(cookieName);
        });

        // Navigate to login page
        navigate('/noc/login');
      } else {
        alert(result.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex flex-col justify-center">
      <div className="mt-2 text-center">
        <h2 className="text-xl font-bold p-2">Welcome, {userFirstName} {userLastName}</h2>
        <p className="text-lg">Role: {role}</p>
        <p className="text-lg">Session ID: {sessionId}</p>
        <button
          onClick={logout}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mt-5 flex justify-center items-center gap-10">
        <div className="Study_Leave_Application w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to="/noc/studyLeaveForm" className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={capImage} alt="Cap image" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Study leave Application</h5>
            <span className="text text-white-500 dark:text-gray-400 bg-green-500 px-3 py-1 rounded">Apply</span>
          </Link>
        </div>

        <div className="Other_Leave_Application-section w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to="/noc/otherLeaveForm" className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={processingImage} alt="Processing image" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Other Leave Application</h5>
            <span className="text text-white-500 dark:text-gray-400 bg-green-500 px-3 py-1 rounded">Apply</span>
          </Link>
        </div>
        
        <div className="Previous_Application w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to="/noc/previousLeave" className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 p-3 rounded-full shadow-lg" src={Progress} alt="Progress image" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Previous Application</h5>
            <span className="text text-white-500 dark:text-gray-400 bg-green-500 px-3 py-1 rounded">View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeaveApplication;
