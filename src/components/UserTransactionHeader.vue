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
  <header class="user-container">
    <nav class="top-nav">
      <h1 class="main-title">
        <RouterLink to="/">{{ mainTitle }}</RouterLink>
      </h1>
      <p>Bonjour, {{ user.username }} !</p>
      <button @click.prevent="logout()" class="logout"><LogOut /></button>
    </nav>
    <h2 class="subtitle">Détails de la transaction</h2>
  </header>
</template>

<style scoped>
.user-container {
  display: flex;
  flex-direction: column;
  margin-top: 1.1rem;
}
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logout {
  width: 10%;
  background-color: transparent;
  border: none;
}

.subtitle {
  text-align: center;
  font-weight: normal;
}
</style>
