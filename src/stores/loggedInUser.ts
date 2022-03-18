import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import router from "@/router";

export const loggedInUserStore = defineStore({
  id: "loggedInUser",
  state: () => ({
    id: NaN,
    username: "",
    email: "",
    categories: [{ id: NaN, tag: "", type: "", user_id: NaN }],
    transactions: [
      {
        id: NaN,
        date: "",
        description: "",
        amount: 0,
        category_id: NaN,
      },
    ],
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
            // localStorage.setItem("id", response.data.id);

            const userId = parseInt(response.data.id, 10);
            const token = {
              headers: { Authorization: `${response.headers.authorization}` },
            };

            if (!isNaN(userId) && isFinite(userId)) {
              UserService.user(userId, token)
                .then((response) => {
                  console.log("User is:", response.data);
                  router.push({
                    name: "user",
                    params: response.data,
                  });
                })
                .catch((error) => {
                  console.error(error);
                });

              const userToken = localStorage.getItem("token");

              UserService.getUserCategories(userId, userToken).then(
                (response) => {
                  // console.log("this user categories are:");
                  if (response.data) {
                    this.categories = response.data;
                    console.log(response.data);
                  }
                  return null;
                }
              );

              UserService.getUserTransactions(userId, userToken).then(
                (response) => {
                  // console.log("this user transactions are:", response.data);
                  if (response.data) {
                    this.transactions = response.data;
                  }
                  return null;
                }
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    },
    getTotalIncomeOrExpense(categoryType: string) {
      const categories: number[] = [];

      for (const category of this.categories) {
        if (category.type === `${categoryType}`) {
          categories.push(category.id);
        }
      }

      let totalIncomeOrExpense = 0;

      for (const transaction of this.transactions) {
        for (const category of categories) {
          if (category === transaction.category_id) {
            totalIncomeOrExpense += +transaction.amount;
          }
        }
      }
      return totalIncomeOrExpense;
    },
  },
});
