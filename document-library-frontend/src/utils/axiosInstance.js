import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: (process.env.NODE_ENV === "development") ? 'https://localhost:7144/api/documents' : 'https://todo',
    timeout: 30000
});

export default axiosInstance;