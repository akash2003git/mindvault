import axios, { type AxiosInstance, type AxiosError } from "axios";
import { jotaiStore } from "../store/store";
import { accessTokenAtom, userAtom } from "../store/atoms/authAtom";

// Define the base URL for your API.
// In a real application, you would use environment variables for this.
const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the current access token from the Jotai store
    const accessToken = jotaiStore.get(accessTokenAtom);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor for global error handling (optional but recommended)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      console.error("Unauthorized request. Redirecting to login.");
      // Clear the user and token from Jotai state
      jotaiStore.set(accessTokenAtom, null);
      jotaiStore.set(userAtom, null);
      // Redirect the user to the login page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
