import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// axios.defaults.baseURL = "http://localhost:7071/api/";
// axios.defaults.baseURL = "https://icy-hill-02852260f.6.azurestaticapps.net/api/"; URL của Azure Static Web Apps
axios.defaults.baseURL = "https://your-api-functions-app.azurewebsites.net/api"; // URL của Azure Functions App
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
)