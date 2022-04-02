import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import router from "@/router";

export const loggedInUserStore = defineStore({
  id: "loggedInUser",
  state: () => ({
    id: NaN,
    username: "",
    email: "",
    categories: [{ id: 0, tag: "", type: "", user_id: 0 }],
    dates: [""],
    currentMonth: "",
    transactions: [
      {
        id: 0,
        date: "",
        description: "",
        amount: 0,
        category_id: 0,
      },
    ],
    emailError: false,
  }),
  getters: {},
  actions: {
    async registerUser(newUser: object) {
      try {
        await UserService.register(newUser)
          .then((response) => {
            this.id = parseInt(response.data.id, 10);
            this.username = response.data.username;
            this.email = response.data.email;

            router.push({
              name: "login",
            });
          })
          .catch((error) => {
            if (error) {
              console.error(error);
              this.emailError = true;
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
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
              this.getUserCategories();
              this.getUserTransactions();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    },
    async getUserCategories() {
      const userToken = localStorage.getItem("token");

      try {
        await UserService.getUserCategories(this.id, userToken).then(
          (response) => {
            if (response.data === []) return this.categories;
            this.categories = response.data;
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getUserTransactions() {
      const userToken = localStorage.getItem("token");

      try {
        await UserService.getUserTransactions(this.id, userToken).then(
          (response) => {
            if (response.data === []) return this.transactions;

            const dates: string[] = [];

            for (const transaction of response.data) {
              dates.push(transaction.date);
            }
            const filteredDates = dates.filter(
              (date, index) => dates.indexOf(date) === index
            );
            this.dates = filteredDates;
            this.transactions = response.data;
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addTransaction(category: any, transaction: any) {
      const userToken = localStorage.getItem("token");

      try {
        if (category.tag !== "") {
          await UserService.addCategories(this.id, userToken, category)
            .then((response) => {
              const catId = response.data.id;

              transaction.amount = parseInt(transaction.amount, 10);
              transaction.category_id = catId;

              UserService.addTransaction(transaction, this.id, catId, userToken)
                .then(() => {
                  this.getUserCategories();
                  this.getUserTransactions();
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (category.tag === "") {
          transaction.amount = parseInt(transaction.amount, 10);
          transaction.category_id = parseInt(transaction.category_id, 10);

          await UserService.addTransaction(
            transaction,
            this.id,
            transaction.category_id,
            userToken
          )
            .then(() => {
              this.getUserCategories();
              this.getUserTransactions();
            })
            .catch((error) => {
              console.error(error);
            });
        }
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
            category.id === transaction.category_id &&
            transaction.date.includes(this.currentMonth)
          ) {
            totalIncomeOrExpense += +transaction.amount;
          }
        }
      }
      return totalIncomeOrExpense;
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
