import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React  from 'react';
axios.defaults.baseURL = "http://localhost:7071/api/";
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
)