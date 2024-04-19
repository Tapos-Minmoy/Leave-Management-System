import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Application from './components/Application/Application.jsx';
import Notices from './components/Notices/Notices.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import StudyForm from './components/StudyForm/StudyForm.jsx';
import PreviousLeave from './components/PreviousLeave/PreviousLeave.jsx';

const Main = () => {
  // State to store userID
  const [userID, setUserID] = useState(null); // Initialize with null or default userID

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      children: [
        {
          path: '/login',
          element: <Login></Login>,
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword></ForgotPassword>,
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>,
        },
        {
          path: '/noc/leaveApplication',
          element: <Application userID={userID}></Application>, // Pass userID here
        },
        {
          path: '/studyForm',
          element: <StudyForm></StudyForm>,
        },
        {
          path: '/previousLeave',
          element: <PreviousLeave></PreviousLeave>,
        },
        {
          path: '/notices',
          element: <Notices></Notices>,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
