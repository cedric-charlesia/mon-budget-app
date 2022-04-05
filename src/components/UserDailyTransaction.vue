<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <div class="daily_transaction" v-for="date of user.dates" :key="date">
    <p class="transaction_header" v-if="date.includes(user.currentMonth)">
      {{ user.showTransactionDate(date) }}
    </p>

    <div v-for="transaction of user.transactions" :key="transaction.id">
      <div
        v-if="
          transaction.date === date &&
          transaction.date.includes(user.currentMonth)
        "
        class="transaction_details"
      >
        <p class="transaction_icon">
          {{ transaction.description.charAt(0).toUpperCase() }}
        </p>
        <p class="transaction_description">
          {{ transaction.description }}
        </p>
        <p>{{ transaction.amount }} &euro;</p>
        <input type="checkbox" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction_header {
  font-weight: bold;
  margin-bottom: 0;
}

.transaction_details {
  display: grid;
  grid-template-columns: 1fr 7fr 2.5fr 1fr;
  gap: 1rem;
  align-items: center;
  border-bottom: 0.15rem solid var(--main-color);
  cursor: pointer;
}

.transaction_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: 0.15rem solid var(--main-color);
  border-radius: 50%;
}

.transaction_description {
  max-width: 20ch;
  text-transform: capitalize;
}

input[type="checkbox"] {
  transform: scale(1.5);
  appearance: none;
  width: 0.81rem;
  height: 0.81rem;
  color: var(--main-color);
  border: 0.15rem solid currentColor;
  border-radius: 0.1rem;
  display: inline-grid;
  place-content: center;
  margin-right: 0.5rem;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.41rem;
  height: 0.41rem;
  border-radius: 0.1rem;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--main-color);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
