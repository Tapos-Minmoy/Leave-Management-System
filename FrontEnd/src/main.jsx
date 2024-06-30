import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import LeaveApplication from './components/LeaveApplication/LeaveApplication.jsx';
import Notices from './components/Notices/Notices.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import OtherLeaveForm from './components/OtherLeaveForm/OtherLeaveForm.jsx';
import PreviousLeave from './components/PreviousLeave/PreviousLeave.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar';
import StudyLeaveForm from './components/StudyLeaveForm/StudyLeaveForm.jsx';
import StudyLeaveDetails from './components/StudyLeaveDetails/StudyLeaveDetails.jsx';
import Chaiman from './components/Chaiman/Chaiman.jsx'
import StudyLeaveDetailsForChairman from './components/study-leave-detailsForChairman/study-leave-detailsForChairman.jsx'
import Letter from './components/LetterToChaiman/LetterToChaiman.jsx';
import ImageUploader from './components/ImageUploader/ImageUploader.jsx';
import Oops from './components/Opps/Opps.jsx';
import CheckPermissionForleaveApplication from './components/ProtectedRoute/CheckPermissionForleaveApplication.jsx';
import CheckPermissionChairman from './components/ProtectedRoute/CheckPermissionChairman.jsx'
import CheckPermissionForLogin from './components/ProtectedRoute/CheckPermissionForLogin.jsx'
import CheckPermissionForstudyLeaveForm from './components/ProtectedRoute/CheckPermissionForstudyLeaveForm.jsx'

const Main = () => {
  // State to store userID
  const [userID, setUserID] = useState("jokjki0oemkJKJL4565"); // Initialize with null or default userID

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      children: [
        {
          path: '/noc/login',
          element: <CheckPermissionForLogin> 
                    <Login></Login>
          
                </CheckPermissionForLogin>,
        },
        {
          path: '/noc/forgotPassword',
          element: <ForgotPassword></ForgotPassword>,
        },
        {
          path: '/noc/signUp',
          element: <SignUp></SignUp>,
        },
        {
          path: '/noc/otherLeaveForm',
          element: <OtherLeaveForm userID={userID}></OtherLeaveForm>,
        },
        {
          path: '/noc/leaveApplication',
          element: <CheckPermissionForleaveApplication>  
                      <LeaveApplication></LeaveApplication>
                </CheckPermissionForleaveApplication>,
                      
        },
        {
          path: '/noc/previousLeave',
          element: <PreviousLeave></PreviousLeave>,
        },
        {
          path: '/noc/AssignToDepartments',
          element: <Notices></Notices>,
        },
        {
          path: '/noc/progressBar',
          element: <ProgressBar></ProgressBar>
        },
        {
          path: '/noc/studyLeaveForm',
          element: <CheckPermissionForstudyLeaveForm>
                    <StudyLeaveForm></StudyLeaveForm>
                 </CheckPermissionForstudyLeaveForm>,
        },
        {
          path: '/study-leave-details',
          element: <StudyLeaveDetails ></StudyLeaveDetails>,
        },
        {
          path: '/noc/chairman',
          element: <CheckPermissionChairman>
                      <Chaiman></Chaiman>
                  </CheckPermissionChairman>,
        },
        {
          path: '/noc/chairman/study-leave-details',
          element: <StudyLeaveDetailsForChairman></StudyLeaveDetailsForChairman>
        },
        {
          path: '/noc/LetterToChaiman',
          element: <Letter></Letter>
        },
        {
          path: '/noc/oops',
          element: <Oops></Oops>
        },
        {
          path: '/noc/imageUploader',
          element: <ImageUploader></ImageUploader>
        }
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
