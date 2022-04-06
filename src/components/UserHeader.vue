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
  <header class="user-container">
    <nav class="top-nav">
      <h1 class="main-title">
        <RouterLink to="/">{{ mainTitle }}</RouterLink>
      </h1>
      <p>Bonjour, {{ user.username }} !</p>
      <button @click.prevent="logout()" class="logout"><LogOut /></button>
    </nav>
    <p class="calendar">
      <input
        v-model.lazy="month"
        type="month"
        id="currentMonth"
        name="currentMonth"
        @change="refreshTransactions()"
      />
    </p>
    <UserAccountSummary />
  </header>
</template>

<style scoped>
.user-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar {
  margin-top: 0;
  margin-bottom: 1rem;
}

input[type="month"] {
  width: 42%;
  appearance: none;
  color: var(--accent-color);
  border: 0.15rem solid var(--accent-color);
  border-radius: 0.15rem;
  background-color: transparent;
}

.logout {
  width: 10%;
  background-color: transparent;
  border: none;
}
</style>
