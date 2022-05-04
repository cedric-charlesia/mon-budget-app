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
    getUserTransactions(id: number, userToken: string | null) {
        return apiClient.get(`/user/${id}/transactions`, {
            headers: { authorization: `${userToken}` },
        });
    },
}