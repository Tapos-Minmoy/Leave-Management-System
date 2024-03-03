import React, { useState } from 'react';
import './StudyForm.css'; // Import CSS file for styling

function StudyForm() {
  const [signatureFile, setSignatureFile] = useState(null);

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
          if (image.width <= 300 && image.height <= 80) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setSignatureFile(reader.result);
            };
          } else {
            alert('Please upload an image with dimensions not exceeding 300x80 pixels.');
          }
        };
      } else {
        alert('Please upload an image file (JPEG or PNG) for the signature.');
      }
    }
  };

  const handleSignatureRemove = () => {
    setSignatureFile(null);
  };

  return (
    <div>

      <div className="form-container">
        <div className="header">
          <h2>University of Chittagong</h2>
          <h3>Form of Application of Leave (other than study leave)</h3>
          <p><strong>(No leave application except in this prescribed form be considered)</strong></p>
        </div>
        <form className="leave-form">
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
            <div className="input-wrapper ">
              <label htmlFor="natureOfLeave">3. Nature of leave applied for:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="natureOfLeave" name="natureOfLeave" rows="3" style={{ width: '100%' }}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="period">4. The period for and date from which the leave is required:</label>
            </div>
            <div className="input-wrapper">
              <textarea id="period" name="period" rows="3" style={{ width: '100%' }}></textarea>
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
              <textarea id="remarks" name="remarks" rows="3" style={{ width: '90%' }}></textarea>
            </div>
            <div className="input-wrapper">
            {signatureFile ? (
                <>
                  <img src={signatureFile} alt="Signature" style={{ width: '300px', height: '80px' }} />
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

          <div className="form-group">
            <div className="input-wrapper">
              <label htmlFor="remarks">Remarks and/or recommendation of the Head of the Departments/office:</label>
            </div>
            <div className="input-wrapper">
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

export default StudyForm;
