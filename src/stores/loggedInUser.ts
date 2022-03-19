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
    dates: [""],
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
                  if (response.data === []) return this.categories;
                  this.categories = response.data;
                }
              );

              UserService.getUserTransactions(userId, userToken).then(
                (response) => {
                  if (response.data === []) return this.transactions;

                  const dates: string[] = [];

                  for (const transaction of response.data) {
                    dates.push(transaction.date);
                  }
                  const filteredDates = dates.filter(
                    (date, index) => dates.indexOf(date) === index
                  );
                  // console.log("Transactions dates are:", dates);
                  // console.log("Filtered dates are:", filteredDates);
                  this.dates = filteredDates;
                  this.transactions = response.data;
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
      let totalIncomeOrExpense = 0;

      for (const transaction of this.transactions) {
        for (const category of this.categories) {
          if (
            category.type === `${categoryType}` &&
            category.id === transaction.category_id
          ) {
            totalIncomeOrExpense += +transaction.amount;
          }
        }
      }
      return totalIncomeOrExpense;
    },
    showCurrentMonth() {
      const now = Date.now();
      const currentMonth = new Date(now).toLocaleDateString("fr-FR", {
        // weekday: "short",
        year: "numeric",
        month: "short",
        // day: "numeric",
      });
      return currentMonth;
    },
    showTransactionDate(date: string) {
      const transactionDate = new Date(date).toLocaleDateString("fr-FR", {
        // weekday: "short",
        // year: "numeric",
        month: "short",
        day: "numeric",
      });
      return transactionDate;
    },
  },
});
