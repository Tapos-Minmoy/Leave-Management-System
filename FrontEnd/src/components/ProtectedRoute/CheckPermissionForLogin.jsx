import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CheckPermissionForLogin = ({ children }) => {
    const userID = Cookies.get('role_user_id') || '';
    console.log(userID);

  if (userID) {
    const userRole = Cookies.get('role_role')
    if(userRole==='chairman')  return  <Navigate to="/noc/chairman" />;
    else if (userRole === "register") return  <Navigate to="/noc/registrar" />;
    else if(userRole === "vice_chancellor") return  <Navigate to="/noc/VC" />;
    else if (userRole === "Higher Study Branch") return  <Navigate to="/noc/HigherStudyBranch"/>;
    else return  <Navigate to="/noc/leaveApplication"/>; // Adjust the route as necessary
  }
 
  return children;
};

export default CheckPermissionForLogin;