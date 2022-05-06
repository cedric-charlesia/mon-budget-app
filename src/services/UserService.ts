import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'https://mon-budget-api.herokuapp.com/',
    baseURL: 'http://localhost:3001',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    register(newUser: object) {
        return apiClient.post('/signup', newUser);
    },
    login(user: object) {
        return apiClient.post('/login', user);
    },
    user(id: number, token: object) {
        return apiClient.get(`/user/${id}`, token);
    },
    getUserCategories(id: number, userToken: string | null) {
        return apiClient.get(`/user/${id}/categories`, {
            headers: { authorization: `${userToken}` },
        });
    },
    getOneCategory(
        id: number,
        catId: number,
        userToken: string | null
    ) {
        return apiClient.get(
            `/user/${id}/categories/${catId}`,
            {
                headers: { authorization: `${userToken}` },
            }
        );
    },
    addCategories(id: number, userToken: string | null, category: object) {
        return apiClient.post(`/user/${id}/categories`, category, {
            headers: { authorization: `${userToken}` },
        });
    },
    updateCategory(
        category: object,
        id: number,
        catId: number,
        userToken: string | null
    ) {
        return apiClient.patch(
            `/user/${id}/categories/${catId}`,
            category,
            {
                headers: { authorization: `${userToken}` },
            }
        );
    },
    getUserTransactions(id: number, userToken: string | null) {
        return apiClient.get(`/user/${id}/transactions`, {
            headers: { authorization: `${userToken}` },
        });
    },
    getOneTransaction(
        id: number,
        catId: number,
        transactionId: number,
        userToken: string | null
    ) {
        return apiClient.get(
            `/user/${id}/categories/${catId}/transactions/${transactionId}`,
            {
                headers: { authorization: `${userToken}` },
            }
        );
    },
    addTransaction(
        transaction: object,
        id: number,
        catId: number,
        userToken: string | null
    ) {
        return apiClient.post(
            `/user/${id}/categories/${catId}/transactions`,
            transaction,
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
        userToken: string | null
    ) {
        return apiClient.patch(
            `/user/${id}/categories/${catId}/transactions/${transactionId}`,
            transaction,
            {
                headers: { authorization: `${userToken}` },
            }
        );
    },
    deleteTransaction(
        id: number,
        catId: number,
        transactionId: number,
        userToken: string | null
    ) {
        return apiClient.delete(
            `/user/${id}/categories/${catId}/transactions/${transactionId}`,
            {
                headers: { authorization: `${userToken}` },
            }
        );
    },
}