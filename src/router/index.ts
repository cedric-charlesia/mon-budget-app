import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import notFoundView from "../views/notFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserView,
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "notFound",
      component: notFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log("ok");
  } else {
    console.log("not ok");
  }
  next();
});

export default router;
