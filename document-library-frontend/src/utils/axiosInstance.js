import axios from 'axios';

// Aliased in package.json as @utils/axiosInstance to prevent need for
// relative file paths
const axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV === "development") ? 'http://127.0.0.1:7144/api/' : 'https://todo'
});

export default axiosInstance;