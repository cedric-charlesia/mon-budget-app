import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import notFoundView from "../views/notFoundView.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

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
      beforeEnter() {
        const user = loggedInUserStore();
        if (!user.id) {
          return { name: "login" };
        }
      },
    },
    {
      path: "/404",
      name: "notFound",
      component: notFoundView,
    },
  ],
});

export default router;
