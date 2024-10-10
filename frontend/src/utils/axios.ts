import axios from "axios";


const baseURL = process.env.REACT_APP_API_BASE_URL;

// Global headers will be added here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headers: any = {};

const axiosInstance = axios.create({
    baseURL,
    headers,
});



axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function resFunction(response) {
        return response;
    },
    async function errFunction(error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest?.retry) {
            originalRequest.retry = true;
            const token = localStorage.getItem('token');
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
        }

        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
);

export default axiosInstance;
