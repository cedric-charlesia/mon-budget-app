import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  register(formdata: object) {
    return apiClient.post("/signup", formdata);
  },
  login(formdata: object) {
    return apiClient.post("/login", formdata);
  },
  user(id: number, token: object) {
    return apiClient.get(`/user/${id}`, token);
  },
  getUserCategories(id: number, userToken: unknown) {
    return apiClient.get(`/user/${id}/categories`, {
      headers: { authorization: `${userToken}` },
    });
  },
  getUserTransactions(id: number, userToken: unknown) {
    return apiClient.get(`/user/${id}/transactions`, {
      headers: { authorization: `${userToken}` },
    });
  },
};
