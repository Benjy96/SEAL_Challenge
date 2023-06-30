import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";

const DocumentDownload = () => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let countdownInterval;

    if (loading) {
      countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          }
          return prevTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [loading]);

  const handleDownload = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 10000);
      });

      const downloadPromise = axiosInstance.get(`/${fileName}`, {
        responseType: "blob" // Set the response type to 'blob'
      });

      const response = await Promise.race([timeoutPromise, downloadPromise]);

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName); // Use the entered file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
      setTimeRemaining(10);
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
          <div>Downloading...</div>
          <div>Time remaining: {timeRemaining} seconds</div>
        </div>
      )}
    </div>
  );
};

export default DocumentDownload;
