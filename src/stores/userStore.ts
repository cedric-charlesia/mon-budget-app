import { defineStore } from "pinia";

import UserService from "@/services/UserService";
import FormatDate from "@/services/FormatDate";
import ShowToasts from "@/services/ShowToasts";

import router from "@/router";

export const userStore = defineStore({
    id: "userStore",
    state: () => ({
        id: NaN,
        username: "",
        email: "",
        categories: [{ id: 0, tag: "", type: "", user_id: 0 }],
        category: {
            id: 0,
            tag: "",
            type: "",
            user_id: 0,
        },
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
        inputError: false,
        emailError: false,
        checked: false,
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

                        ShowToasts.registerToast();

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

                        if (response.status === 204) {
                            this.inputError = true;                            
                        }

                        if (!isNaN(userId) && isFinite(userId)) {
                            UserService.user(userId, token)
                                .then((response) => {  

                                    ShowToasts.loginToast();

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

                    if (this.transaction.id !== 0) {
                        UserService.getOneCategory(
                            this.id,
                            categoryId,
                            userToken
                        ).then((response) => {
                            this.category = response.data;

                        })
                            .catch((error) => {
                                console.error(error);
                            });
                    }

                    router.push({
                        name: "transaction",
                        params: {
                            catId: response.data.category_id,
                            transactionId: response.data.id,
                        },
                    });
                })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        },
        async addTransaction(
            category: { type: string; tag: string; user_id: number },
            transaction: {
                category_id: number;
                date: string;
                description: string;
                amount: number;
                check: string;
            }
        ) {
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
                                    ShowToasts.addTransactionToast();
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
                    transaction.amount = Number(transaction.amount);
                    transaction.category_id = Number(transaction.category_id);

                    await UserService.addTransaction(
                        transaction,
                        this.id,
                        transaction.category_id,
                        userToken
                    )
                        .then(() => {
                            ShowToasts.addTransactionToast();
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

            const dateTransaction = FormatDate.showDate(date);
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
                [key: string]: string | number;
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
                        this.getUserTransactions();
                        this.transaction = response.data;

                        if (this.goToTransactionPage !== "false") {

                            ShowToasts.updateTransactionToast();

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
        async updateCategory(
            tag: string,
            type: string,
            catId: number,
        ) {
            const categoryId = Number(catId);

            const categoryTag = tag;
            const categoryType = type;

            interface Category {
                tag: string;
                type: string;
                user_id: number;
                [key: string]: string | number;
            }

            const category: Category = {
                tag: categoryTag,
                type: categoryType,
                user_id: Number(this.id),
            };

            const userToken = localStorage.getItem("token");

            try {
                await UserService.updateCategory(
                    category,
                    this.id,
                    categoryId,
                    userToken
                )
                    .then((response) => {
                        this.category = response.data;                        
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
                this.getUserTransactions();

                ShowToasts.deleteTransactionToast();

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
                month: "short",
                day: "numeric",
            });
            return transactionDate;
        },
    }
});