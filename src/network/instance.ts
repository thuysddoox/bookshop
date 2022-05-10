import axios from 'axios';

const API_URL = "https://bookstore-api.thangld-dev.tech/api/book?fbclid=IwAR1lceXTKx8XlXvUNAcF8AZSD175F7cf8kL9Usk9okMnvzsJddSFrebSFsk";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const statusCode = error?.response?.status;
    return Promise.reject(error);
  }
);

export default axiosInstance;
