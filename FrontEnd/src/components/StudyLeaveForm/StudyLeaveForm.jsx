import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import './StudyLeaveForm.css'; // Import CSS file for styling

function OtherLeaveForm({ userID }) {
  
  const [signatureFile, setSignatureFile] = useState(null);

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
    }
};


  const handleSignatureRemove = () => {
    setSignatureFile(null);  
  };

  const handleSubmit = async (event) => {
    ///chk start
    // Your existing form submission logic here...

    try {
      // Make POST request to upload image
      const formData = new FormData();
      formData.append('image', signatureFile);
      console.log(signatureFile);
      await axios.post('http://127.0.0.1:8080/noc/upload/image', formData);
      
      // Handle response
      console.log('Image uploaded successfully.');
  } catch (error) {
      console.error('Error occurred while uploading image:', error);
      // Handle error
  };
    return;

    ///chk end
    event.preventDefault();
    // Get start date
    const startDate = document.getElementById('leaveStartDate').value;
  
    // Get period years, months, and days
    const periodYears = parseInt(document.getElementById('periodYears').value);
    const periodMonths = parseInt(document.getElementById('periodMonths').value);
    const periodDays = parseInt(document.getElementById('periodDays').value);
  
    // Prepare form data
    const formData = new FormData();
    formData.append('Applicant_Id', userID); // Assuming userID is the applicant's ID
    formData.append('Name', document.getElementById('name').value); // Get name from input field
    formData.append('Nature_of_Leave', document.getElementById('natureOfLeave').value); // Get nature of leave from textarea
    formData.append('Designation', document.getElementById('designation').value); // Get designation from input field
    formData.append('Leave_Start_Date', startDate); // Set leave start date
    formData.append('Leave_End_Date', endDate.toISOString().split('T')[0]); // Set leave end date
    formData.append('Leave_Ground', document.getElementById('groundsForLeave').value); // Get leave ground from textarea
    formData.append('Salary_Acknowledgement', document.getElementById('salaryAcknowledgement').value); // Get salary acknowledgement from textarea
    formData.append('Station_Leaving_Permission', document.getElementById('stationLeavingPermission').value); // Get station leaving permission from textarea
    
    // Convert essential file to BLOB and append it to form data
    const essentialFileInput = document.getElementById('additionalFile');
    if (essentialFileInput.files.length > 0) {
      const file = essentialFileInput.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const fileArray = new Uint8Array(reader.result);
        const blob = new Blob([fileArray], { type: file.type });
        formData.append('Attached_File', blob);
      };
    }
  
    formData.append('Applicant_Signature', signatureFile); // Attach signature file
    formData.append('Final_Application', null); // Set final_application to null
  
    try {
      // Make POST request to the server using Axios
      const response = await axios.post('/other_leave_application', formData);
  
      // Handle response
      if (response.status === 200) {
        console.log('Data inserted successfully.');
        // You can add logic here to handle successful form submission
      } else {
        console.error('Failed to insert data.');
        // You can add logic here to handle failed form submission
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // You can add logic here to handle errors
    }
  };
  

  return (
    <div>
    
      <div className="form-container">
        <div className="header">
          <h2>University of Chittagong</h2>
          <h3>(Only for Study Leave Application)</h3>
          <p><strong>(No application except in this prescribed form be considered)</strong></p>
        </div>
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="name">1. Name of Applicant:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="name" name="name" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="designation">2. Designation:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="designation" name="designation" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="period">4. The period for and date from which the leave is required:</label>
            </div>
            <div className="input-wrapper">
              <div>
                <label style={{ marginLeft: '120px' }}>Period:</label>
                <input type="text" id="periodYears" name="periodYears" placeholder="Years" style={{ width: '30%' }} />
                <input type="text" id="periodMonths" name="periodMonths" placeholder="Months" style={{ width: '30%' }} />
                <input type="text" id="periodDays" name="periodDays" placeholder="Days" style={{ width: '30%' }} />
              </div>
              <label style={{ marginLeft: '90px' }}>leaveStartDate:</label>
              <input type="date" id="leaveStartDate" name="leaveStartDate" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="permissionToLeaveStation">5. Whether permission to leave the station is required:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="permissionToLeaveStation" name="permissionToLeaveStation" rows="3" style={{ width: '100%' }}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="groundsForLeave">6. Grounds on which the leave is applied for:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="groundsForLeave" name="groundsForLeave" rows="3" style={{ width: '100%' }}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="refundUndertaking">7. I undertake to refund to the University any difference of leave salary or pay that may come to notice subsequently due to this leave:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="refundUndertaking" name="refundUndertaking" rows="3" style={{ width: '100%' }}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="additionalFile">8. Essential Additional File:</label>
            </div>
            <div className="input-wrapper">
              <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="additionalFile" type="file" multiple></input>
            </div>
          </div>
          

          <div className="form-group">
            <div className="input-wrapper">
             {/*  <textarea id="remarks" name="remarks" rows="3" style={{ width: '90%' }}></textarea>
              <label htmlFor="remarks">Remarks and/or recommendation of the Head of the Departments/office:</label>*/}
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
                    id="signature"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="signature" className="upload-label">Upload Signature (300x80px)</label>
                </div>
              )}
              <label htmlFor="signature">Signature of the Applicant and date:</label>
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
