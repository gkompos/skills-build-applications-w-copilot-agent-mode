import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

if (codespaceName) {
  console.log('Frontend configured for backend base URL:', `https://${codespaceName}-8000.app.github.dev/api/`);
} else {
  console.log('Frontend configured for backend base URL:', 'http://localhost:8000/api/');
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
