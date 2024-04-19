import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import Notices from './components/Notices/Notices.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import StudyForm from './components/StudyForm/StudyForm.jsx';
import PreviousLeave from './components/PreviousLeave/PreviousLeave.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar';


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



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
