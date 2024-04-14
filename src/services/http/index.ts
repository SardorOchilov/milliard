import axios from "axios";
import { API_BASE_URL } from "@/config";

const $http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "B1S-CaseInsensitive": true,
  },
  withCredentials: true,
});

$http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default $http;
