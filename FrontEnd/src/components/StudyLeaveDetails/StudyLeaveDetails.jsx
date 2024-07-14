import React, { useState, useEffect } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import Letter from '../LetterToChaiman/LetterToChaiman'
import axios from "axios";

function StudyLeaveDetails() {
  const [formData, setFormData] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const leave_id = location.state.id;
  const navigate = useNavigate();
  console.log("leaveID is :"+leave_id);


  useEffect(() => {
    const fetchLeaveDetails = async () => {
      axios
        .get("http://localhost:5000/api/leave/study", {
          params: {
            leave_id: leave_id,
          },
        })
        .then((response) => {
          setFormData(response.data.data[0]);
          setAttachmentUrl(response.data.data[0]?.attachments);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
          responseType: "blob", // Important: responseType must be blob
        });

        // Create a URL to the blob
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", attachmentUrl); // Set filename for download
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
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
;
  return (
    <div>
      {formData && (
        <div className="form-container">
        <div style={{ textAlign: 'center' }}>
        <div>
            <h2 style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '24px' }}>University of Chittagong</h2>
          </div>          
          <h3 style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '20px' }}>(Only for Study Leave Application)</h3>

          <p style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '18px' }}><strong>(No application except in this prescribed form be considered)</strong></p>
        </div>
          <form className="leave-form">
          <div className="form-group mt-5">
              <div className="input-wrapper">
                <label htmlFor="application_to_chairman">Application to Chairman:</label>
              </div>
              <div className="input-wrapper">
              <button
                type="button"
                onClick={openPopup}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
              </div>
            </div>
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
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
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="signature">10. Attached Signature:</label>
              </div>
              <div className="input-wrapper">
                {formData.signature ? (
                  <img
                    src={`http://localhost:5000/files/${formData.signature}`}
                    alt="Signature"
                    style={{ maxWidth: "300px", maxHeight: "80px" }}
                  />
                ) : (
                  <p>No signature attached</p>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="attachment">11. Attached Document:</label>
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
                  <p>No document attached</p>
                )}
              </div>
            </div>
  
           {/*} <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="chairman_comment">Chairman's Comment:</label>
              </div>
              <div className="input-wrapper">
                <textarea
                  id="chairman_comment"
                  name="chairman_comment"
                  rows="4"
                  cols="50"
                  value={chairmanComment}
                  onChange={handleCommentChange}
                  placeholder="Enter comment here..."
                />
              </div>
            </div>*/}

          </form>
        </div>
      )}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <Letter leaveID={leave_id}  /> {/* Include the Letter component here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyLeaveDetails;
