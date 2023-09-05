import axios from "axios";

const requestInvoke = axios.create({
  baseURL: "https://test.api.admin.qwatt.uz/v1/invoke_function",
});

requestInvoke.defaults.headers["Authorization"] = "API-KEY";
requestInvoke.defaults.headers["X-API-KEY"] = "P-LjlsEVqKmkuiQNYQEi5iZuH3WXVwUU45";

export default requestInvoke