import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const DocumentDownload = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let countdownInterval;

    if (loading) {
      countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [loading]);

  const handleDownload = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading state to true

      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out')); // Reject the promise after 10 seconds
        }, 10000);
      });

      const downloadPromise = axiosInstance.get(`/${fileName}`);

      const response = await Promise.race([timeoutPromise, downloadPromise]);

      setFileContent(response.data);
    } catch (error) {
      console.error('Error downloading file:', error);
      setFileContent('Error downloading file. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false
      setTimeRemaining(10); // Reset the timer
    }
  };

  return (
    <div className="file-download">
      <h2>Download File</h2>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
        <button type="submit">Download</button>
      </form>

      {loading && (
        <div>
          <div>Loading...</div>
          <div>Time remaining: {timeRemaining} seconds</div>
        </div>
      )}

      {fileContent && !loading && (
        <div>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default DocumentDownload;
