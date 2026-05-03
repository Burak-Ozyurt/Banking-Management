// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Spring Boot Backend Adresi
});

export default api;