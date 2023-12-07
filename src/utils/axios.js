import { store } from "@/store/store";
import axios from "axios";

const request = axios.create({
  baseURL: "https://api.admin.qwatt.uz/v1/object",
  timeoTut: 10000,
});

// request.defaults.headers["Authorization"] = "API-KEY";
request.defaults.headers["X-API-KEY"] = "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45";

request.interceptors.request.use((config) => {
  const { token } = store.getState().userData.data;

  config.headers.Authorization = `Bearer ${token}`;
  config.params = {
    ...config.params,
    "project-id": "4dbfb907-8b4b-460b-906b-cc81c58e656c",
  };

  return config;
}, errorHandler);

request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export function errorHandler(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    window.Telegram?.WebApp.close();
    return Promise.reject(error.response);
  }
  if (error.response) {
    return Promise.reject(error.response);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }

  return Promise.reject(error);
}

export default request;
