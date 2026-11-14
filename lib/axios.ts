import axios from "axios";

export const api = axios.create({
  // baseURL: "https://8d233ae6-d5fc-4120-9984-06c4ec9b3c3a.mock.pstmn.io",
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});