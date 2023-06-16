import axios from "axios";

const request = axios.create({
  baseURL: "https://api.admin.u-code.io/v1/object",
});

request.defaults.headers["Authorization"] = "API-KEY";
request.defaults.headers["X-API-KEY"] = "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45";

request.interceptors.request.use((config) => {
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
  if (error.response) {
    return Promise.reject(error.response);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }

  return Promise.reject(error);
}

export default request;
