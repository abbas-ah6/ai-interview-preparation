import axios from 'axios';
import { BASE_URL } from './apiPaths';

// This axios instance can be used throughout the application to make API calls
const axiosInstace = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

// Request Interceptor to add Authorization header with JWT token
axiosInstace.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axiosInstace.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page if unauthorized
                window.location.href = '/'
            } else if (error.response.status === 500) {
                console.error("Server error, please try again later.");
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error("Request timed out, please try again.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstace;