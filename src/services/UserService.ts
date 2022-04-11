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
      getOneCategory(
        id: number,
        catId: number,
        userToken: unknown
      ) {
        return apiClient.get(
          `/user/${id}/categories/${catId}`,
          {
            headers: { authorization: `${userToken}` },
          }
        );
      },
      addCategories(id: number, userToken: unknown, category: object) {
        return apiClient.post(`/user/${id}/categories`, category, {
          headers: { authorization: `${userToken}` },
        });
      },
      getUserTransactions(id: number, userToken: unknown) {
        return apiClient.get(`/user/${id}/transactions`, {
          headers: { authorization: `${userToken}` },
        });
      },
      getOneTransaction(
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
      addTransaction(
        formdata: object,
        id: number,
        catId: number,
        userToken: unknown
      ) {
        return apiClient.post(
          `/user/${id}/categories/${catId}/transactions`,
          formdata,
          {
            headers: { authorization: `${userToken}` },
          }
        );
      },
      updateTransaction(
        transaction: object,
        id: number,
        catId: number,
        transactionId: number,
        userToken: unknown
      ) {
        return apiClient.patch(
          `/user/${id}/categories/${catId}/transactions/${transactionId}`,
          transaction,
          {
            headers: { authorization: `${userToken}` },
          }
        );
      },
      deleteteTransaction(
        id: number,
        catId: number,
        transactionId: number,
        userToken: unknown
      ) {
        return apiClient.delete(
          `/user/${id}/categories/${catId}/transactions/${transactionId}`,
          {
            headers: { authorization: `${userToken}` },
          }
        );
      },
  };