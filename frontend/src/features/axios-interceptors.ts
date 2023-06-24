import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

