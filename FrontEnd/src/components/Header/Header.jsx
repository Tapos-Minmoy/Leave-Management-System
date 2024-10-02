import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logoImage from '../images/logo.png';
import profileImage from '../images/user.png';
import Rules from '../Rules/Rules';

const Header = () => {
  const [showRules, setShowRules] = useState(false); // State to control Rules visibility

  const handleOpenRules = () => {
      setShowRules(true);
  };

  const handleCloseRules = () => {
      setShowRules(false);
  };
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
    const sessionId = Cookies.get('session_id') || '';
  
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
  
        const firstName = '';
        const lastName = '';
        const userRole = '';
        const sessionId = '';
  
        // Reset state with retrieved values
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setRole(userRole);
        setSessionId(sessionId);
  
        // Navigate to login page
        navigate('/noc/login');
      } else {
        alert(result.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    } // <--- Add the missing semicolon here
  };
  

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={logoImage} className="mr-3 h-6 sm:h-9" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">University of Chittagong</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={profileImage} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{userFirstName+ " "+ userLastName}</span>
            <span className="block truncate text-sm font-medium">{role}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/noc/login">Home</Navbar.Link>
        <Navbar.Link onClick={handleOpenRules}>Rules</Navbar.Link>
        {/* Rules for rules */}
        {showRules && <Rules onClose={handleCloseRules} />}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;