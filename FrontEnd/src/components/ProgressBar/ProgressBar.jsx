import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios
import { useLocation } from "react-router-dom";
//take leave id from location state
const ProgressBar = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);  // Define setError
  const [loading, setLoading] = useState(true);  // Define setLoading
  const location = useLocation();
  const [leaveId, setLeaveId] = useState(location.state?.id || null);
  useEffect(() => {
    if (location.state?.leave_id) {
      console.log('Setting leaveId from location:', location.state.id);
      setLeaveId(location.state.id );
    }
  }, [location.state]);
  useEffect(() => {
     if(!leaveId)return ;
     console.log(leaveId);
    const fetchData = async () => {
   //   if(!leaveId)return ;
      try {
        const response = await axios.get("http://localhost:5000/api/leave/evaluates/study/latest", {
          params: {
            leave_id: leaveId
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);  // Set loading to false after data is fetched or error occurs
      }
    };

    fetchData();
  }, [leaveId]);
  const approvalStages = [
    "Chairman Approval",
    "Registrar Approval",
    "Higher Study Branch Primary Approval",
    "Registrar Secondary Approval",
    "VC Approval",
    "Registrar Final Approval",
    "Higher Study Branch Final Approval"
  ];

  const [ok, setOk] = useState(1);
  let currentStageIndex = -1;

  if (data) {
    console.log(data);
    console.log(data.leave_id);
  }
  for (let i = 0; i < 7; i++) {
    // console.log(approvalStages[i]);
  }
  let stageName = 'nai';
  let leStatus = 'pending';
  if (data) stageName = data.evaluation_type, leStatus = data.le_status;
  let stageNum = -1;
  for (let i = 0; i < 7; i++) {
    if (approvalStages[i] == stageName)
      stageNum = i;
  }
  console.log(data);
  console.log(stageName);
  console.log(stageNum);
  const status = [2, 2, 2, 2, 2, 2, 2];
  for (let i = 0; i < 7; i++) {
    if (i < stageNum) status[i] = 0;
    if (i == stageNum) status[i] = 1;
    if (leStatus == 'approved') status[i] = 0;
  }

  console.log(status);
  return (
    <>
      {/* Color balls */}
      <section className="fixed inset-y-0 left-20">
        <div className="h-full flex flex-col items-center justify-center">
          <button className="mb-4 p-2 rounded-full focus:bg-red-500 focus:outline-none" aria-label="Not Done">
            <div className="rounded-full h-8 w-8 bg-red-600"></div>
            <span className="text-sm font-medium text-red-600">Not Done</span>
          </button>
          <button className="mb-4 p-2 rounded-full focus:bg-green-500 focus:outline-none" aria-label="Approved">
            <div className="rounded-full h-8 w-8 bg-green-600"></div>
            <span className="text-sm font-medium text-green-600">Approved</span>
          </button>
          <button className="p-2 rounded-full focus:bg-yellow-500 focus:outline-none" aria-label="Processing">
            <div className="rounded-full h-8 w-8 bg-yellow-300"></div>
            <span className="text-sm font-medium text-yellow-500">Processing</span>
          </button>
        </div>
      </section>
      {/* Progress bar */}
      <section className="text-gray-600 body-font">
        <div className="container mt-8 mb-12 px-5 py-24 mx-auto flex flex-wrap bg-sky-50 h-5/10 w-2/5 rounded-lg drop-shadow-2xl">
          {/* Step 1 */}
          <div className="flex relative pt-5 pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[0] === 0 ? 'bg-green-500' : status[0] === 1 ? 'bg-yellow-500' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[0] === 0 ? 'bg-green-500' : status[0] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>1</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-12 h-12"><path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Department Chairman CU</h2>
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[1] === 0 ? 'bg-green-500' : status[1] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[1] === 0 ? 'bg-green-500' : status[1] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>2</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-12 h-12">
                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Registrar Primary Approval</h2>
              </div>
            </div>
          </div>
          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[2] === 0 ? 'bg-green-500' : status[2] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[2] === 0 ? 'bg-green-500' : status[2] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>3</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-12 h-12">
                  <path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z" />
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Higher Study Branch CU Primary Approval</h2>
              </div>
            </div>
          </div>



          {/*<div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className={`h-full w-1 ${status[3] === 0 ? 'bg-green-500' : status[3] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[3] === 0 ? 'bg-green-500' : status[3] === 1 ? 'bg-yellow-400' : 'bg-indigo-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>1</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-12 h-12"><path d="M128 0c-13.3 0-24 10.7-24 24V142.1L81 119c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23V24c0-13.3-10.7-24-24-24zM344 200a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zM168 296a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm312 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM184 441.5l26.9 49.9c6.3 11.7 20.8 16 32.5 9.8s16-20.8 9.8-32.5l-36.3-67.5c1.7-1.7 3.2-3.6 4.3-5.8L248 345.5V400c0 17.7 14.3 32 32 32h48c17.7 0 32-14.3 32-32V345.5l26.9 49.9c1.2 2.2 2.6 4.1 4.3 5.8l-36.3 67.5c-6.3 11.7-1.9 26.2 9.8 32.5s26.2 1.9 32.5-9.8L424 441.5V480c0 17.7 14.3 32 32 32h48c17.7 0 32-14.3 32-32V441.5l26.9 49.9c6.3 11.7 20.8 16 32.5 9.8s16-20.8 9.8-32.5l-37.9-70.3c-15.3-28.5-45.1-46.3-77.5-46.3H470.2c-16.3 0-31.9 4.5-45.4 12.6l-33.6-62.3c-15.3-28.5-45.1-46.3-77.5-46.3H294.2c-32.4 0-62.1 17.8-77.5 46.3l-33.6 62.3c-13.5-8.1-29.1-12.6-45.4-12.6H118.2c-32.4 0-62.1 17.8-77.5 46.3L2.9 468.6c-6.3 11.7-1.9 26.2 9.8 32.5s26.2 1.9 32.5-9.8L72 441.5V480c0 17.7 14.3 32 32 32h48c17.7 0 32-14.3 32-32V441.5zM399 153l64 64c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V142.1l-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Assigned To Different Department CU</h2>
              </div>
            </div>
          </div>*/}


          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[3] === 0 ? 'bg-green-500' : status[3] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[3] === 0 ? 'bg-green-500' : status[3] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>4</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-10 h-10"><path d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Registrar Secondary Approval</h2>
              </div>
            </div>
          </div>

          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[4] === 0 ? 'bg-green-500' : status[4] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[4] === 0 ? 'bg-green-500' : status[4] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>5</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-12 h-12"><path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Vice Chancellor Office</h2>
              </div>
            </div>
          </div>
          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[5] === 0 ? 'bg-green-500' : status[5] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[5] === 0 ? 'bg-green-500' : status[5] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>6</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-10 h-10"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Registrar Final Approval</h2>
              </div>
            </div>
          </div>

          <div className="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className={`h-full w-1 ${status[6] === 0 ? 'bg-green-500' : status[6] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none`}></div>
            </div>
            <div className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${status[6] === 0 ? 'bg-green-500' : status[6] === 1 ? 'bg-yellow-400' : 'bg-red-500'} pointer-events-none text-white relative z-10 title-font font-medium text-sm`}>7</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-12 h-12"><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" /></svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-0 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Higher Study Branch CU Final Approval</h2>
              </div>
            </div>
          </div>
          {/* Steps 3-8 */}
          {/* Same structure as Step 2 */}
        </div>
      </section>
    </>
  );
}

export default ProgressBar;
