import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';

import UserConnected from '../views/UserConnected.vue';
import UserTransactionDetails from '../views/UserTransactionDetails.vue';

import { userStore } from "@/stores/userStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: "/login",
    name: "login",
    component: HomePage,
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserConnected,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: "login" };
      }
    },
  },
  {
    path: "/user/:id/category/:catId/transaction/:transactionId",
    name: "transaction",
    component: UserTransactionDetails,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: "login" };
      }
    },
  },
  // 404 error redirection to login page
  {
    path: '/:pathMatch(.*)*',
    redirect: "/login",
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
