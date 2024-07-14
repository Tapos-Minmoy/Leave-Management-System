import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionHigherStudy = ({ children }) => {
    const userRole = Cookies.get('role_role') || '';

  if (userRole && userRole==='Higher Study Branch') {
    return children;
  }
  return  <Navigate to="/noc/oops" />;
};

export default  CheckPermissionHigherStudy ;