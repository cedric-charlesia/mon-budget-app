import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    addTransaction: false,
    editTransaction: false,
    deleteTransaction: false,
  }),
  getters: {},
  actions: {},
});
