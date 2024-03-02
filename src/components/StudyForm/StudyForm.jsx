import React from 'react';
import './StudyForm.css'; // Import CSS file for styling

function StudyForm() {
  return (
    <div>
      <div className="header">
        <h2>University of Chittagong</h2>
        <h3>Form of Application of Leave (other than study leave)</h3>
        <p><strong>(No leave application except in this prescribed form be considered)</strong></p>
      </div>
      <div className="form-container">
        <form className="leave-form">
          <div className="form-group">
            <label htmlFor="name">1. Name of Applicant:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="designation">2. Designation:</label>
            <input type="text" id="designation" name="designation" />
          </div>
          <div className="form-group">
            <label htmlFor="natureOfLeave">3. Nature of leave applied for:</label>
            <input type="text" id="natureOfLeave" name="natureOfLeave" />
          </div>
          <div className="form-group">
            <label htmlFor="period">4. The period for and date from which the leave is required:</label>
            <input type="text" id="period" name="period" />
          </div>
          <div className="form-group">
            <label htmlFor="permissionToLeaveStation">5. Whether permission to leave the station is required:</label>
            <input type="text" id="permissionToLeaveStation" name="permissionToLeaveStation" />
          </div>
          <div className="form-group">
            <label htmlFor="groundsForLeave">6. Grounds on which the leave is applied for:</label>
            <input type="text" id="groundsForLeave" name="groundsForLeave" />
          </div>
          <div className="form-group">
            <label htmlFor="refundUndertaking">7. I undertake to refund to the University any difference of leave salary or pay that may come to notice subsequently due to this leave:</label>
            <input type="checkbox" id="refundUndertaking" name="refundUndertaking" />
          </div>
          <div className="form-group">
            <label htmlFor="refundUndertaking">8.Essential Additional File:</label>
            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple></input>
          </div>
          <div className="form-group">
            <label htmlFor="remarks">Remarks and/or recommendation of the Head of the Departments/office:</label>
            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple></input>
          </div>
          <div className="form-group">
            <label htmlFor="applicantSignature">Signature of the Applicant and date:</label>
            <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple></input>
            <input type="date" id="date" name="date" />
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
