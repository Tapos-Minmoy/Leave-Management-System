import React, { useState } from "react";
import axios from "axios";

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("items", selectedFile); // Ensure the key matches the multer middleware setup on the backend

    try {
      const response = await axios.post("http://localhost:5000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadMessage(response.data.message);

      // Store the uploaded filename for download
      const uploadedFileName = response.data.files[0].filename; // Adjust according to your API response structure
      localStorage.setItem("uploadedFileName", uploadedFileName); // Store in localStorage for simplicity
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      setUploadMessage("Error uploading PDF file. Please try again.");
    }
  };

  const handleFileDownload = async () => {
    const uploadedFileName = localStorage.getItem("uploadedFileName");

    if (!uploadedFileName) {
      setDownloadMessage("No file uploaded yet.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/files/${uploadedFileName}`, {
        responseType: "blob", // Important: responseType must be blob
      });

      // Create a URL to the blob
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", uploadedFileName); // Set filename for download
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadMessage("File downloaded successfully.");
    } catch (error) {
      console.error("Error downloading PDF file:", error);
      setDownloadMessage("Error downloading PDF file. Please try again.");
    }
  };

  return (
    <div>
      <h2>PDF Upload and Download</h2>
      <div>
        <h3>Upload PDF File</h3>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload PDF</button>
        <p>{uploadMessage}</p>
      </div>
      <div>
        <h3>Download Uploaded PDF File</h3>
        <button onClick={handleFileDownload}>Download PDF</button>
        <p>{downloadMessage}</p>
      </div>
    </div>
  );
};

export default PdfUpload;
