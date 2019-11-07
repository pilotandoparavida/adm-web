import axios from 'axios';

const api = axios.create({
    // baseURL: "https://adm-backend.herokuapp.com", 
    baseURL: "http://localhost:4444", 
    timeout: 30000
});

export default api;
