import axios, { AxiosInstance } from "axios";
import { Config } from "../config";
import { store } from "../store";

const api: AxiosInstance = axios.create({
  baseURL: Config.baseURL,
});

// request interceptors
api.interceptors.request.use(async (config) => {
  const { auth } = store.getState();

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default api;
