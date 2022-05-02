import { RouteRecordRaw } from 'vue-router';

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
    component: () => import('layouts/UserPageLayout.vue'),
    children: [{ path: '/user', component: () => import('pages/UserPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
