import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const allowedFileTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/msword', 'text/plain', 'image/jpeg', 'image/png'];
  const invalidFileTypeError = 'Invalid file type. Please select a PDF, Excel, Word, TXT, JPEG, or PNG file.';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert(invalidFileTypeError);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axiosInstance.post('/upload', formData)
          .then((response) => {
            alert('File uploaded successfully!');
            setSelectedFile(null); // Clear the selected file
          })
          .catch((error) => {
            console.error('Error uploading document:', error);
            alert('Error uploading document. Please try again.');
          });
      } else {
        alert(invalidFileTypeError);
      }
    } else {
      console.error('No file selected.');
      alert('Please select a valid file type to upload.');
    }
  };

  return (
    <div>
      <h2>Document Upload</h2>
      <input type="file" accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.jpg,.jpeg,.png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default DocumentUpload;
