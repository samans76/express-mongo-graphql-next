import axios from "axios";

// Default config options
const defaultOptions = {
  baseURL: "http://www.localhost:3001/graphql/",
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
export const Request = axios.create(defaultOptions);

// Set the AUTH token for any request
//   Request.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('token');
//     config.headers.Authorization =  token ? `Bearer ${token}` : '';
//     return config;
//   });
