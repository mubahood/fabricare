import axios from "axios";
import { API_BASE_URL, DB_TOKEN } from "../models/Constants";

const api = axios.create({
  //   baseURL: "http://localhost/laundary-app-web/api", // Replace with your backend API base URL
  baseURL: API_BASE_URL, // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for request authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(DB_TOKEN); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.tok = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
export const http_post = async (path, params) => {
  var response = null;
  try {
    response = await api.post(path, params, {
      headers: { "Content-Type": "multipart/form-data" },
    }); // Backend login endpoint
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login because: " + error.message);
  }
  //response if is not null
  if (!response) {
    throw new Error("Failed to fetch services because response is null");
  }

  if (response.statusText === null) {
    throw new Error("Failed to fetch services because response is null");
  }

  const data = response.data;
  if (!data) {
    throw new Error("Failed to fetch services because data is null");
  }
  const code = parseInt(data.code, 10); // should be int
  if (code !== 1) {
    throw new Error(data.message);
  }
  return data.data;
};

export const http_get = async (path) => {
  var response = null;
  try {
    response = await api.get(path);
    // console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data because: " + error.message);
  }
  //response if is not null
  if (!response) {
    throw new Error("Failed to fetch data because response is null");
  }

  const data = response.data;
  if (!data) {
    throw new Error("Failed to fetch data because data is null");
  }
  const code = data.code; // should be int
  if (code !== 1) {
    throw new Error(data.message);
  }
  return data.data;
};
