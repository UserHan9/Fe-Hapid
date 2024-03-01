// Import axios for HTTP API requests
import axios from 'axios';
// Import js-cookie for handling cookies
import Cookies from 'js-cookie';

// Create Axios instance
const Api = axios.create({
  // Base URL for API endpoints
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Handle unauthenticated and forbidden responses
Api.interceptors.response.use(
  function (response) {
    // If response is successful, return it
    return response;
  },
  function (error) {
    // Check if response is unauthenticated (401)
    if (401 === error.response.status) {
      // Remove token from cookies
      Cookies.remove('token');  
      // Remove user data from cookies
      Cookies.remove('user');
      // Remove permissions from cookies
      Cookies.remove('permissions');
      // Redirect to "/"
      window.location = '/';
    } 
    // Check if response is forbidden (403)
    else if (403 === error.response.status) {
      // Redirect to "/forbidden"
      window.location = '/forbidden';
    } 
    // For other errors, reject the promise
    else {
      return Promise.reject(error);
    }
  }
);

export default Api;
