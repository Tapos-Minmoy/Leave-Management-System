import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './OtherLeaveForm.css';

function OtherLeaveForm({ userID }) {
  const navigate = useNavigate();
  const [signatureFile, setSignatureFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    natureOfLeave: '',
    leaveStartDate: '',
    periodYears: '',
    periodMonths: '',
    periodDays: '',
    permissionToLeaveStation: '',
    groundsForLeave: '',
    refundUndertaking: 0,
    additionalFile: null,
    signature: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith('image/')) {
        alert('Please upload an image file for the signature.');
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width <= 300 && height <= 80) {
            setSignatureFile(file);
          } else {
            alert('Please upload an image with dimensions up to 300px width and 80px height for the signature.');
          }
        };
      };

      reader.readAsDataURL(file);
      setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    }
  };

  const handleSignatureRemove = () => {
    setSignatureFile(null);
  };

  const handleFileUploadToServer = async (file) => {
    if (!file) {
      alert("Please select a file to upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("items", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedFileName = response.data.files[0].filename;

      return uploadedFileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user_id = Cookies.get('user_user_id');
      if (!user_id) {
        alert("Please Logout and login again! Cookies missing...");
        return;
      }

      const currentDate = new Date();
      const year = String(currentDate.getFullYear());
      const month = String(currentDate.getMonth()).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;


      const duration = `${formData.periodYears}-${formData.periodMonths.padStart(2, '0')}-${formData.periodDays.padStart(2, '0')}`;

      const formDataToSend = {
        applicant_id: user_id,
        applied_date: formattedDate,
        designation: formData.designation,
        nature_of_leave: formData.natureOfLeave,
        leave_start_date: formData.leaveStartDate,
        leave_ground: formData.groundsForLeave,
        salary_acknowledgement: formData.refundUndertaking,
        station_leaving_permission: formData.permissionToLeaveStation,
        attachments: null,
        signature: null,
        duration: duration,
        final_application: null, // Not captured in the form
        my_application_chairman: null, // Not captured in the form
      };

      if (formData.additionalFile) {
        const uploadedAdditionalFile = await handleFileUploadToServer(formData.additionalFile);
        formDataToSend.attachments = uploadedAdditionalFile;
      }

      if (signatureFile) {
        const uploadedSignature = await handleFileUploadToServer(signatureFile);
        formDataToSend.signature = uploadedSignature;
      }

      const response = await axios.post('http://localhost:5000/api/leave/other/add', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      navigate('/noc/leaveApplication');
    } catch (error) {
      alert("Something went wrong. Try again!");
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="header">
          <h2>University of Chittagong</h2>
          <h3>Form of Application of Leave (other than study leave)</h3>
          <p><strong>(No leave application except in this prescribed form be considered)</strong></p>
        </div>
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="name">1. Name of Applicant:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="designation">2. Designation:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="natureOfLeave">3. Nature of leave applied for:</label>
            </div>
            <div className="input-wrapper">
              <select id="natureOfLeave" name="natureOfLeave" value={formData.natureOfLeave} onChange={handleChange} className="full-width-select">
                <option value="">Select</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Special Disability Leave">Special Disability Leave</option>
                <option value="Duty Leave">Duty Leave</option>
                <option value="Leave on Deputation">Leave on Deputation</option>
                <option value="Quarantine Leave">Quarantine Leave</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="period">4. The period for and date from which the leave is required:</label>
            </div>
            <div className="input-wrapper">
              <div>
                <label style={{ marginLeft: '120px' }}>Period:</label>
                <input type="text" id="periodYears" name="periodYears" placeholder="Years" value={formData.periodYears} onChange={handleChange} style={{ width: '30%' }} />
                <input type="text" id="periodMonths" name="periodMonths" placeholder="Months" value={formData.periodMonths} onChange={handleChange} style={{ width: '30%' }} />
                <input type="text" id="periodDays" name="periodDays" placeholder="Days" value={formData.periodDays} onChange={handleChange} style={{ width: '30%' }} />
              </div>
              <label style={{ marginLeft: '90px' }}>leaveStartDate:</label>
              <input type="date" id="leaveStartDate" name="leaveStartDate" value={formData.leaveStartDate} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="permissionToLeaveStation">5. Whether permission to leave the station is required:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="permissionToLeaveStation" name="permissionToLeaveStation" value={formData.permissionToLeaveStation} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="groundsForLeave">6. Grounds for leave:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="groundsForLeave" name="groundsForLeave" value={formData.groundsForLeave} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="refundUndertaking">7. I undertake to refund the difference between the leave salary and other allowances admissible during leave:</label>
            </div>
            <div className="input-wrapper">
            
            <label className="checkbox-label">
                <input type="checkbox" id="refundUndertaking" name="refundUndertaking" checked={formData.refundUndertaking === 1} onChange={handleCheckboxChange} />
                Yes
              </label>            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="additionalFile">8. Upload additional file (if any):</label>
            </div>
            <div className="input-wrapper">
              <input type="file" id="additionalFile" name="additionalFile" onChange={handleFileChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="signature">9. Upload signature:</label>
            </div>
            <div className="input-wrapper">
              <input type="file" id="signature" name="signature" onChange={handleSignatureUpload} />
              {signatureFile && (
                <div>
                  <button type="button" onClick={handleSignatureRemove}>Remove Signature</button>
                </div>
              )}
            </div>
          </div>
          <div className='cancel-submit-btn'>
            <button className='cancel-btn' >Cancel</button>
            <button >Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtherLeaveForm;
