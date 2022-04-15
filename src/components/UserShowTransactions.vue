<script setup lang="ts">

import { userStore } from "@/stores/userStore";

const store = userStore();
</script>

<template>
  <div class="daily_transaction" v-for="date of store.dates" :key="date">
    <p
      class="transaction_header"
      v-if="date.includes(store.currentMonth)"
    >{{ store.showTransactionDate(date) }}</p>

    <div v-for="transaction of store.transactions" :key="transaction.id">
      <div
        v-if="
          transaction.date === date &&
          transaction.date.includes(store.currentMonth)
        "
        class="transaction_details"
        :class="transaction.check === 'true' ? 'transaction-checked' : 'normal'"
      >
        <p
          class="transaction_icon"
          @click="
            store.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >{{ transaction.description.charAt(0).toUpperCase() }}</p>
        <p
          class="transaction_description"
          @click="
            store.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >{{ transaction.description }}</p>
        <p
          @click="
            store.showTransactionDetails(transaction.category_id, transaction.id)
          "
        >{{ transaction.amount }} &euro;</p>
        <input
          v-if="transaction.check === 'true'"
          checked
          type="checkbox"
          @click="
            store.updateCheckedTransaction(
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
            store.updateCheckedTransaction(
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
.daily_transaction {
  padding-top: 1%;
  padding-left: 5%;
  padding-right: 5%;
}

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
  border-bottom: 0.15rem solid var(--ion-color-primary);
  cursor: pointer;
}

.transaction-checked {
  background-color: var(--ion-color-step-700);
  text-decoration: line-through;
}

.transaction_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: 0.15rem solid var(--ion-color-primary);
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
  border: 0.15rem solid var(--ion-color-primary);
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
  background-color: var(--ion-color-primary);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>