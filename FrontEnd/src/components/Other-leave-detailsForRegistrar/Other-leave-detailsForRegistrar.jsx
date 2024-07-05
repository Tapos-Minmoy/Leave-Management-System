import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Letter from '../LetterToChaiman/LetterToChaiman';
import axios from "axios";

function OtherLeaveDetailsForRegistrar() {
  const [formData, setFormData] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const leave_id = location.state?.id;
  const evaluation_type = location.state?.evaluation_type;
  const navigate = useNavigate();
  const [registrarComment, setRegistrarComment] = useState("");
  var instruction = "Forward to Higher Studies";

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      if (leave_id) {
        axios
          .get("http://localhost:5000/api/leave/other", {
            params: {
              leave_id: leave_id,
            },
          })
          .then((response) => {
            console.log(response.data.data[0]);
            setFormData(response.data.data[0]);
            setAttachmentUrl(response.data.data[0]?.attachments);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };

    fetchLeaveDetails();
  }, [leave_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const downloadAttachment = async () => {
    if (attachmentUrl) {
      try {
        const response = await axios.get(`http://localhost:5000/files/${attachmentUrl}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", attachmentUrl);
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading attachment:", error);
      }
    } else {
      console.error("No attachment URL found");
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleForwardOfRegistrar = async () => {
    console.log(leave_id + " " + evaluation_type);

    if (formData) {
      const currentTime = new Date().toISOString();
      const updateData = {
        leave_id,
        evaluation_type,
        applicant_id: formData.applicant_id,
        le_comment: registrarComment,
        le_evaluation_time: currentTime,
        le_status: "approved"
      };

      

      try {
        const response = await axios.put(`http://localhost:5000/api/leave/evaluates/other/update`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        var result = response.data;
        if (result.message === "Data Updated Successfully in Other_Leave_Evaluation Table.") {
          alert("Response Successfully Submitted.");
          navigate("/noc/registrar");
        }
        
      } catch (error) {
        console.error("Error Encountered...", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleCommentChange = (event) => {
    setRegistrarComment(event.target.value);
  };

  return (
    <div>
      {formData && (
        <div className="form-container">
          <div className="header">
            <h2>University of Chittagong</h2>
            <h3>(Only for Other Leave Application)</h3>
            <p>
              <strong>
                (No application except in this prescribed form be considered)
              </strong>
            </p>
          </div>
          <form className="leave-form">
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="name">1. Name of Applicant:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="designation">2. Designation:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="nature_of_leave">3. Nature of leave applied for:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="nature_of_leave"
                  name="nature_of_leave"
                  value={formData.nature_of_leave}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="leave_start_date">4. The period for and date from which the leave is required:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="leave_start_date"
                  name="leave_start_date"
                  value={`${formData.duration} `}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="permissionToLeaveStation">5. Whether permission to leave the station is required:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="permissionToLeaveStation"
                  name="permissionToLeaveStation"
                  value={formData.station_leaving_permission}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="groundsForLeave">6. Grounds for leave:</label>
              </div>
              <div className="input-wrapper">
                <textarea
                  id="groundsForLeave"
                  name="groundsForLeave"
                  value={formData.leave_ground
                  }
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="refundUndertaking">7. I undertake to refund the difference between the leave salary and other allowances admissible during leave:</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="checkbox"
                  id="refundUndertaking"
                  name="refundUndertaking"
                  checked={formData.
                    salary_acknowledgement === 1}
                  disabled
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="additionalFile">8. Uploaded file (if any):</label>
              </div>
              <div className="input-wrapper">
                {attachmentUrl ? (
                  <button
                    type="button"
                    onClick={downloadAttachment}
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Download Attachment
                  </button>
                ) : (
                  <p>No attachment found</p>
                )}
              </div>
            </div>
            
            
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="registrarComment">9. Comment of the Registrar:</label>
              </div>
              <div className="input-wrapper">
                <textarea
                  id="registrarComment"
                  name="registrarComment"
                  value={registrarComment}
                  onChange={handleCommentChange}
                />
              </div>
            </div>
          </form>
          <div className="button-container">
            <button className="forward-button" onClick={handleForwardOfRegistrar}>Approve Leave</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default OtherLeaveDetailsForRegistrar;
