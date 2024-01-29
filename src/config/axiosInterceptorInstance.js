import axios from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.BASE_API_URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const schemaToken = process.env.SCHEMA_TOKEN;

    // If token is present add it to request's Authorization Header
    if (schemaToken) if (config.headers) config.headers.schemaToken = schemaToken;

    return config;
  },
  (error) => Promise.reject(error)
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
// End of Response interceptor

export default axiosInterceptorInstance;
