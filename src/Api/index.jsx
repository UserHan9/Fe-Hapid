// Import axios for HTTP API requests
import axios from 'axios';
// Import js-cookie for handling cookies
import Cookies from 'js-cookie';

import { toast } from 'react-toastify';

// Create Axios instance
const Api = axios.create({
  // Base URL for API endpoints
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

  // Handle unauthenticated and forbidden responses
  Api.interceptors.response.use(  
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('permissions');
        // Tidak melakukan redirect, hanya menghapus token dari cookies
      } else if (403 === error.response.status) {
        // Tidak melakukan redirect, hanya menampilkan pesan kesalahan
        toast.error("ADA KESALAHAN TIDAK TERDUGA", {
          position : "top-center",
          duration: 4000
        });
      } else {
        return Promise.reject(error);
      }
    }
  );
  

export default Api;
