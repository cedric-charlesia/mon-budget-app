import axios, { type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  register(formdata: unknown) {
    return apiClient.post("/signup", formdata);
  },
  login(formdata: unknown) {
    return apiClient.post("/login", formdata);
  },
  user(id: unknown, auth: AxiosRequestConfig<unknown> | undefined) {
    return apiClient.get(`/user/${id}`, auth);
  },
};
