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
        check: "",
      },
    ],
    transaction: {
      id: 0,
      date: "",
      description: "",
      amount: 0,
      category_id: 0,
      check: "",
    },
    emailError: false,
    checked: false,
    showModal: false,
    showUpdateModal: false,
    showDeleteModal: false,
    goToTransactionPage: "",
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
    async showTransactionDetails(catId: number, transacId: number) {
      const userToken = localStorage.getItem("token");

      const categoryId = Number(catId);
      const transactionId = Number(transacId);

      try {
        await UserService.getOneTransaction(
          this.id,
          categoryId,
          transactionId,
          userToken
        ).then((response) => {
          this.transaction = response.data;

          router.push({
            name: "transaction",
            params: {
              catId: response.data.category_id,
              transactionId: response.data.id,
            },
          });
        });
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
              const catId = Number(response.data.id);

              transaction.amount = Number(transaction.amount);
              transaction.category_id = catId;

              UserService.addTransaction(transaction, this.id, catId, userToken)
                .then(() => {
                  this.getUserCategories();
                  this.getUserTransactions();

                  this.showModal = false;
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (category.tag === "") {
          transaction.amount = Number(transaction.amount);
          transaction.category_id = Number(transaction.category_id);

          await UserService.addTransaction(
            transaction,
            this.id,
            transaction.category_id,
            userToken
          )
            .then(() => {
              this.getUserCategories();
              this.getUserTransactions();

              this.showModal = false;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateCheckedTransaction(
      date: string,
      description: string,
      amount: number,
      catId: number,
      transacId: number
    ) {
      this.checked = !this.checked;

      this.goToTransactionPage = "false";

      this.updateTransaction(date, description, amount, catId, transacId);
    },
    async updateTransaction(
      date: string,
      description: string,
      amount: number,
      catId: number,
      transacId: number
    ) {
      let checkTransaction;

      let month;
      let day;
      let year;

      const newDate = new Date(date);

      (month = "" + (newDate.getMonth() + 1)),
        (day = "" + newDate.getDate()),
        (year = newDate.getFullYear());

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      const dateTransaction = `${year}-${month}-${day}`;
      const descriptionTransaction = description;
      const amountTransaction = Number(amount);

      if (this.checked === true) {
        checkTransaction = "true";
      } else {
        checkTransaction = "false";
      }

      const categoryId = Number(catId);
      const transactionId = Number(transacId);

      interface Transaction {
        date: string;
        description: string;
        amount: number;
        category_id: number;
        check: string;
        [key: string]: unknown;
      }

      const transaction: Transaction = {
        date: dateTransaction,
        description: descriptionTransaction,
        amount: amountTransaction,
        category_id: categoryId,
        check: checkTransaction,
      };

      const userToken = localStorage.getItem("token");

      try {
        await UserService.updateTransaction(
          transaction,
          this.id,
          categoryId,
          transactionId,
          userToken
        )
          .then((response) => {
            this.getUserCategories();
            this.getUserTransactions();
            this.transaction = response.data;

            this.showUpdateModal = false;

            if (this.goToTransactionPage !== "false") {
              router.push({
                name: "transaction",
                params: {
                  catId: response.data.category_id,
                  transactionId: response.data.id,
                },
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
    async deleteTransaction(catId: number, transacId: number) {
      const categoryId = Number(catId);
      const transactionId = Number(transacId);
      const userToken = localStorage.getItem("token");

      try {
        await UserService.deleteteTransaction(
          this.id,
          categoryId,
          transactionId,
          userToken
        ).then(() => {
          this.getUserCategories();
          this.getUserTransactions();
          router.push({
            name: "user",
          });
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
            category.id === transaction.category_id &&
            transaction.date.includes(this.currentMonth)
          ) {
            totalIncomeOrExpense += +transaction.amount;
          }
        }
      }
      return totalIncomeOrExpense.toFixed(2);
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
