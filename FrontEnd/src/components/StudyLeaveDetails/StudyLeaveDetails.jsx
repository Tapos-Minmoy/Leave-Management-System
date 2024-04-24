import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function StudyLeaveDetails({ leaveId }) {
  const [formData, setFormData] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const location = useLocation();
  const leave_id = location.state.id;
  console.log("In study Leave Details");
  console.log(leave_id);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      const linkadd =
        "http://localhost:8080/study_leave_application/" + leave_id;

      try {
        const response = await axios.get(linkadd);
        console.log(response.data);
        setFormData(response.data);
        if (response.data.attachedFile) {
          setAttachmentUrl(
            `http://localhost:8080/${response.data.attachedFile}`
          );
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
      }
    };

    fetchLeaveDetails();
  }, []);

  useEffect(() => {
    console.log("formData");
    console.log(formData);
  }, [formData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
  
  const downloadAttachment = () => {
    // Implement the logic to download the attachment file
    // You can use the attachmentUrl state variable to get the URL of the attachment
    // For example:
    window.open(attachmentUrl, "_blank");
  };

  return (
    <div>
      {formData && (
        <div className="form-container">
          <div className="header">
            <h2>University of Chittagong</h2>
            <h3>(Only for Study Leave Application)</h3>
            <p>
              <strong>
                (No application except in this prescribed form be considered)
              </strong>
            </p>
          </div>
          <form className="leave-form">
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="name_of_program">1. Name of Program:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name_of_program"
                  name="name_of_program"
                  value={formData.name_of_program}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="destination">
                  2. Destination University / Organization Name:
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="department">3. Destination Department:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="duration">4. Program Duration (Years):</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="destination_country">
                  5. Destination Country:
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="destination_country"
                  name="destination_country"
                  value={formData.destination_country}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="financial_source">6. Financial Source:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="financial_source"
                  name="financial_source"
                  value={formData.financial_source}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="joining_date">
                  7. Date of joining (this university):
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="joining_date"
                  name="joining_date"
                  value={formatDate(formData.joining_date)}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="leave_start_date">8. Leave Start Date:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="leave_start_date"
                  name="leave_start_date"
                  value={formatDate(formData.leave_start_date)}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="program_start_date">
                  9. Program Start Date:
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="program_start_date"
                  name="program_start_date"
                  value={formatDate(formData.program_start_date)}
                  disabled
                  style={{ border: "none" }} // Remove border from disabled input fields
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudyLeaveDetails;
