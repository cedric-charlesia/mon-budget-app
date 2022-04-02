<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";
import { RouterLink } from "vue-router";
import router from "@/router";
import LogOut from "@/components/images/LogOut.vue";
import UserAccountSummary from "@/components/UserAccountSummary.vue";
import { ref } from "vue";

defineProps<{
  mainTitle: string;
}>();

const user = loggedInUserStore();

let getCurrentMonth = "";

const now = Date.now();
if (new Date(now).getMonth() + 1 < 10) {
  getCurrentMonth = `${new Date(now).getFullYear()}-0${
    new Date(now).getMonth() + 1
  }`;
} else {
  getCurrentMonth = `${new Date(now).getFullYear()}-${
    new Date(now).getMonth() + 1
  }`;
}

let month = ref(getCurrentMonth);

const refreshTransactions = () => {
  user.currentMonth = month.value;
};

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
      <input
        v-model.lazy="month"
        type="month"
        id="currentMonth"
        name="currentMonth"
        @change="refreshTransactions()"
      />
    </div>
  </div>
  <UserAccountSummary />
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
  width: 10%;
  background-color: transparent;
  border: none;
}

.user-title {
  margin-bottom: 0;
}
.welcome-user {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.welcome-user p {
  margin: 0;
}

input[type="month"] {
  appearance: none;
  color: var(--accent-color);
  border: 0.15rem solid var(--accent-color);
  border-radius: 0.15rem;
  background-color: transparent;
}
</style>
