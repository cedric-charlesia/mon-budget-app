import { RouteRecordRaw } from 'vue-router';
import { userStore } from 'stores/userStore';

import UserPageLayout from 'layouts/UserPageLayout.vue';
import UserCategories from 'layouts/UserCategories.vue';
import UserStats from 'layouts/UserStats.vue';
import UserAccount from 'layouts/UserAccount.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/HomePageLayout.vue'),
    children: [{ path: '/', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/user',
    name: 'user',
    component: UserPageLayout,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: 'home' };
      }
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: UserCategories,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: 'home' };
      }
    }
  },
  {
    path: '/stats',
    name: 'stats',
    component: UserStats,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: 'home' };
      }
    }
  },
  {
    path: '/account',
    name: 'account',
    component: UserAccount,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: 'home' };
      }
    }
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('layouts/HomePageLayout.vue'),
    children: [{ path: '/legal', component: () => import('pages/LegalPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
