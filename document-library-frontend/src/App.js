import React from 'react';

import './App.css';

import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import DocumentDownload from './components/DocumentDownload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DocumentList />
        <DocumentUpload />
        <DocumentDownload />
      </header>
    </div>
  );
}

export default App;
