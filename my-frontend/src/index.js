import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Add your global styles here
import App from './App'; // The main App component
import reportWebVitals from './reportWebVitals'; // Optional: For performance logging

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure app performance
reportWebVitals();