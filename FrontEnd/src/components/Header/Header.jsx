import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logoImage from '../images/logo.png';

const Header = () => {
  const navigate = useNavigate();

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
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#">Home</Navbar.Link>
        <Navbar.Link href="/noc/login" active>Login/Register</Navbar.Link>
        <Navbar.Link href="/instructions">Insturctions</Navbar.Link>
        <Navbar.Link href="/notices">Notices</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
