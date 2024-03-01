import React from 'react';
import capImage from '../images/cap.png';
import processingImage from '../images/color_processing.webp';
import leaveImage from '../images/leave.png';
import './Instruction.css';
function Instructions() {
  const openFormPage = () => {
    // Logic to open the form page
    console.log("Opening form page...");
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-500 h-screen">
      <div>
        <h2 className="text-center text-xl font-bold p-2 m-5">Application Form</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-5 ms-auto mx-20 px-5">
        <div className="application-section w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#" onClick={openFormPage} className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={capImage} alt="Cap image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Study leave Application</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Apply</span>
          </a>
        </div>

        {/* Demo Application */}
        <div className="application-section w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#" onClick={openFormPage} className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={processingImage} alt="Cap image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Demo Application</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Apply</span>
          </a>
        </div>
        <div className="application-section w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#" onClick={openFormPage} className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={processingImage} alt="Cap image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Demo Application</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Apply</span>
          </a>
        </div>
        <div className="application-section w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#" onClick={openFormPage} className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={processingImage} alt="Cap image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Demo Application</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Apply</span>
          </a>
        </div>
       

        {/* Repeat for other Demo Application sections */}

      </div>

      <div>
        <h2 className="text-center text-xl font-bold p-2 m-5">Application Update</h2>
      </div>

      {/* Study Leave Application Update */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-start-2 col-span-4">
          <a href="#" className="block w-9/10 p-2 bg-gradient-to-r from-blue-500 to-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex flex-row justify-between items-center">
              <img className="w-8 h-8 rounded-full" src={leaveImage} alt=""/>
              <h5 className="mb-2 text-lg font-serif font-light tracking-tight text-white text-center">Study Leave Application</h5>
              <button type="button" className="text-blue-700 border border-blue-700 hover:bg-powder-blue hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
