import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${getToken()}`,
  },
});

export default axiosInstance;
