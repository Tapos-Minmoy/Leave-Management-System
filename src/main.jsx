import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import Notices from './components/Notices/Notices.jsx';


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
        path:"/instructions",
        element: <Instructions></Instructions>
      },
      {
        path:"/notices",
        element: <Notices></Notices>
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
