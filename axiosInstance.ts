import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://simplenotes-rc6n6dj1.b4a.run/', 
  });
  
  axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  export default axiosInstance;