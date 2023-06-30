import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: (process.env.NODE_ENV === "development") ? 'https://localhost:7144/api/' : 'https://todo',
    timeout: 5000
});

export default axiosInstance;