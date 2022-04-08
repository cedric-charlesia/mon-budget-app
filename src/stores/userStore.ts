import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import router from "@/router";

export const userStore = defineStore({
    id: "userStore",
    state: () => ({
        id: NaN,
        username: "",
        email: ""
    }),
    getters: {},
    actions: {
        async loginUser(user: object) {
            try {
                await UserService.login(user)
                    .then((response) => {
                        this.id = parseInt(response.data.id, 10);
                        this.username = response.data.username;
                        this.email = response.data.email;

                        localStorage.setItem("token", response.headers.authorization);

                        const userId = parseInt(response.data.id, 10);
                        const token = {
                            headers: { Authorization: `${response.headers.authorization}` },
                        };

                        if (!isNaN(userId) && isFinite(userId)) {
                            UserService.user(userId, token)
                                .then((response) => {
                                    router.push({
                                        name: "user",
                                        params: response.data,
                                    });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                            // this.getUserCategories();
                            // this.getUserTransactions();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        },
    }
});