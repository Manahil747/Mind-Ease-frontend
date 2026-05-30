import axios from 'axios';

const API = axios.create({
    // FIX: Port 3000 se badal kar 5000 kiya
    baseURL: 'http://localhost:3000' 
});

// Har request mein automatically token lagao
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;