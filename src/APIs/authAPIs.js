import axios from 'axios';

const API_URL = 'http://localhost:8000';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api-token-auth/`, { username, password })
        const { token } = response.data;
        localStorage.setItem('token', token);
        return true;
    }
    catch (error) {
        console.error('Login failed:', error);
        return false;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export { login, logout, isAuthenticated };
