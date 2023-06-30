import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocumentList();
  }, []);

  const fetchDocumentList = async () => {
    try {
      const response = await axiosInstance.get('');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching document list:', error);
    }
  };

  return (
    <div className="document-list">
      <h2>Document List</h2>
      {documents.length > 0 ? (
        <ul style={{ listStyleType: 'none', fontSize: '14px' }}>
          {documents.map((document, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <div>
                <strong>Name:</strong> {document.name}
              </div>
              <div>
                <strong>Type:</strong> {document.type}
              </div>
              <div>
                <strong>Upload Date:</strong> {document.uploadDate}
              </div>
              <hr style={{ borderTop: '1px dashed #999' }} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No documents available.</div>
      )}
    </div>
  );
};

export default DocumentList;
