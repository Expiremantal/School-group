import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import your styles if you have any

const rootElement = document.getElementById('root'); // Ensure this matches your HTML
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
