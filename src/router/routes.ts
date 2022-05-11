import { RouteRecordRaw } from 'vue-router';
import { userStore } from 'stores/userStore';

import UserPageLayout from 'layouts/UserPageLayout.vue';
import UserAccountDetails from 'layouts/UserAccountDetails.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/HomePageLayout.vue'),
    children: [{ path: '/', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/user/:id',
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
    path: '/account',
    name: 'account',
    component: UserAccountDetails,
    beforeEnter() {
      const user = userStore();
      if (!user.id) {
        return { name: 'home' };
      }
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
