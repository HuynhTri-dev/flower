import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL from environment variable (Next.js uses NEXT_PUBLIC_ prefix for client-side env vars)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add auth token here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ [${response.status}] ${response.config.url}`);
        }

        return response;
    },
    (error: AxiosError) => {
        // Handle common error cases
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    console.error('❌ Unauthorized - Please login again');
                    // Redirect to login or refresh token
                    break;
                case 403:
                    console.error('❌ Forbidden - You do not have permission');
                    break;
                case 404:
                    console.error('❌ Not Found - Resource does not exist');
                    break;
                case 500:
                    console.error('❌ Server Error - Please try again later');
                    break;
                default:
                    console.error(`❌ Error ${status}`);
            }
        } else if (error.request) {
            console.error('❌ Network Error - No response received');
        } else {
            console.error('❌ Request Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Export the configured instance
export default axiosInstance;

// Export helper methods for convenience
export const api = {
    get: <T>(url: string, config?: object) => axiosInstance.get<T>(url, config),
    post: <T>(url: string, data?: object, config?: object) => axiosInstance.post<T>(url, data, config),
    put: <T>(url: string, data?: object, config?: object) => axiosInstance.put<T>(url, data, config),
    patch: <T>(url: string, data?: object, config?: object) => axiosInstance.patch<T>(url, data, config),
    delete: <T>(url: string, config?: object) => axiosInstance.delete<T>(url, config),
};
