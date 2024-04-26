import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import capImage from "../images/cap.png";
import processingImage from "../images/color_processing.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PreviousLeave() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leave/study", {
        params: {
          applicant_id: "1f0c4c07-e70c-11ee-9dff-68f728f17b7e",
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const openFormPage = (leaveId) => {
    console.log("From previous pg" + leaveId);
    navigate('/study-leave-details', { state: { id: leaveId } });
  };
  return (
    <div className="overflow-y-hidden">
      <div className="h-screen flex justify-center items-center  bg-white max-md:px-5">
        <div className=" flex flex-col w-full max-w-[1123px] max-md:mt-10 max-md:max-w-full">
          {/* code for header */}
          <div className="self-center text-4xl font-bold leading-9 text-center text-black max-md:max-w-full">
            Previous Application Details
          </div>

          {/* code for dropdown 
          <div className='flex justify-start mt-6'>

            <Dropdown label="All Leaves" dismissOnClick={false}>
              <div className="flex gap-1 justify-between items-center p-2.5 tracking-normal bg-white">
                <Dropdown.Item>Study Leave</Dropdown.Item>
                <FontAwesomeIcon className='cursor-pointer hover:text-blue-500' icon={faCheck} />
              </div>
              <div className="flex gap-1 justify-center items-center p-2.5 tracking-normal bg-white">
                <Dropdown.Item>Other Leaves</Dropdown.Item>
                <FontAwesomeIcon className='cursor-pointer hover:text-blue-500' icon={faCheck} />
              </div>
            </Dropdown>

          </div>*/}

          {/* code for checkboxes */}
          <div className="flex justify-end gap-5 mt-9">
            <Dropdown label="All Leaves" >
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
            <div class="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pending{" "}
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Active{" "}
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Rejected{" "}
              </label>
            </div>
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
                          src={capImage}
                          alt="Cap image"
                        />
                        <div className="grow my-auto">Study Leave Application</div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{application.name_of_program}</td>
                  <td className="border border-gray-200 px-4 py-2">{/* Progress Summary Data Here */}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex gap-2.5 justify-between items-center p-2.5 mt-2 tracking-normal bg-white">
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-blue-500"
                        icon={faPenToSquare}
                      />
                      <a
                        className="grow my-auto cursor-pointer hover:text-blue-500"
                        onClick={() => openFormPage(application.leave_id)}
                      >
                        Click here
                      </a>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link
                      to="/noc/progressBar"
                      className="underline grow my-auto cursor-pointer hover:text-blue-500"
                    >
                      Detailed progress
                    </Link>
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

export default PreviousLeave;