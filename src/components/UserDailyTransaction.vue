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
        :class="transaction.check === 'true' ? 'transaction-checked' : 'normal'"
      >
        <p
          class="transaction_icon"
          @click="
            user.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >
          {{ transaction.description.charAt(0).toUpperCase() }}
        </p>
        <p
          class="transaction_description"
          @click="
            user.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >
          {{ transaction.description }}
        </p>
        <p
          @click="
            user.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >
          {{ transaction.amount }} &euro;
        </p>
        <input
          v-if="transaction.check === 'true'"
          checked
          type="checkbox"
          @click="
            user.updateCheckedTransaction(
              transaction.date,
              transaction.description,
              transaction.amount,
              transaction.category_id,
              transaction.id
            )
          "
        />
        <input
          v-else
          type="checkbox"
          @click="
            user.updateCheckedTransaction(
              transaction.date,
              transaction.description,
              transaction.amount,
              transaction.category_id,
              transaction.id
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction_header {
  font-weight: bold;
  margin-bottom: 0;
}

.transaction_details,
.normal {
  display: grid;
  grid-template-columns: 1fr 7fr 2.5fr 1fr;
  gap: 1rem;
  align-items: center;
  border-bottom: 0.15rem solid var(--main-color);
  cursor: pointer;
}

.transaction-checked {
  background-color: var(--grey-color);
  text-decoration: line-through;
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
  width: 1rem;
  height: 1rem;
  color: var(--main-color);
  border: 0.15rem solid currentColor;
  border-radius: 0.1rem;
  display: inline-grid;
  place-content: center;
  margin-right: 0.5rem;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.61rem;
  height: 0.61rem;
  border-radius: 0.1rem;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--main-color);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
