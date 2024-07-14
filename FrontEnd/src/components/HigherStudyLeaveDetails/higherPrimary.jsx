import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Letter from '../LetterToChaiman/LetterToChaiman';
import axios from "axios";

function StudyLeaveDetailsForHigherPrimary() {
    const [formData, setFormData] = useState(null);
    const [attachmentUrl, setAttachmentUrl] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation();
    const leave_id = location.state?.id;
    const evaluation_type = location.state?.evaluation_type;
    const navigate = useNavigate();
    const [registrarComment, setRegistrarComment] = useState("");
    var instruction =
        evaluation_type === "Higher Study Branch Primary Approval" ? "Forward To Register" : "Final Approval";

    useEffect(() => {
        const fetchLeaveDetails = async () => {
            if (leave_id) {
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

    const handleForwardOfHigherPrimary= async (e) => {
        e.preventDefault();
        if (formData) {
          const currentTime = new Date().toISOString();
          const updateData = {
            leave_id,
            evaluation_type,
            applicant_id: formData.applicant_id,
            le_comment:registrarComment, // Correct reference to chairmanComment
            le_evaluation_time: currentTime,
            le_status: "approved",
          };
    
          
 var evaluation_type_update;
 if (evaluation_type === "Higher Study Branch Primary Approval") evaluation_type_update = "Registrar Secondary Approval"
 else if (evaluation_type === "Higher Study Branch Final Approval") evaluation_type_update = "nothing"
    
          try {
            const response = await axios.put(
              `http://localhost:5000/api/leave/evaluates/study/update`,
              updateData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            var result = response.data;
            if (result.message === "Data Updated Successfully in Study_Leave_Evaluation Table.") {
              try {
                const currentTime2 = new Date(new Date().getTime() + 2000).toISOString(); // Adding 2000 millisecond or 2sec
    
                const addData = {
                  leave_id,
                  evaluation_type: evaluation_type_update ,
                  applicant_id: formData.applicant_id,
                  le_comment: "",
                  le_evaluation_time: currentTime2,
                  le_status: "pending",
                };
          
                const response2 = await axios.post(
                  `http://localhost:5000/api/leave/evaluates/study/add`,
                  addData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                result = response2.data;
              } catch (error) {
                console.error("Error Encountered...", error);
                alert("An error occurred. Please try again.");
              }
            }
              navigate("/noc/HigherStudyBranch");
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
                        <div className="form-group">
                            <div className="input-wrapper">
                                <label htmlFor="application_to_chairman">12. Application to Chairman:</label>
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
                                <label htmlFor="registrar_comment">Higher Study Branch's Comment:</label>
                            </div>
                            <div className="input-wrapper">
                                <textarea
                                    id="registrar_comment"
                                    name="registrar_comment"
                                    rows="4"
                                    cols="50"
                                    value={registrarComment}
                                    onChange={handleCommentChange}
                                    placeholder="Enter comment here..."
                                />
                            </div>
                        </div>
                        <div className='cancel-submit-btn'>
                            <button className='cancel-btn'>Cancel</button>
                            <button  onClick={handleForwardOfHigherPrimary}>{instruction}</button>
                        </div>
                    </form>
                </div>
            )}
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={closePopup}>
                            &times;
                        </button>
                        <Letter /> {/* Include the Letter component here */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudyLeaveDetailsForHigherPrimary;
