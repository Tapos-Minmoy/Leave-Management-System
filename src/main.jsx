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
import OtherLeaveForm from './components/OtherLeaveForm/OtherLeaveForm.jsx';
import PreviousLeave from './components/PreviousLeave/PreviousLeave.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar';

const Main = () => {
  // State to store userID
  const [userID, setUserID] = useState("jokjki0oemkJKJL4565"); // Initialize with null or default userID

<<<<<<< HEAD
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path:"/login",
        element: <Login></Login>
      },
      {
        path:"/forgotPassword",
        element: <ForgotPassword></ForgotPassword>
      },
      {
        path:"/signUp",
        element: <SignUp></SignUp>
      },
      {
        path:"/instructions",
        element: <Instructions></Instructions>
      },
      {
        path:"/studyForm",
        element: <StudyForm></StudyForm>
      },
      {
        path:"/previousLeave",
        element: <PreviousLeave></PreviousLeave>
      },
      {
        path:"/notices",
        element: <Notices></Notices>
      },
      {
        path:"/progressBar",
        element: <ProgressBar></ProgressBar>
      },
    ]
  },
]);
=======
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
          path: '/noc/otherLeaveForm',
          element: <OtherLeaveForm></OtherLeaveForm>,
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
>>>>>>> 5e631b37d1774ba94b6703420c8b829b5cba53fb

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
