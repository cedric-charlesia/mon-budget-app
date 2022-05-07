import { defineStore } from 'pinia';

import UserService from '../services/UserService';

import routes from '../router';

import { date } from 'quasar';

export const userStore = defineStore('user', {
  state: () => ({
    id: NaN,
    username: '',
    email: '',
    category: {
      id: 0,
      tag: '',
      type: '',
      user_id: 0,
    },
    categories: [{ id: 0, tag: '', type: '', user_id: 0 }],
    transaction: {
      id: 0,
      date: '',
      description: '',
      amount: 0,
      category_id: 0,
      check: '',
      tag: '',
      type: '',
      user_id: 0,
      username: '',
      email: '',
    },
    transactions: [
      {
        id: 0,
        date: '',
        description: '',
        amount: 0,
        category_id: 0,
        check: '',
        tag: '',
        type: '',
        user_id: 0,
        username: '',
        email: '',
      },
    ],
    transactionCategories: [{}],
    checkedTransactions: [{ id: 0 }],
    dates: [''],
    currentYear: date.formatDate(Date.now(), 'YYYY'),
    currentMonth: date.formatDate(Date.now(), 'YYYY-MM'),
    currentDay: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    selectedDate: date.formatDate(Date.now(), 'YYYY'),
    noTransaction: false,
    showControlButtons: false,
    deleteTransactionId: { catId: 0, transacId: 0 },
    addTransactionModal: false,
    editTransactionModal: false,
    deleteTransactionModal: false,
  }),
  getters: {
    transactionSummary: (state) => {

      const transactionSummary = {
        income: 0,
        expense: 0,
        total: 0
      }

      for (const transaction of state.transactions) {
        for (const category of state.categories) {

          if ((transaction.date.includes(state.selectedDate)) && (category.type === 'revenu') && (transaction.category_id === category.id)) {
            transactionSummary.income += Number(transaction.amount);
            transactionSummary.income;
          }
          else if ((transaction.date.includes(state.selectedDate)) && (category.type === 'dépense') && (transaction.category_id === category.id)) {
            transactionSummary.expense += Number(transaction.amount);
            transactionSummary.expense;
          }
          transactionSummary.total = transactionSummary.income - transactionSummary.expense;
        }
      }
      return transactionSummary;
    },
  },
  actions: {
    async loginUser(user: object) {
      try {
        await UserService.login(user)
          .then((response) => {
            this.id = parseInt(response.data.id, 10);
            this.username = response.data.username;
            this.email = response.data.email;

            localStorage.setItem('token', response.headers.authorization);

            const userId = parseInt(response.data.id, 10);

            if (!isNaN(userId) && isFinite(userId)) {
              routes.push({
                name: 'user',
                params: { id: userId },
              });
              this.getUserDetails().then(() => {
                for (const date of this.dates) {
                  if (date.includes(this.currentMonth)) {
                    this.noTransaction = true;
                  }
                }
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
    async getUserDetails() {
      const userToken = localStorage.getItem('token');

      try {
        await UserService.getUserDetails(this.id, userToken).then(
          (response) => {

            const dates: string[] = [];
            const checked = [];

            for (const transaction of response.data) {
              dates.push(transaction.date);
              checked.push({ id: transaction.id });
            }
            const filteredDates = dates.filter(
              (date, index) => dates.indexOf(date) === index
            );
            this.dates = filteredDates;

            this.checkedTransactions = checked;

            this.transactions = response.data;
            console.table(this.transactions);
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async showTransactionDetails(catId: number, transacId: number) {

      const userToken = localStorage.getItem('token');

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
              this.editTransactionModal = true;
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
    async updateCategory(
      tag: string,
      type: string,
      catId: number,
    ) {
      const categoryId = Number(catId);

      const categoryTag = tag;
      const categoryType = type;

      const category = {
        tag: categoryTag,
        type: categoryType,
        user_id: Number(this.id),
      };

      const userToken = localStorage.getItem('token');

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
      const userToken = localStorage.getItem('token');

      try {
        if (category.tag !== '') {
          await UserService.addCategories(this.id, userToken, category)
            .then((response) => {
              const catId = Number(response.data.id);

              transaction.amount = Number(transaction.amount);
              transaction.category_id = catId;

              UserService.addTransaction(transaction, this.id, catId, userToken)
                .then(() => {

                  this.getUserDetails().then(() => {
                    for (const date of this.dates) {
                      if (date.includes(this.currentDay) || date.includes(this.currentMonth) || date.includes(this.currentYear)) {
                        this.noTransaction = true;
                      }
                    }
                  })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (category.tag === '') {
          transaction.amount = Number(transaction.amount);
          transaction.category_id = Number(transaction.category_id);

          await UserService.addTransaction(
            transaction,
            this.id,
            transaction.category_id,
            userToken
          )
            .then(() => {
              this.getUserDetails().then(() => {
                for (const date of this.dates) {
                  if (date.includes(this.currentDay) || date.includes(this.currentMonth) || date.includes(this.currentYear)) {
                    this.noTransaction = true;
                  }
                }
              })
                .catch((error) => {
                  console.error(error);
                });

            })
            .catch((error) => {
              console.error(error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateTransaction(
      date: string,
      description: string,
      amount: number,
      catId: number,
      transacId: number
    ) {
      const dateTransaction = date;
      const descriptionTransaction = description;
      const amountTransaction = Number(amount);

      const categoryId = Number(catId);
      const transactionId = Number(transacId);

      const transaction = {
        date: dateTransaction,
        description: descriptionTransaction,
        amount: amountTransaction,
        category_id: categoryId,
        check: 'false',
      };

      const userToken = localStorage.getItem('token');

      try {
        await UserService.updateTransaction(
          transaction,
          this.id,
          categoryId,
          transactionId,
          userToken
        )
          .then((response) => {
            this.transaction = response.data;

            this.getUserDetails();
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

      const userToken = localStorage.getItem('token');

      try {
        await UserService.deleteTransaction(
          this.id,
          categoryId,
          transactionId,
          userToken
        ).then(() => {

          this.getUserDetails().then(() => {
            for (const date of this.dates) {
              if (!date.includes(this.currentMonth)) {
                this.noTransaction = false;
              }
            }
          }).catch((error) => {
            console.error(error);
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
