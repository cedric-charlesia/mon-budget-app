import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import router from "@/router";

export const loggedInUserStore = defineStore({
  id: "loggedInUser",
  state: () => ({
    id: 0,
    username: "",
    email: "",
  }),
  getters: {},
  actions: {
    async loginUser(user: unknown) {
      try {
        await UserService.login(user)
          .then((response) => {
            this.id = parseInt(response.data.id, 10);
            this.username = response.data.username;
            this.email = response.data.email;

            localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem("id", response.data.id);

            const userId = parseInt(response.data.id, 10);
            const token = {
              headers: { Authorization: `${response.headers.authorization}` },
            };

            if (userId) {
              UserService.user(userId, token)
                .then((response) => {
                  console.log("response data", response.data);
                  router.push({
                    name: "user",
                    params: response.data,
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
