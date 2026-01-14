import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // ✅ các endpoint public: không gắn token + xóa token nếu lỡ còn
    if (shouldSkipToken) {
      delete config.headers.Authorization;
      return config;
    }

    // ✅ các endpoint private: gắn token nếu có
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ timeout
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const reqUrl = error.config?.url || "";
    const isAuthRequest =
      reqUrl.includes("/login") || reqUrl.includes("/register");

    if (status === 401) {
      // ✅ tránh redirect loop khi chính login/register bị 401
      if (!isAuthRequest && !window.location.pathname.startsWith("/login")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (status === 500) {
      console.error("Server error. Please try again later");
    }

    return Promise.reject(error);
  }
);
