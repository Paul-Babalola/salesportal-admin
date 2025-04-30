import axios from 'axios';

// Function to get the token from local storage
const getToken = () => {
    return localStorage.getItem('jwt_token'); // Assuming 'jwt_token' is the key used to store the JWT
};

// Determine the base URL for the API
const baseURL = import.meta.env.VITE_APP_API_URL || 'https://devsalesportal.ipnxnigeria.net/api/v1';

// Create an Axios instance
const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = ` ${token}`;
    }
    return config;
});

export default apiClient;
