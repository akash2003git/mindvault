import axios, { type AxiosInstance, type AxiosError } from "axios";
import { jotaiStore } from "../store/store";
import { accessTokenAtom } from "../store/atoms/authAtom";

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
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

export default api;
