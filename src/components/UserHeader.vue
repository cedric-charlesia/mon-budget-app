<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";
import { RouterLink } from "vue-router";
import router from "@/router";
import LogOut from "@/components/images/LogOut.vue";

defineProps<{
  mainTitle: string;
}>();

const user = loggedInUserStore();

const logout = () => {
  user.$reset;

  localStorage.removeItem("token");

  router.push({
    name: "login",
  });
};
</script>

<template>
  <div class="account-container">
    <div class="top-nav">
      <h1 class="main-title user-title">
        <RouterLink to="/">{{ mainTitle }}</RouterLink>
      </h1>
      <p class="greetings">Bonjour, {{ user.username }} !</p>
      <button @click.prevent="logout()" class="logout"><LogOut /></button>
    </div>
    <div class="welcome-user">
      <p>Mars 2022</p>
    </div>
  </div>
</template>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greetings {
  margin-bottom: 0;
}

.logout {
  width: 8%;
  background-color: transparent;
  border: none;
}

.user-title {
  margin-bottom: 0;
}
.welcome-user {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.3rem;
}

.welcome-user p {
  margin: 0;
}
</style>
