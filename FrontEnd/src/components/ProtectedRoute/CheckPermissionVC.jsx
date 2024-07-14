import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionVC = ({ children }) => {
    const userRole = Cookies.get('role_role') || '';

  if (userRole && userRole==='vice_chancellor') {
    return children;
  }
  return  <Navigate to="/noc/oops" />;
};

export default CheckPermissionVC;