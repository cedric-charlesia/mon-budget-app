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
    dates: [''],
    transactions: [
      {
        id: 0,
        date: '',
        description: '',
        amount: 0,
        category_id: 0,
        check: '',
      },
    ],
    currentMonth: date.formatDate(Date.now(), 'YYYY-MM'),
    noTransaction: false,
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

          if (category.type === 'revenu' && (transaction.category_id === category.id)) {
            transactionSummary.income += Number(transaction.amount);
            transactionSummary.income;
          }
          else if (category.type === 'dépense' && (transaction.category_id === category.id)) {
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
            const token = {
              headers: { Authorization: `${response.headers.authorization}` },
            };

            if (!isNaN(userId) && isFinite(userId)) {
              UserService.user(userId, token)
                .then((response) => {
                  routes.push({
                    name: 'user',
                    params: { id: response.data.id },
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
      const userToken = localStorage.getItem('token');

      try {
        await UserService.getUserCategories(this.id, userToken).then(
          (response) => {
            this.categories = response.data;
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getUserTransactions() {
      const userToken = localStorage.getItem('token');

      try {
        await UserService.getUserTransactions(this.id, userToken).then(
          (response) => {

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
  },
});
