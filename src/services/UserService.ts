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
  register(formdata: object) {
    return apiClient.post("/signup", formdata);
  },
  login(formdata: object) {
    return apiClient.post("/login", formdata);
  },
  user(id: number, auth: AxiosRequestConfig<unknown> | undefined) {
    return apiClient.get(`/user/${id}`, auth);
  },
  getUserTransactionsSummary(
    id: number,
    catId: number,
    transactionId: number,
    userToken: unknown
  ) {
    return apiClient.get(
      `/user/${id}/categories/${catId}/transactions/${transactionId}`,
      {
        headers: { authorization: `${userToken}` },
      }
    );
  },
};
