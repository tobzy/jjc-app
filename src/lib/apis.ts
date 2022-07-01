import axios, { AxiosRequestConfig } from 'axios';
import { QueryCache } from 'react-query';
import {JJC_API, MAIN_API, SECURE_MAIN_API} from './apiConstants';
import { LOCAL_STORAGE_KEYS } from './constants';

const COMMON_HEADERS = {
  'Content-Type': 'application/json',
};

const queryCache = new QueryCache();

const getAccessToken = async () => {
  try {
    const token = JSON.parse(<string>localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN));
    return token;
  } catch (e) {}
  return '';
};

const getSecureHeaders = async (config:any) => {
  config.headers.common = COMMON_HEADERS;
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.common['x-access-token'] = `${accessToken}`;
  }
  return config;
};

export const mainApi = axios.create({
  baseURL: JJC_API,
});

export const secureMainApi = axios.create({
  baseURL: JJC_API,
});


secureMainApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const configWithHeaders = await getSecureHeaders(config);
  return configWithHeaders;
});

mainApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return config;
});

secureMainApi.interceptors.response.use(
  (axiosResponse) => axiosResponse,
  (error) => {
    if (error?.response?.status === 401) {
      // TODO: refresh token. Right now we redirect to login
      localStorage.clear();
      queryCache.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

// mainApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
//   config.headers.common = { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY };
//
//   return config;
// });
