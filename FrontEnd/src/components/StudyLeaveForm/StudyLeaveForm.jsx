import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import './StudyLeaveForm.css'; // Import CSS file for styling

function StudyLeaveForm({ userID }) {
  
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
    // Your form submission logic here...
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
              <label htmlFor="programName">1. Name of Program:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="programName" name="programName" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="destination">2. Destination University / Organization Name:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="destination" name="destination" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="department">3. Destination Department:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="department" name="department" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="duration">4. Program Duration (Years):</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="duration" name="duration" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="country">5. Destination Country:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="country" name="country" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="financialSource">6. Financial Source:</label>
            </div>
            <div className="input-wrapper">
              <input type="text" id="financialSource" name="financialSource" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="dateOfJoining">7. Date of joining (this university):</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="dateOfJoining" name="dateOfJoining" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="leaveStartDate">8. Leave Start Date:</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="leaveStartDate" name="leaveStartDate" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="programEndDate">9. Program End Date:</label>
            </div>
            <div className="input-wrapper">
              <input type="date" id="programEndDate" name="programEndDate" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="attachedFile">10. Please Attach important file:</label>
            </div>
            <div className="input-wrapper">
              <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachedFile" type="file"></input>
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
                    id="signature"
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
