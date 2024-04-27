import React, { useState } from 'react';
import axios from 'axios';

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedName, setUploadedName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/leave/upload/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data.fileName);
      setUploadedName(response.data.fileName);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handlePreview = async () => {
    if (!uploadedName) {
      alert('No file uploaded yet.');
      return;
    }

    try {
      // Assuming the API endpoint for fetching PDF files is similar to fetching images
      const response = await axios.get(`http://localhost:5000/api/leave/files/pdf/${uploadedName}`, {
        responseType: 'blob',
      });

      // Create a blob URL to open the PDF in a new tab
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Open the PDF in a new tab
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error fetching file:', error.message);
    }
  };

  return (
    <div>
      <h2>PDF Uploader</h2>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      {previewUrl && <embed src={previewUrl} type="application/pdf" width="300" height="200" />}
      <button onClick={handleSubmit}>Upload</button>
      <button onClick={handlePreview}>Preview</button>
    </div>
  );
};

export default PdfUploader;
