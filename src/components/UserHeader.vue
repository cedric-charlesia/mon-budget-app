<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";
import { RouterLink } from "vue-router";
import router from "@/router";

defineProps<{
  mainTitle: string;
}>();

const user = loggedInUserStore();

const logout = () => {
  user.id = NaN;

  localStorage.removeItem("token");

  router.push({
    name: "login",
  });
};
</script>

<template>
  <div class="account-container">
    <h1 class="main-title user-title">
      <RouterLink to="/">{{ mainTitle }}</RouterLink>
    </h1>
    <div class="welcome-user">
      <p>Mars 2022</p>
      <button @click.prevent="logout()">Se déconnecter</button>
      <p>Bonjour, {{ user.username }} !</p>
    </div>
  </div>
</template>

<style scoped>
.account_container {
  height: 100vh;
  display: grid;
  grid-template-rows: 5% 5% 85% 5%;
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
