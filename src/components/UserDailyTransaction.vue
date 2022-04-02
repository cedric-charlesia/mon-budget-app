<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <div class="daily_transaction" v-for="date of user.dates" :key="date">
    <div
      class="daily_transaction_header"
      v-if="date.includes(user.currentMonth)"
    >
      <p>{{ user.showTransactionDate(date) }}</p>
    </div>

    <div v-for="transaction of user.transactions" :key="transaction.id">
      <div
        class="daily_transaction_content"
        v-if="
          transaction.date === date &&
          transaction.date.includes(user.currentMonth)
        "
      >
        <p class="transaction_icon">
          {{ transaction.description.charAt(0).toUpperCase() }}
        </p>
        <div class="transaction_details">
          <p>
            {{ transaction.description }}
          </p>
          <div class="daily_transaction_total">
            <p>{{ transaction.amount }} &euro;</p>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily_transaction_header,
.daily_transaction_content,
.daily_transaction_total {
  display: flex;
  justify-content: space-between;
}

.daily_transaction_header p {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.daily_transaction_content {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid var(--grey-color);
}

.daily_transaction_total {
  align-items: center;
  width: 40%;
}

.daily_transaction_total button {
  background-color: transparent;
  border: none;
  width: 25%;
  height: auto;
}

.daily_transaction_total p {
  margin-left: 0.5rem;
}

.daily_transaction_total input[type="checkbox"] {
  transform: scale(1.5);
  appearance: none;
  width: 0.81rem;
  height: 0.81rem;
  color: var(--accent-color);
  border: 0.15rem solid currentColor;
  border-radius: 0.1rem;
  display: inline-grid;
  place-content: center;
}

.daily_transaction_total input[type="checkbox"]::before {
  content: "";
  width: 0.41rem;
  height: 0.41rem;
  border-radius: 0.1rem;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--accent-color);
}

.daily_transaction_total input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.transaction_details {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 0.7rem;
  text-transform: capitalize;
}

.transaction_icon {
  padding: 0.5rem 0.6rem;
  margin: auto;
  border-radius: 50%;
  border: 0.15rem solid var(--grey-color);
}
</style>
