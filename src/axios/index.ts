import axios from "axios";

export const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
api.interceptors.request.use((config) => {
  config.url +=
    "&units=metric" + "&lang=ru" + `&appid=` + process.env.REACT_APP_API_KEY;
  return config;
});
