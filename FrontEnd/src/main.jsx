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
import StudyLeaveDetailsForChairman from './components/studyLeaveDetailsToChiarman/studyLeaveDetailsToChiarman.jsx';
import StudyLeaveDetailsForRegistrar from './components/study-leave-detailsForRegistrar/study-leave-detailsForRegistrar.jsx';
import OtherLeaveDetailsForRegistrar from './components/Other-leave-detailsForRegistrar/Other-leave-detailsForRegistrar.jsx';
import Letter from './components/LetterToChaiman/LetterToChaiman.jsx';
import ImageUploader from './components/ImageUploader/ImageUploader.jsx';
import Oops from './components/Opps/Opps.jsx';
import CheckPermissionForleaveApplication from './components/ProtectedRoute/CheckPermissionForleaveApplication.jsx';
import CheckPermissionChairman from './components/ProtectedRoute/CheckPermissionChairman.jsx'
import CheckPermissionForLogin from './components/ProtectedRoute/CheckPermissionForLogin.jsx'
import CheckPermissionForstudyLeaveForm from './components/ProtectedRoute/CheckPermissionForstudyLeaveForm.jsx'
import FinalLetter from './components/FinalLetter/FinalLetter.jsx';
import OtherLeaveDetailsForChairman from './components/OtherLeaveDetailsForChairman/OtherLeaveDetailsForChairman.jsx';
import OtherLeaveDetails from './components/OtherLeaveDetails/OtherLeaveDetails.jsx';

import OtherProgressBar from './components/ProgressBar/OtherLeaveProgress.jsx';
import HigherStudy from './components/HigherStudy/higherStudy.jsx';
import FinalOtherLeaveLetter from './components/FinalOtherLeaveLetter/FinalOtherLeaveLetter.jsx';

import Registrar from './components/Registrar/registrar.jsx'
import StudyLeaveDetailsForHigherPrimary from './components/HigherStudyLeaveDetails/higherPrimary.jsx';
import LetterToRegistrar from './components/LetterToRegistrar/LetterToRegistrar';
import Vc from './components/VC/Vc.jsx';
import StudyLeaveDetailsVC from './components/StudyLeaveDetailsVC/studyLeaveDetailsVc.jsx';
import CheckPermissionVC from './components/ProtectedRoute/CheckPermissionVC.jsx';
import CheckPermissionHigherStudy from './components/ProtectedRoute/CheckPermissionHigherStudy.jsx';
import CheckPermissionRegistrar from './components/ProtectedRoute/CheckPermissionRegistrar.jsx';
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
          path: '/OtherLeave/progressBar',
          element: <OtherProgressBar></ OtherProgressBar>
        },
        {
          path: '/noc/OtherLeaveProgressBar',
          element: <OtherProgressBar></OtherProgressBar>
        },
        {
          path: '/noc/studyLeaveForm',
          element: <CheckPermissionForstudyLeaveForm>
                    <StudyLeaveForm></StudyLeaveForm>
                 </CheckPermissionForstudyLeaveForm>,
        },
        {
          path: '/noc/studyLeaveDetailsToChariman',
          element: <StudyLeaveDetailsForChairman></StudyLeaveDetailsForChairman>,
        },
        {
          path: '/noc/studyLeaveDetailsToHigherPrimary',
          element: <StudyLeaveDetailsForHigherPrimary></StudyLeaveDetailsForHigherPrimary>,
        },
        {
          path: '/noc/studyLeaveDetailsForRegistrar',
          element: <StudyLeaveDetailsForRegistrar></StudyLeaveDetailsForRegistrar>,
        },
        {
          path:'/noc/letterToRegistrar',
          element:<LetterToRegistrar></LetterToRegistrar>
        },
        {
          path:'/noc/finalOtherLeaveLetter',
          element:<FinalOtherLeaveLetter></FinalOtherLeaveLetter>
        },
        {
          path: '/noc/otherLeaveDetailsForRegistrar',
          element: <OtherLeaveDetailsForRegistrar></OtherLeaveDetailsForRegistrar>,
        },
        {
          path: '/noc/otherLeaveDetailsForChairman',
          element: <OtherLeaveDetailsForChairman></OtherLeaveDetailsForChairman>
        },
        {
          path: '/noc/chairman',
          element: <CheckPermissionChairman>
                      <Chaiman></Chaiman>
                  </CheckPermissionChairman>,
        },
        {
          path: '/noc/HigherStudyBranch',
          element: <CheckPermissionHigherStudy>
                  <HigherStudy></HigherStudy>
                </CheckPermissionHigherStudy>
         
        },
        {
          path: '/noc/VC',
          element: <CheckPermissionVC>
                 <Vc></Vc>
                </CheckPermissionVC>
          
        },
        {
          path: '/noc/studyLeaveDetailsToVC',
          element: <StudyLeaveDetailsVC></StudyLeaveDetailsVC>
        },
        {
          path: '/noc/LetterToChaiman',
          element: <Letter></Letter>
        },
        {
          path: '/noc/FinalLetter',
          element: <FinalLetter></FinalLetter>
        },
        {
          path: '/noc/oops',
          element: <Oops></Oops>
        },
        {
          path: '/noc/registrar',
          element: <CheckPermissionRegistrar>
                <Registrar></Registrar>
          </CheckPermissionRegistrar>
          
        },
        {
          path: '/noc/imageUploader',
          element: <ImageUploader></ImageUploader>
        },{
          path: '/noc/studyLeaveDetails',
          element: <StudyLeaveDetails></StudyLeaveDetails>
        },{
          path: '/noc/otherLeaveDetails',
          element: <OtherLeaveDetails></OtherLeaveDetails>          
        },{
            path: '',
            element: <CheckPermissionForLogin> 
                      <Login></Login>
            
                  </CheckPermissionForLogin>,
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
