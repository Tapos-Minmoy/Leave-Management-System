import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionRegistrar = ({ children }) => {
    const userRole = Cookies.get('role_role') || '';

  if (userRole && userRole==='register') {
    return children;
  }
  return  <Navigate to="/noc/oops" />;
};

export default CheckPermissionRegistrar;