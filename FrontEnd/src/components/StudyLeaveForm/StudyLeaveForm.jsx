import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import {  useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './StudyLeaveForm.css'; // Import CSS file for styling

function StudyLeaveForm({  }) {
  const navigate = useNavigate();

  const [signatureFile, setSignatureFile] = useState(null);
  const [formData, setFormData] = useState({
    attachments: null,
    department: '',
    designation: '',
    destination: '',
    destination_country: '',
    duration: 0,
    final_application: '',
    financial_source: '',
    joining_date: '',
    leave_start_date: '',
    my_application_chairman: '',
    my_application_registrar: '',
    name_of_program: '',
    program_start_date: '',
    signature: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width <= 300 && height <= 80) {
            // Image meets the required dimensions, proceed with handling the file
            setSignatureFile(file);
          } else {
            alert('Please upload an image with dimensions up to 300px width and 80px height for the signature.');
          }
        };
      };

      reader.readAsDataURL(file);
      setFormData({ ...formData, [event.target.name]: event.target.files[0] })
    }
  };


  const handleSignatureRemove = () => {
    setSignatureFile(null);
  };

  const handleFileUploadToServer = async (file) => {
    if (!file) {
      setUploadMessage("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("items", file); // Ensure the key matches the multer middleware setup on the backend

    try {
      const response = await axios.post("http://localhost:5000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Store the uploaded filename for download
      const uploadedFileName = response.data.files[0].filename; // Adjust according to your API response structure


      return uploadedFileName; // Return the uploaded filename
    } catch (error) {
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user_id = Cookies.get('user_user_id');
      if (!user_id) {
        alert("Please Logout and login again! Cookies missing...");
        return;
      }
  
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
  
      const formDataToSend = {
        applicant_id: user_id,
        applied_date: formattedDate,
        attachments: null,
        department: formData.department,
        designation: formData.designation,
        destination: formData.destination,
        destination_country: formData.destination_country,
        duration: Number(formData.duration),
        final_application: formData.final_application,
        financial_source: formData.financial_source,
        joining_date: formData.joining_date,
        leave_start_date: formData.leave_start_date,
        my_application_chairman: formData.my_application_chairman,
        my_application_registrar: formData.my_application_registrar,
        name_of_program: formData.name_of_program,
        program_start_date: formData.program_start_date,
        signature: null,
      };
  
      if (formData.attachments) {
        const uploadedAttachment = await handleFileUploadToServer(formData.attachments);
        formDataToSend.attachments = uploadedAttachment;
      }
  
      if (signatureFile) {
        const uploadedSignature = await handleFileUploadToServer(signatureFile);
        formDataToSend.signature = uploadedSignature;
      }
  
      const response = await axios.post('http://localhost:5000/api/leave/study/add', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
  
      console.log(response.data); // Log response from the server
      navigate('/noc/leaveApplication');
  
    } catch (error) {
      alert("Something went wrong. Try again!");
      console.error('Error submitting form:', error);
    }
  };
  


  return (
    <div>

      <div className="form-container">
        <div style={{ textAlign: 'center' }}>
        <div>
            <h2 style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '24px' }}>University of Chittagong</h2>
          </div>          
          <h3 style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '20px' }}>(Only for Study Leave Application)</h3>

          <p style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '18px' }}><strong>(No application except in this prescribed form be considered)</strong></p>
        </div>
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="name_of_program">1. Name of Program:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="name_of_program" name="name_of_program" value={formData.name_of_program} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="destination">2. Destination University / Organization Name:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="department">3. Destination Department:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="duration">4. Program Duration (Years):</label>
            </div>
            <div className="input-wrapper">
              <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="destination_country">5. Destination Country:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="destination_country" name="destination_country" value={formData.destination_country} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="financial_source">6. Financial Source:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="financial_source" name="financial_source" value={formData.financial_source} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="joining_date">7. Date of joining (this university):</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="joining_date" name="joining_date" value={formData.joining_date} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="leave_start_date">8. Leave Start Date:</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="leave_start_date" name="leave_start_date" value={formData.leave_start_date} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="program_start_date">9. Program Start Date:</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="program_start_date" name="program_start_date" value={formData.program_start_date} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="attachments">10. Please Attach important file:</label>
            </div>
            <div className="input-wrapper">
              <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachments" name="attachments" onChange={handleFileChange} type="file"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="signature">Signature of the Applicant and date:</label>
            </div>
            <div className="input-wrapper">
              {signatureFile ? (
                <>
                  <img src={URL.createObjectURL(signatureFile)} alt="Signature" className="h-20 w-80 rounded-sm border-slate-700 border-2" />
                  <button onClick={handleSignatureRemove}>Change</button>
                </>
              ) : (
                <div>
                  <input
                    type="file"
                    id="signature" name="signature"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="signature" className="upload-label">Upload Signature (300x80px)</label>
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

export default StudyLeaveForm;