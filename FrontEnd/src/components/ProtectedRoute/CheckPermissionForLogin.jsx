import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionForLogin = ({ children }) => {
    const userRole = Cookies.get('role_role') || '';

  if (userRole && userRole==='chairman') {
    if(userRole=='chairman')  return  <Navigate to="/noc/chairman" />;
    else  return  <Navigate to="noc/leaveApplication" />;
  }
 
  return children;
};

export default CheckPermissionForLogin;