import axios from 'axios';
import {AppError} from '../utils/exceptions/AppError';

// to android -> http://10.0.2.2:3000
// to ios -> http://localhost:3000
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

api.interceptors.request.use(
  resp => {
    console.log({resp});
    return resp;
  },
  err => console.log({err}),
);

api.interceptors.response.use(
  resp => resp,
  error => {
    console.log(JSON.stringify(error));
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  },
);

export {api};
