import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import capImage from "../images/cap.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Registrar() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leave/evaluates/study/ApplicationToRegistrar", {
          params: {
            evaluation_type: "Registrar Primary Approval",
            evaluation_type2: "Registrar Secondary Approval", 
            evaluation_type3: "Registrar Final Approval",
            le_status: "pending", // Replace with your le_status value
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openStudyLeaveFormPage = (leaveId, evaluation_type) => {
    navigate('/noc/studyLeaveDetailsForRegistrar', { state: { id: leaveId, evaluation_type: evaluation_type } });
  };

  const openOtherLeaveFormPage = (leaveId, evaluation_type) => {
    console.log("From previous pg (Other Leave) " + leaveId);
    navigate('/noc/otherLeaveDetailsForRegistrar', { state: { id: leaveId, evaluation_type: evaluation_type } });
  };

  const openStudyLeaveProgress = (leaveId) => {
    console.log("From progress pg (Study Leave) " + leaveId);
    navigate('/noc/progressBar', { state: { id: leaveId } });
  };

  const openOtherLeaveProgress = (leaveId) => {
    console.log("From progress pg (Other Leave) " + leaveId);
    navigate('/other-leave-progress', { state: { id: leaveId } });
  };
  return (
    <div className="overflow-y-hidden">
      <div className="h-screen flex justify-center bg-white max-md:px-5 mt-10">
        <div className="flex flex-col w-full max-w-[1123px] max-md:mt-10 max-md:max-w-full">
          {/* Button Container */}
          <div className="flex justify-end mb-5">
            <button
              onClick={() => navigate('/noc/leaveApplication')}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              My Leave
            </button>
          </div>
          
          {/* Header */}
          <div className="self-center text-4xl font-bold leading-9 text-center text-black max-md:max-w-full">
            Applications For Registrar Approval
          </div>
          
          {/* Dropdown and checkboxes */}
          <div className="flex justify ml-5 gap-5 mt-9">
            <Dropdown label="All Leaves">
              <div className="flex gap-1 justify-between items-center p-2.5 tracking-normal bg-white">
                <Dropdown.Item>Study Leave</Dropdown.Item>
                <FontAwesomeIcon
                  className="cursor-pointer hover:text-blue-500"
                  icon={faCheck}
                />
              </div>
              <div className="flex gap-1 justify-center items-center p-2.5 tracking-normal bg-white">
                <Dropdown.Item>Other Leaves</Dropdown.Item>
                <FontAwesomeIcon
                  className="cursor-pointer hover:text-blue-500"
                  icon={faCheck}
                />
              </div>
            </Dropdown>
          </div>

          {/* code for table */}
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Categories</th>
                <th className="border border-gray-200 px-4 py-2">Leave Type Details</th>
                <th className="border border-gray-200 px-4 py-2">Progress Summary</th>
                <th className="border border-gray-200 px-4 py-2">See Applications</th>
                <th className="border border-gray-200 px-4 py-2">See Progress</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map(application => (
                <tr key={application.leave_id}>
                  <td className="border border-gray-200 px-4 py-2">
                    <div>
                      <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
                        <img
                          className="w-5 h-5 rounded-full shadow-lg"
                          src={
                            ["Casual Leave", "Maternity Leave", "Medical Leave", "Earned Leave", "Special Disability Leave", "Duty Leave", "Leave on Deputation", "Quarantine Leave"].includes(application.Leave_Type_Details)
                              ? capImage // Replace with a suitable image for other leaves
                              : capImage // Default image for study leave
                          }
                          alt="Leave type image"
                        />
                        <div className="grow my-auto">
                          {["Casual Leave", "Maternity Leave", "Medical Leave", "Earned Leave", "Special Disability Leave", "Duty Leave", "Leave on Deputation", "Quarantine Leave"].includes(application.Leave_Type_Details)
                            ? "Other Leave Application"
                            : "Study Leave Application"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{application.Leave_Type_Details}</td>
                  <td className="border border-gray-200 px-4 py-2">{application.evaluation_type +" (" + application.le_status + ")"}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex gap-2.5 justify-between items-center p-2.5 mt-2 tracking-normal bg-white">
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-blue-500"
                        icon={faPenToSquare}
                      />
                      <a
                        className="grow my-auto cursor-pointer hover:text-blue-500"
                        onClick={() => ["Casual Leave", "Maternity Leave", "Medical Leave", "Earned Leave", "Special Disability Leave", "Duty Leave", "Leave on Deputation", "Quarantine Leave"].includes(application.Leave_Type_Details) ? openOtherLeaveFormPage(application.leave_id , application.evaluation_type) : openStudyLeaveFormPage(application.leave_id, application.evaluation_type)}
                      >
                        Click here
                      </a>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <a
                      className="underline grow my-auto cursor-pointer hover:text-blue-500"
                      onClick={() => ["Casual Leave", "Maternity Leave", "Medical Leave", "Earned Leave", "Special Disability Leave", "Duty Leave", "Leave on Deputation", "Quarantine Leave"].includes(application.Leave_Type_Details) ? openOtherLeaveProgress(application.leave_id) : openStudyLeaveProgress(application.leave_id)}
                    >
                      Detailed progress
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
