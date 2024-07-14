import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios
import { useLocation } from "react-router-dom";
//take leave id from location state
const  OtherProgressBar = () => {
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
    const fetchData = async () => {
   //   if(!leaveId)return ;
      try {
        const response = await axios.get("http://localhost:5000/api/leave/evaluates/other/latest", {
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
  ];

  const [ok, setOk] = useState(1);
  let currentStageIndex = -1;

  for (let i = 0; i < 2; i++) {
    // console.log(approvalStages[i]);
  }
  let stageName = 'nai';
  let leStatus = 'pending';
  if (data) stageName = data.evaluation_type, leStatus = data.le_status;
  let stageNum = -1;
  for (let i = 0; i < 2; i++) {
    if (approvalStages[i] == stageName)
      stageNum = i;
  }
  console.log(data);
  console.log(stageName);
  console.log(stageNum);
  const status = [2, 2];
  for (let i = 0; i < 2; i++) {
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
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Registrar Approval</h2>
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

export default OtherProgressBar;
