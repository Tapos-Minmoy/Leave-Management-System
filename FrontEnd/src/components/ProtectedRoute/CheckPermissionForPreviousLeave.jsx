import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionForPreviousLeave = ({ children }) => {
    const userRole = Cookies.get('role_role') || '';

  if (userRole && userRole!=='student') {
    return children;
  }
  return  <Navigate to="/noc/oops" />;
};

export default CheckPermissionForPreviousLeave;