import axios from 'axios';
import store from '../store';
import { showSocialAuth } from '../actions/socialAuth';

const token = localStorage.getItem('token') || undefined;
const server = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: token && `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

server.interceptors.request.use(
  async (config) => {
    const userToken = await localStorage.getItem('token');
    if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  (err) => {
    const { error } = err.response.data;
    if (error === 'JsonWebTokenError: jwt malformed') {
      store.dispatch(showSocialAuth());
    }
    return Promise.reject({ ...err });
  },

);

export default server;
